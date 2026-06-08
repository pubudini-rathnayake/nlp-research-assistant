from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from dotenv import load_dotenv
import os

load_dotenv()

def get_llm():
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash-lite",
        google_api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.3
    )

def answer_question(question: str, context_docs: list) -> dict:
    if not context_docs:
        return {
            "answer": "I could not find relevant information in the uploaded papers.",
            "sources": []
        }

    context = "\n\n".join([
        f"[Source: {doc.metadata.get('title', 'Unknown')} - Chunk {doc.metadata.get('chunk_index', '?')}]\n{doc.page_content}"
        for doc in context_docs
    ])

    llm = get_llm()

    messages = [
        SystemMessage(content="""You are an expert NLP research assistant. 
        Answer questions based ONLY on the provided research paper context.
        Always cite which paper your answer comes from.
        Be precise, academic, and helpful."""),
        HumanMessage(content=f"""Context from research papers:
{context}

Question: {question}

Please provide a detailed answer based on the context above, 
citing the specific paper(s) your answer comes from.""")
    ]

    response = llm.invoke(messages)

    sources = list(set([
        doc.metadata.get("title", "Unknown")
        for doc in context_docs
    ]))

    return {
        "answer": response.content,
        "sources": sources
    }

def summarize_paper(text: str, title: str) -> str:
    llm = get_llm()

    messages = [
        SystemMessage(content="""You are an expert NLP research summarizer.
        Create clear, structured summaries of research papers.
        Focus on: problem statement, methodology, key findings, and contributions."""),
        HumanMessage(content=f"""Please summarize this NLP research paper titled "{title}":

{text[:8000]}

Provide a structured summary with:
1. Problem Statement
2. Methodology  
3. Key Findings
4. Main Contributions
5. Limitations (if mentioned)""")
    ]

    response = llm.invoke(messages)
    return response.content

def compare_papers(papers_data: list) -> str:
    llm = get_llm()

    papers_text = "\n\n".join([
        f"Paper {i+1}: {p['title']}\nSummary: {p['summary']}"
        for i, p in enumerate(papers_data)
    ])

    messages = [
        SystemMessage(content="""You are an expert NLP researcher.
        Compare research papers objectively and thoroughly."""),
        HumanMessage(content=f"""Compare these NLP research papers:

{papers_text}

Provide a detailed comparison covering:
1. Research Goals & Problems Addressed
2. Methodologies & Approaches
3. Key Results & Performance
4. Similarities
5. Differences
6. Overall Assessment""")
    ]

    response = llm.invoke(messages)
    return response.content

def analyze_trends(papers_data: list) -> str:
    llm = get_llm()

    papers_text = "\n\n".join([
        f"Paper: {p['title']}\nSummary: {p['summary']}"
        for p in papers_data
    ])

    messages = [
        SystemMessage(content="""You are an expert NLP research analyst.
        Identify trends and patterns across research papers."""),
        HumanMessage(content=f"""Analyze these NLP research papers for trends:

{papers_text}

Provide a trend analysis covering:
1. Dominant Research Themes
2. Emerging Topics
3. Common Methodologies
4. Research Gaps
5. Future Directions""")
    ]

    response = llm.invoke(messages)
    return response.content