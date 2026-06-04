# 🔬 NLP Research Assistant

> A full-stack AI-powered research assistant that uses Retrieval-Augmented Generation (RAG) to upload, search, summarize, compare NLP research papers, and track research trends — built with Python, FastAPI, LangChain, ChromaDB, and React.

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6719?style=for-the-badge&logo=data:image/png;base64,&logoColor=white)](https://www.trychroma.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)

---

## ✨ Overview

NLP Research Assistant is a full-stack RAG-powered platform designed for researchers, students, and academics to interact with NLP research papers intelligently.

Instead of just searching keywords, you can **upload your own research papers**, **ask questions and get cited answers**, **compare multiple papers**, and **discover research trends** — all powered by real AI using Google Gemini embeddings and LangChain RAG pipelines.

---

## 🎯 Features

### 📄 Version 1 — Paper Upload & Q&A
- Upload NLP research papers in PDF format
- Automatic text extraction and chunking
- Store paper embeddings in ChromaDB vector database
- Ask questions and get AI answers with citations from the paper

### 🔍 Version 2 — Search & Summarization
- Search papers by topic, keyword, or concept
- AI-generated summaries of individual papers
- Cited answers — every response references the exact paper section
- Filter papers by year, author, or topic

### ⚖️ Version 3 — Paper Comparison
- Compare two or more research papers side by side
- Find similarities and differences in methodology, results, and conclusions
- AI-generated comparison report with visual highlights

### 📈 Version 4 — Trend Analysis
- Track how NLP research topics evolved over time
- Visualize research landscape across uploaded papers
- Identify emerging topics and declining research areas
- AI-generated trend summary report

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python 3.11 | Core programming language |
| FastAPI | REST API framework |
| LangChain | RAG pipeline orchestration |
| ChromaDB | Vector database for embeddings |
| Google Gemini 2.5 | LLM for answers and summaries |
| Google Gemini Embeddings | Text embedding generation |
| PyMuPDF | PDF text extraction |
| PostgreSQL | Relational database for metadata |
| JWT | Authentication |

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client |
| React Router DOM | Client-side routing |

---

## 🏗️ Architecture

```plaintext
User uploads PDF
       ↓
FastAPI receives file
       ↓
PyMuPDF extracts text
       ↓
LangChain splits into chunks
       ↓
Gemini Embeddings converts chunks to vectors
       ↓
ChromaDB stores vectors
       ↓
User asks a question
       ↓
Question converted to vector
       ↓
ChromaDB finds most relevant chunks
       ↓
LangChain sends chunks + question to Gemini
       ↓
Gemini returns cited answer
       ↓
React displays answer with source reference
```

---

## 📂 Project Structure

```plaintext
nlp-research-assistant/
│
├── backend/
│   ├── main.py                    # FastAPI entry point
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example               # Environment variables template
│   │
│   ├── routers/
│   │   ├── auth.py                # Authentication endpoints
│   │   ├── papers.py              # Paper upload and management
│   │   ├── search.py              # Search and Q&A endpoints
│   │   ├── compare.py             # Paper comparison endpoints
│   │   └── trends.py              # Trend analysis endpoints
│   │
│   ├── services/
│   │   ├── rag_service.py         # LangChain RAG pipeline
│   │   ├── embedding_service.py   # Gemini embedding generation
│   │   ├── pdf_service.py         # PDF processing
│   │   ├── search_service.py      # Vector search logic
│   │   └── gemini_service.py      # Gemini AI integration
│   │
│   ├── models/
│   │   ├── user.py                # User database model
│   │   └── paper.py               # Paper database model
│   │
│   ├── database/
│   │   ├── postgres.py            # PostgreSQL connection
│   │   └── chroma.py              # ChromaDB connection
│   │
│   └── utils/
│       ├── jwt.py                 # JWT token utilities
│       └── chunker.py             # Text chunking strategies
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Route definitions
│   │   │
│   │   ├── api/
│   │   │   └── axios.js           # Axios with JWT interceptor
│   │   │
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx      # Login page
│   │   │   ├── RegisterPage.jsx   # Register page
│   │   │   ├── DashboardPage.jsx  # Main dashboard
│   │   │   ├── UploadPage.jsx     # PDF upload page
│   │   │   ├── SearchPage.jsx     # Search and Q&A page
│   │   │   ├── ComparePage.jsx    # Paper comparison page
│   │   │   └── TrendsPage.jsx     # Trend analysis page
│   │   │
│   │   └── components/
│   │       ├── Navbar.jsx         # Navigation bar
│   │       ├── PaperCard.jsx      # Paper display card
│   │       ├── AnswerCard.jsx     # Q&A answer display
│   │       └── TrendChart.jsx     # Trend visualization
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9 or higher
- Node.js 18 or higher
- PostgreSQL
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/apikey))

### Backend Setup

#### 1. Clone the repository
```bash
git clone https://github.com/pubudini-rathnayake/nlp-research-assistant.git
cd nlp-research-assistant/backend
```

#### 2. Create a virtual environment
```bash
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # Mac/Linux
```

#### 3. Install dependencies
```bash
pip install -r requirements.txt
```

#### 4. Set up environment variables
```bash
cp .env.example .env
```
Fill in your values:
```env
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_long_random_jwt_secret_here
DATABASE_URL=postgresql://username:password@localhost:5432/nlp_research_db
CHROMA_PERSIST_DIR=./chroma_store
```

#### 5. Create the database
```sql
CREATE DATABASE nlp_research_db;
```

#### 6. Run the backend
```bash
uvicorn main:app --reload
```

#### 7. Backend is running at
http://localhost:8000

#### 8. View auto-generated API docs at
http://localhost:8000/docs

---

### Frontend Setup

#### 1. Navigate to frontend folder
```bash
cd ../frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Run the development server
```bash
npm run dev
```

#### 4. Open in browser
http://localhost:5173

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login and get JWT | ❌ |

### Papers
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/papers/upload` | Upload PDF paper | ✅ |
| GET | `/api/papers` | Get all uploaded papers | ✅ |
| GET | `/api/papers/{id}` | Get specific paper | ✅ |
| DELETE | `/api/papers/{id}` | Delete paper | ✅ |

### Search & Q&A
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/search/query` | Ask a question about papers | ✅ |
| POST | `/api/search/summarize/{id}` | Summarize a paper | ✅ |
| GET | `/api/search/topic` | Search papers by topic | ✅ |

### Compare
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/compare` | Compare two or more papers | ✅ |

### Trends
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/trends` | Get research trend analysis | ✅ |

---

## 🔗 Related Projects

This project is part of a growing AI portfolio:

[![Student Reflection AI](https://img.shields.io/badge/Student_Reflection_AI-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pubudini-rathnayake/student-reflection-ai-backend)

---

## 👩‍💻 Author

**Pubudini Rathnayake**
ICT Undergraduate | Specializing in Artificial Intelligence | Full-Stack Developer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pubudini-rathnayake-388b062b7)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/pubudini-rathnayake)

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🌱 Project Status
Version 1 — 🔄 In Progress
Version 2 — 📋 Planned
Version 3 — 📋 Planned
Version 4 — 📋 Planned
