from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import engine, Base
from routers import auth, papers, search, compare, trends, plans
from dotenv import load_dotenv
import os

load_dotenv()

# Create all database tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="NLP Research Assistant API",
    description="A SaaS RAG-powered research assistant for NLP papers",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(papers.router, prefix="/api/papers", tags=["Papers"])
app.include_router(search.router, prefix="/api/search", tags=["Search & Q&A"])
app.include_router(compare.router, prefix="/api/compare", tags=["Compare"])
app.include_router(trends.router, prefix="/api/trends", tags=["Trends"])
app.include_router(plans.router, prefix="/api/plans", tags=["Plans"])

@app.get("/")
def root():
    return {
        "message": "NLP Research Assistant API is running!",
        "docs": "http://localhost:8000/docs",
        "version": "1.0.0"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}