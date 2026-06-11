# 🔬 NLP Research Assistant

> A full-stack SaaS AI-powered research assistant that uses Retrieval-Augmented Generation (RAG) to upload, search, summarize, compare NLP research papers, and track research trends — built with Python, FastAPI, LangChain, ChromaDB, and React.

[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6719?style=for-the-badge&logoColor=white)](https://www.trychroma.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://aistudio.google.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## ✨ Overview

NLP Research Assistant is a full-stack SaaS RAG-powered platform designed for researchers, students, and academics to interact with NLP research papers intelligently.

Instead of just searching keywords, you can **upload your own research papers**, **ask questions and get cited answers**, **compare multiple papers**, and **discover research trends** — all powered by real AI using Google Gemini embeddings and LangChain RAG pipelines.

Built as a complete SaaS product with **Free, Pro, and Team subscription plans**, usage-based limits, and a full user management system.

---

## 💼 SaaS Pricing Plans

| Feature | 🆓 Free | ⭐ Pro | 👥 Team |
|---|---|---|---|
| Papers uploaded | 3 papers | Unlimited | Unlimited |
| Questions per day | 10 | Unlimited | Unlimited |
| Paper comparisons | 1 | Unlimited | Unlimited |
| Trend analysis | ❌ | ✅ | ✅ |
| Team workspace | ❌ | ❌ | Up to 10 members |
| Shared paper library | ❌ | ❌ | ✅ |
| Priority AI responses | ❌ | ✅ | ✅ |
| Price | Free | $9.99/month | $29.99/month |

> 💡 Payments are simulated for portfolio demonstration purposes.

---

## 🎯 Features

### 📄 Version 1 — Core RAG + Auth + SaaS Structure
- User registration and JWT authentication
- PDF upload and automatic text extraction
- LangChain RAG pipeline with ChromaDB vector storage
- Ask questions and get AI answers with citations
- Free / Pro / Team plan enforcement
- SaaS dashboard with usage tracking

### 🔍 Version 2 — Search & Summarization
- Search papers by topic, keyword, or concept
- AI-generated summaries of individual papers
- Cited answers referencing exact paper sections
- Filter papers by year, author, or topic

### ⚖️ Version 3 — Paper Comparison
- Compare two or more papers side by side
- Find similarities and differences in methodology and results
- AI-generated comparison report

### 📈 Version 4 — Trend Analysis & Team Workspace
- Track how NLP research topics evolved over time
- Visualize research landscape across uploaded papers
- Identify emerging and declining research areas
- Team workspace — invite members and share paper libraries
- Admin dashboard — manage users and plan upgrades

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Python 3.13 | Core programming language |
| FastAPI | REST API framework with auto Swagger docs |
| LangChain | RAG pipeline orchestration |
| ChromaDB | Vector database for paper embeddings |
| Google Gemini 2.5 Flash Lite | LLM for answers and summaries |
| Google Gemini Embedding 001 | Text embedding generation |
| PyMuPDF | PDF text extraction |
| MySQL | Relational database for users and metadata |
| JWT | Stateless authentication |

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework and build tool |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Smooth animations |
| Axios | HTTP client with JWT interceptor |
| React Router DOM | Client-side routing with protected routes |
| Recharts | Data visualization for trend analysis |

---

## 🏗️ RAG Architecture

```plaintext
User uploads PDF
       ↓
FastAPI receives and validates file
       ↓
PyMuPDF extracts raw text
       ↓
LangChain splits text into chunks
       ↓
Gemini Embeddings converts chunks to vectors
       ↓
ChromaDB stores vectors with metadata
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
│   ├── main.py                      # FastAPI entry point
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment variables template
│   │
│   ├── routers/
│   │   ├── auth.py                  # Register, login endpoints
│   │   ├── papers.py                # Upload, list, delete papers
│   │   ├── search.py                # Q&A and search endpoints
│   │   ├── compare.py               # Paper comparison endpoints
│   │   ├── trends.py                # Trend analysis endpoints
│   │   └── plans.py                 # SaaS plan management
│   │
│   ├── services/
│   │   ├── rag_service.py           # LangChain RAG pipeline
│   │   ├── embedding_service.py     # Gemini embedding generation
│   │   ├── pdf_service.py           # PDF processing with PyMuPDF
│   │   ├── gemini_service.py        # Gemini AI integration
│   │   └── plan_service.py          # Plan limits enforcement
│   │
│   ├── models/
│   │   ├── user.py                  # User model with plan field
│   │   └── paper.py                 # Paper model
│   │
│   ├── database/
│   │   └── database.py              # MySQL connection
│   │
│   └── utils/
│       └── jwt.py                   # JWT token utilities
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx                 # React entry point
│   │   ├── App.jsx                  # Routes with plan-based guards
│   │   │
│   │   ├── api/
│   │   │   └── axios.js             # Axios with JWT interceptor
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # SaaS landing page with pricing
│   │   │   ├── LoginPage.jsx        # Login page
│   │   │   ├── RegisterPage.jsx     # Register with plan selection
│   │   │   ├── DashboardPage.jsx    # Main dashboard with usage stats
│   │   │   ├── UploadPage.jsx       # PDF upload with plan limits
│   │   │   ├── SearchPage.jsx       # Q&A search interface
│   │   │   ├── ComparePage.jsx      # Paper comparison interface
│   │   │   ├── TrendsPage.jsx       # Trend visualization
│   │   │   └── PricingPage.jsx      # Pricing plans page
│   │   │
│   │   └── components/
│   │       ├── Navbar.jsx           # Navigation with plan badge
│   │       ├── PaperCard.jsx        # Paper display card
│   │       ├── AnswerCard.jsx       # Q&A answer with citations
│   │       ├── PlanBadge.jsx        # Free/Pro/Team badge
│   │       └── UsageBar.jsx         # Usage limit progress bar
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
- MySQL 8.0
- Google Gemini API key — free at [aistudio.google.com](https://aistudio.google.com/apikey)

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
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=nlp_research_db
DATABASE_USER=root
DATABASE_PASSWORD=your_mysql_password
CHROMA_PERSIST_DIR=./chroma_store
```

#### 5. Create the MySQL database
```sql
CREATE DATABASE IF NOT EXISTS nlp_research_db;
```

#### 6. Run the backend
```bash
uvicorn main:app --reload
```

#### 7. Backend running at
http://localhost:8000

#### 8. Auto-generated API docs at
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
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register with plan selection | ❌ |
| POST | `/api/auth/login` | Login and get JWT | ❌ |
| GET | `/api/auth/me` | Get current user + plan | ✅ |

### Papers
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/papers/upload` | Upload PDF (plan limits apply) | ✅ |
| GET | `/api/papers` | Get all user papers | ✅ |
| GET | `/api/papers/{id}` | Get specific paper | ✅ |
| DELETE | `/api/papers/{id}` | Delete paper | ✅ |

### Search & Q&A
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/search/query` | Ask question about papers | ✅ |
| POST | `/api/search/summarize/{id}` | Summarize a paper | ✅ |
| GET | `/api/search/topic` | Search papers by topic | ✅ |

### Compare
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/compare` | Compare two or more papers | ✅ Pro+ |

### Trends
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/trends` | Get trend analysis | ✅ Pro+ |

### Plans
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/plans` | Get all available plans | ❌ |
| POST | `/api/plans/upgrade` | Simulate plan upgrade | ✅ |
| GET | `/api/plans/usage` | Get current usage stats | ✅ |

### Team
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/team/invite` | Invite team member | ✅ Team |
| GET | `/api/team/members` | Get team members | ✅ Team |
| GET | `/api/team/papers` | Get shared paper library | ✅ Team |

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

```
Version 1 — ✅ Complete
  ✓ JWT authentication with Free/Pro/Team plan selection
  ✓ PDF upload with PyMuPDF text extraction
  ✓ LangChain RAG pipeline with ChromaDB vector storage
  ✓ Gemini AI embeddings (gemini-embedding-001)
  ✓ AI paper summarization on upload
  ✓ Q&A with cited answers
  ✓ Paper comparison with AI report
  ✓ Trend analysis (Pro/Team only)
  ✓ SaaS usage tracking and plan limits
  ✓ Full React frontend with all pages

Version 2 — 📋 Planned
  - Advanced search filters (year, author, topic)
  - Paper tagging and categorization
  - Export comparison reports as PDF

Version 3 — 📋 Planned
  - Team workspace with shared paper library
  - Collaborative Q&A sessions
  - Admin dashboard

Version 4 — 📋 Planned
  - Trend visualization with Recharts
  - Citation network graph
  - Mobile responsive improvements
```
