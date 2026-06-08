from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from database.database import get_db
from models.user import User
from models.paper import Paper
from utils.jwt import get_current_user
from services.pdf_service import extract_text_from_pdf, save_uploaded_file, delete_file
from services.rag_service import store_paper_in_chroma, delete_paper_from_chroma
from services.gemini_service import summarize_paper
from services.plan_service import can_upload_paper
import uuid
import os

router = APIRouter()

@router.post("/upload")
def upload_paper(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check plan limits
    if not can_upload_paper(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Upload limit reached for your {current_user.plan} plan. Please upgrade."
        )

    # Validate file type
    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported"
        )

    # Save file
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_content = file.file.read()
    file_path = save_uploaded_file(file_content, unique_filename)

    try:
        # Extract text from PDF
        extracted = extract_text_from_pdf(file_path)

        if not extracted["text"].strip():
            delete_file(file_path)
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not extract text from PDF. Make sure it is not scanned."
            )

        # Save paper metadata to database first to get the ID
        paper = Paper(
            user_id=current_user.id,
            title=file.filename.replace(".pdf", ""),
            filename=unique_filename,
            file_path=file_path,
            page_count=extracted["page_count"],
            word_count=extracted["word_count"]
        )
        db.add(paper)
        db.commit()
        db.refresh(paper)

        # Store in ChromaDB
        collection_name = store_paper_in_chroma(
            text=extracted["text"],
            paper_id=paper.id,
            title=paper.title
        )

        # Generate AI summary
        summary = summarize_paper(extracted["text"], paper.title)

        # Update paper with chroma collection and summary
        paper.chroma_collection_id = collection_name
        paper.summary = summary
        db.commit()
        db.refresh(paper)

        # Update user upload count
        current_user.papers_uploaded += 1
        db.commit()

        return {
            "id": paper.id,
            "title": paper.title,
            "page_count": paper.page_count,
            "word_count": paper.word_count,
            "summary": paper.summary,
            "created_at": paper.created_at
        }

    except HTTPException:
        raise
    except Exception as e:
        delete_file(file_path)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error processing paper: {str(e)}"
        )

@router.get("/")
def get_papers(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    papers = db.query(Paper).filter(Paper.user_id == current_user.id).all()
    return [
        {
            "id": p.id,
            "title": p.title,
            "page_count": p.page_count,
            "word_count": p.word_count,
            "summary": p.summary,
            "created_at": p.created_at
        }
        for p in papers
    ]

@router.get("/{paper_id}")
def get_paper(
    paper_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    paper = db.query(Paper).filter(
        Paper.id == paper_id,
        Paper.user_id == current_user.id
    ).first()

    if not paper:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paper not found"
        )

    return {
        "id": paper.id,
        "title": paper.title,
        "page_count": paper.page_count,
        "word_count": paper.word_count,
        "summary": paper.summary,
        "created_at": paper.created_at
    }

@router.delete("/{paper_id}")
def delete_paper(
    paper_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    paper = db.query(Paper).filter(
        Paper.id == paper_id,
        Paper.user_id == current_user.id
    ).first()

    if not paper:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Paper not found"
        )

    # Delete from ChromaDB
    if paper.chroma_collection_id:
        delete_paper_from_chroma(paper.chroma_collection_id)

    # Delete file from disk
    delete_file(paper.file_path)

    # Delete from database
    db.delete(paper)
    db.commit()

    # Update user count
    if current_user.papers_uploaded > 0:
        current_user.papers_uploaded -= 1
        db.commit()

    return {"message": "Paper deleted successfully"}