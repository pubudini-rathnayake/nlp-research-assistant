from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.database import get_db
from models.user import User
from models.paper import Paper
from utils.jwt import get_current_user
from services.gemini_service import analyze_trends
from services.plan_service import can_access_trends

router = APIRouter()

@router.get("/")
def get_trends(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check plan limits
    if not can_access_trends(current_user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Trend analysis is available on Pro and Team plans only. Please upgrade."
        )

    papers = db.query(Paper).filter(
        Paper.user_id == current_user.id
    ).all()

    if not papers:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No papers uploaded yet"
        )

    if len(papers) < 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Upload at least 2 papers to analyze trends"
        )

    papers_data = [
        {
            "title": p.title,
            "summary": p.summary or "No summary available"
        }
        for p in papers
    ]

    trends = analyze_trends(papers_data)

    return {
        "total_papers_analyzed": len(papers),
        "paper_titles": [p["title"] for p in papers_data],
        "trends": trends
    }