from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from services.embedding_service import get_embeddings
from dotenv import load_dotenv
import os

load_dotenv()

CHROMA_PERSIST_DIR = os.getenv("CHROMA_PERSIST_DIR", "./chroma_store")

def get_chroma_client(collection_name: str) -> Chroma:
    return Chroma(
        collection_name=collection_name,
        embedding_function=get_embeddings(),
        persist_directory=CHROMA_PERSIST_DIR
    )

def store_paper_in_chroma(text: str, paper_id: int, title: str) -> str:
    collection_name = f"paper_{paper_id}"

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len
    )
    chunks = text_splitter.split_text(text)

    metadatas = [
        {
            "paper_id": str(paper_id),
            "title": title,
            "chunk_index": str(i)
        }
        for i in range(len(chunks))
    ]

    vectorstore = get_chroma_client(collection_name)
    vectorstore.add_texts(texts=chunks, metadatas=metadatas)

    return collection_name

def search_paper(query: str, collection_name: str, k: int = 5) -> list:
    vectorstore = get_chroma_client(collection_name)
    results = vectorstore.similarity_search(query, k=k)
    return results

def search_all_papers(query: str, paper_ids: list, k: int = 5) -> list:
    all_results = []
    for paper_id in paper_ids:
        collection_name = f"paper_{paper_id}"
        try:
            results = search_paper(query, collection_name, k=k)
            all_results.extend(results)
        except Exception:
            continue
    return all_results

def delete_paper_from_chroma(collection_name: str):
    try:
        vectorstore = get_chroma_client(collection_name)
        vectorstore.delete_collection()
    except Exception:
        pass