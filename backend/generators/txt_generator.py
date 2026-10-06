from typing import Dict, Any

def generate_txt_bytes(doc_data: Dict[str, Any]) -> bytes:
    """Generates plain text document content as bytes."""
    title = doc_data.get("title", "Legal Document").upper()
    content = doc_data.get("content", "")
    branding = doc_data.get("branding", {})
    footer = branding.get("footer_text", "Generated via LegalEase AI Platform")
    company = branding.get("company_name", "")

    header_block = ""
    if company:
        header_block = f"========================================================================\n{company.upper()}\n========================================================================\n\n"

    footer_block = f"\n\n========================================================================\n{footer}\n========================================================================"

    full_txt = f"{header_block}{content}{footer_block}"
    return full_txt.encode("utf-8")
