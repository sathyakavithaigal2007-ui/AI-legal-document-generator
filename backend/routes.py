import logging
from fastapi import APIRouter, HTTPException, Response, Query
from typing import List, Optional, Dict, Any

from models import DocumentRequest, ClauseAssistRequest, DocumentModel, DocumentUpdateModel
from ai_core.gemini_generator import generate_document_ai, ai_assist_clause
from services.document_service import (
    list_documents, get_document_by_id, save_document, update_document, delete_document
)
from generators.txt_generator import generate_txt_bytes
from generators.docx_generator import generate_docx_bytes
from generators.pdf_generator import generate_pdf_bytes

logger = logging.getLogger("legalease.routes")

router = APIRouter()

@router.get("/health")
def health_check():
    """Health check endpoint returning system status."""
    return {"status": "ok", "service": "LegalEase AI Document Engine", "version": "1.0.0"}

@router.post("/generate")
def generate_document_endpoint(payload: DocumentRequest):
    """Generates a structured legal document using Google Gemini or Demo Mode fallback."""
    try:
        req_dict = payload.dict()
        result = generate_document_ai(req_dict)
        return result
    except Exception as e:
        logger.error(f"Error in document generation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate document: {str(e)}")

@router.post("/ai-assist")
def ai_assist_endpoint(payload: ClauseAssistRequest):
    """Enhance, simplify, explain, translate, or suggest missing provisions for a clause."""
    try:
        res = ai_assist_clause(
            clause_text=payload.clause_text,
            action=payload.action,
            target_language=payload.target_language,
            document_context=payload.document_context
        )
        return res
    except Exception as e:
        logger.error(f"Error in AI assist: {e}")
        raise HTTPException(status_code=500, detail=f"AI Assist service unavailable: {str(e)}")

@router.get("/documents")
def get_documents(query: Optional[str] = Query("", description="Search term"), category: Optional[str] = Query("All", description="Category filter")):
    """List saved documents with filtering and search."""
    return list_documents(query=query, category=category)

@router.get("/documents/{doc_id}")
def get_single_document(doc_id: str):
    """Get a single document by ID."""
    doc = get_document_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.post("/documents")
def create_save_document(payload: Dict[str, Any]):
    """Save a newly generated or edited document."""
    try:
        saved = save_document(payload)
        return saved
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save document: {str(e)}")

@router.put("/documents/{doc_id}")
def update_existing_document(doc_id: str, payload: DocumentUpdateModel):
    """Update document content, title, status, or terms."""
    updated = update_document(doc_id, payload.dict(exclude_unset=True))
    if not updated:
        raise HTTPException(status_code=404, detail="Document not found")
    return updated

@router.delete("/documents/{doc_id}")
def delete_existing_document(doc_id: str):
    """Delete a document by ID."""
    success = delete_document(doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully", "id": doc_id}

@router.post("/documents/export/txt")
def export_txt(doc_data: Dict[str, Any]):
    """Export document as plain text (.txt)."""
    try:
        file_bytes = generate_txt_bytes(doc_data)
        filename = f"{doc_data.get('title', 'document').replace(' ', '_').lower()}.txt"
        return Response(
            content=file_bytes,
            media_type="text/plain",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"TXT export failed: {str(e)}")

@router.post("/documents/export/docx")
def export_docx(doc_data: Dict[str, Any]):
    """Export document as Microsoft Word (.docx)."""
    try:
        file_bytes = generate_docx_bytes(doc_data)
        filename = f"{doc_data.get('title', 'document').replace(' ', '_').lower()}.docx"
        return Response(
            content=file_bytes,
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error(f"DOCX Export Error: {e}")
        raise HTTPException(status_code=500, detail=f"DOCX export failed: {str(e)}")

@router.post("/documents/export/pdf")
def export_pdf(doc_data: Dict[str, Any]):
    """Export document as PDF (.pdf)."""
    try:
        file_bytes = generate_pdf_bytes(doc_data)
        filename = f"{doc_data.get('title', 'document').replace(' ', '_').lower()}.pdf"
        return Response(
            content=file_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        logger.error(f"PDF Export Error: {e}")
        raise HTTPException(status_code=500, detail=f"PDF export failed: {str(e)}")
