import pymupdf
import os

UPLOAD_DIR = "uploads"


def ensure_upload_dir():
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)


def extract_text_from_pdf(file_path: str) -> dict:
    doc = pymupdf.open(file_path)

    full_text = ""
    page_count = doc.page_count

    for page in doc:
        full_text += page.get_text()

    doc.close()

    word_count = len(full_text.split())

    return {
        "text": full_text,
        "page_count": page_count,
        "word_count": word_count
    }


def save_uploaded_file(file_content: bytes, filename: str) -> str:
    ensure_upload_dir()
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        f.write(file_content)
    return file_path


def delete_file(file_path: str):
    if os.path.exists(file_path):
        os.remove(file_path)