from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from models.user import User
from models.paper import Paper
from utils.jwt import get_current_user
from services.gemini_service import compare_papers
from services.plan_service import can_compare

router = APIRouter()

class CompareRequest(BaseModel):
    paper_ids: list[int]

@router.post("/")
def compare(
    request: CompareRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check plan limits
    if not can_compare(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Comparison limit reached for your {current_user.plan} plan. Please upgrade."
        )

    # Validate at least 2 papers
    if len(request.paper_ids) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please select at least 2 papers to compare"
        )

    # Get papers
    papers = []
    for paper_id in request.paper_ids:
        paper = db.query(Paper).filter(
            Paper.id == paper_id,
            Paper.user_id == current_user.id
        ).first()

        if not paper:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Paper {paper_id} not found"
            )

        if not paper.summary:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Paper '{paper.title}' has no summary yet"
            )

        papers.append({
            "id": paper.id,
            "title": paper.title,
            "summary": paper.summary
        })

    # Generate comparison
    comparison = compare_papers(papers)

    # Update comparison count
    current_user.comparisons_done += 1
    db.commit()

    return {
        "papers_compared": [p["title"] for p in papers],
        "comparison": comparison
    }