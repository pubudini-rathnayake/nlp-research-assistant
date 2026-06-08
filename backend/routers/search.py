from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from models.user import User
from models.paper import Paper
from utils.jwt import get_current_user
from services.rag_service import search_paper, search_all_papers
from services.gemini_service import answer_question, summarize_paper
from services.plan_service import can_ask_question

router = APIRouter()

class QuestionRequest(BaseModel):
    question: str
    paper_id: int = None  # None means search all papers

@router.post("/query")
def ask_question(
    request: QuestionRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check plan limits
    if not can_ask_question(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Daily question limit reached for your {current_user.plan} plan. Please upgrade."
        )

    if request.paper_id:
        # Search specific paper
        paper = db.query(Paper).filter(
            Paper.id == request.paper_id,
            Paper.user_id == current_user.id
        ).first()

        if not paper:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Paper not found"
            )

        if not paper.chroma_collection_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Paper has not been processed yet"
            )

        context_docs = search_paper(
            query=request.question,
            collection_name=paper.chroma_collection_id,
            k=5
        )
    else:
        # Search all user papers
        papers = db.query(Paper).filter(
            Paper.user_id == current_user.id
        ).all()

        if not papers:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No papers uploaded yet"
            )

        paper_ids = [p.id for p in papers]
        context_docs = search_all_papers(
            query=request.question,
            paper_ids=paper_ids,
            k=3
        )

    # Get AI answer
    result = answer_question(
        question=request.question,
        context_docs=context_docs
    )

    # Update question count
    current_user.questions_asked_today += 1
    db.commit()

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"]
    }

@router.post("/summarize/{paper_id}")
def get_summary(
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

    # Return existing summary if available
    if paper.summary:
        return {
            "paper_id": paper.id,
            "title": paper.title,
            "summary": paper.summary
        }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Summary not available for this paper"
    )

@router.get("/topic")
def search_by_topic(
    topic: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    papers = db.query(Paper).filter(
        Paper.user_id == current_user.id
    ).all()

    if not papers:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No papers uploaded yet"
        )

    paper_ids = [p.id for p in papers]
    context_docs = search_all_papers(
        query=topic,
        paper_ids=paper_ids,
        k=3
    )

    relevant_papers = list(set([
        doc.metadata.get("title", "Unknown")
        for doc in context_docs
    ]))

    return {
        "topic": topic,
        "relevant_papers": relevant_papers,
        "total_found": len(relevant_papers)
    }