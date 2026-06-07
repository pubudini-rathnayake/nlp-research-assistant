from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database.database import get_db
from models.user import User
from utils.jwt import create_access_token, get_current_user
import bcrypt

router = APIRouter()

# --- Request schemas ---
class RegisterRequest(BaseModel):
    email: str
    password: str
    plan: str = "free"

class LoginRequest(BaseModel):
    email: str
    password: str

# --- Response schemas ---
class AuthResponse(BaseModel):
    token: str
    email: str
    plan: str

    class Config:
        from_attributes = True

# --- Helper functions ---
def hash_password(password: str) -> str:
    return bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(
        plain.encode("utf-8"),
        hashed.encode("utf-8")
    )

# --- Register ---
@router.post("/register", response_model=AuthResponse)
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    if request.plan not in ["free", "pro", "team"]:
        request.plan = "free"

    hashed_password = hash_password(request.password)

    user = User(
        email=request.email,
        password=hashed_password,
        plan=request.plan
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.email})
    return AuthResponse(token=token, email=user.email, plan=user.plan)

# --- Login ---
@router.post("/login", response_model=AuthResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    if not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    token = create_access_token({"sub": user.email})
    return AuthResponse(token=token, email=user.email, plan=user.plan)

# --- Get current user ---
@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "plan": current_user.plan,
        "papers_uploaded": current_user.papers_uploaded,
        "questions_asked_today": current_user.questions_asked_today,
        "comparisons_done": current_user.comparisons_done,
        "created_at": current_user.created_at
    }