from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from models.user import User
from utils.jwt import get_current_user
from services.plan_service import get_plan_limits

router = APIRouter()

PLAN_PRICES = {
    "free": 0,
    "pro": 9.99,
    "team": 29.99
}

PLAN_DESCRIPTIONS = {
    "free": "Perfect for getting started with NLP research",
    "pro": "Unlimited access for individual researchers",
    "team": "Collaborative workspace for research teams"
}

class UpgradeRequest(BaseModel):
    plan: str

@router.get("/")
def get_plans():
    plans = []
    for plan_name in ["free", "pro", "team"]:
        limits = get_plan_limits(plan_name)
        plans.append({
            "name": plan_name,
            "price": PLAN_PRICES[plan_name],
            "description": PLAN_DESCRIPTIONS[plan_name],
            "limits": {
                "max_papers": limits["max_papers"] if limits["max_papers"] < 999 else "Unlimited",
                "max_questions_per_day": limits["max_questions_per_day"] if limits["max_questions_per_day"] < 999 else "Unlimited",
                "max_comparisons": limits["max_comparisons"] if limits["max_comparisons"] < 999 else "Unlimited",
                "trend_analysis": limits["can_access_trends"],
                "team_workspace": limits["can_access_team"]
            }
        })
    return plans

@router.post("/upgrade")
def upgrade_plan(
    request: UpgradeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if request.plan not in ["free", "pro", "team"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid plan. Choose from: free, pro, team"
        )

    if request.plan == current_user.plan:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"You are already on the {request.plan} plan"
        )

    # Simulate payment processing
    old_plan = current_user.plan
    current_user.plan = request.plan
    db.commit()

    return {
        "message": f"Successfully upgraded from {old_plan} to {request.plan} plan!",
        "plan": current_user.plan,
        "price": PLAN_PRICES[request.plan],
        "note": "Payment simulated for portfolio demonstration"
    }

@router.get("/usage")
def get_usage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    limits = get_plan_limits(current_user.plan)

    return {
        "plan": current_user.plan,
        "usage": {
            "papers_uploaded": current_user.papers_uploaded,
            "max_papers": limits["max_papers"] if limits["max_papers"] < 999 else "Unlimited",
            "questions_asked_today": current_user.questions_asked_today,
            "max_questions_per_day": limits["max_questions_per_day"] if limits["max_questions_per_day"] < 999 else "Unlimited",
            "comparisons_done": current_user.comparisons_done,
            "max_comparisons": limits["max_comparisons"] if limits["max_comparisons"] < 999 else "Unlimited",
        },
        "features": {
            "trend_analysis": limits["can_access_trends"],
            "team_workspace": limits["can_access_team"]
        }
    }