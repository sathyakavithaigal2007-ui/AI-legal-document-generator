import re

def sanitize_text(text: str) -> str:
    """Clean and sanitize user input text while preserving punctuation and paragraph breaks."""
    if not text:
        return ""
    # Strip null bytes and control chars (except line breaks and tabs)
    cleaned = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', text)
    return cleaned.strip()
