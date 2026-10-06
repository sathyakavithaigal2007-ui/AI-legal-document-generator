import io
from typing import Dict, Any
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Canvas that computes total page count and adds professional running footers."""
    def __init__(self, *args, footer_text="LegalEase AI Document Generator", company_name="", **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []
        self.footer_text = footer_text
        self.company_name = company_name

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1 and self.company_name:
            self.drawString(54, 750, self.company_name.upper())
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(54, 744, 612 - 54, 744)

        # Footer
        footer_str = f"{self.footer_text}   |   Page {self._pageNumber} of {page_count}"
        self.drawCentredString(306, 36, footer_str)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 48, 612 - 54, 48)
        
        self.restoreState()


def generate_pdf_bytes(doc_data: Dict[str, Any]) -> bytes:
    """Generates a high-quality PDF legal document."""
    buffer = io.BytesIO()
    
    title_text = doc_data.get("title", "LEGAL AGREEMENT")
    content = doc_data.get("content", "")
    branding = doc_data.get("branding", {}) or {}
    company_name = branding.get("company_name", "")
    footer_text = branding.get("footer_text", "Generated via LegalEase AI Document Generator")

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    style_company = ParagraphStyle(
        'CompanyHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor("#4F46E5"),
        alignment=TA_RIGHT,
        spaceAfter=12
    )

    style_title = ParagraphStyle(
        'LegalTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#0F172A"),
        alignment=TA_CENTER,
        spaceBefore=10,
        spaceAfter=8
    )

    style_date = ParagraphStyle(
        'LegalDate',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor("#475569"),
        alignment=TA_CENTER,
        spaceAfter=18
    )

    style_section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=12,
        leading=15,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=14,
        spaceAfter=6
    )

    style_body = ParagraphStyle(
        'LegalBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor("#1E293B"),
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )

    style_signature = ParagraphStyle(
        'SignatureLine',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#0F172A"),
        spaceBefore=4,
        spaceAfter=2
    )

    story = []

    if company_name:
        story.append(Paragraph(company_name.upper(), style_company))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#6366F1"), spaceAfter=15))

    story.append(Paragraph(title_text.upper(), style_title))

    if doc_data.get("effective_date"):
        story.append(Paragraph(f"EFFECTIVE DATE: {doc_data.get('effective_date')}", style_date))

    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#CBD5E1"), spaceAfter=14))

    lines = content.split('\n')
    for line in lines:
        stripped = line.strip()
        if not stripped:
            story.append(Spacer(1, 4))
            continue

        # Header detection
        if stripped.isupper() or stripped.endswith(":") or (len(stripped) > 2 and stripped[0].isdigit() and stripped[1] in ['.', ' ']):
            story.append(Paragraph(stripped, style_section_heading))
        elif stripped.startswith("BY:") or stripped.startswith("TITLE:") or stripped.startswith("ENTITY:") or stripped.startswith("DATE:"):
            story.append(Paragraph(stripped, style_signature))
        elif stripped.startswith("___"):
            story.append(Spacer(1, 12))
            story.append(Paragraph(stripped, style_signature))
        else:
            # Escape HTML special characters for reportlab paragraph format
            safe_text = stripped.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            story.append(Paragraph(safe_text, style_body))

    def make_canvas(*args, **kwargs):
        return NumberedCanvas(*args, footer_text=footer_text, company_name=company_name, **kwargs)

    doc.build(story, canvasmaker=make_canvas)
    buffer.seek(0)
    return buffer.getvalue()
