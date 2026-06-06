from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    plan = Column(String(50), default="free")  # free, pro, team
    papers_uploaded = Column(Integer, default=0)
    questions_asked_today = Column(Integer, default=0)
    comparisons_done = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())