from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class Party(BaseModel):
    name: str = Field(..., description="Full Name of individual or organization")
    role: str = Field(..., description="Role in agreement (e.g. Employer, Employee, Disclosing Party, Receiving Party, Lessor, Lessee)")
    organization: Optional[str] = Field(default="", description="Company or Entity Name")
    address: Optional[str] = Field(default="", description="Physical Address")
    email: Optional[str] = Field(default="", description="Email address")

class BrandingOptions(BaseModel):
    company_name: Optional[str] = Field(default="", description="Branded company name for headers")
    logo_url: Optional[str] = Field(default="", description="Base64 or URL for logo")
    brand_color: Optional[str] = Field(default="#0F172A", description="Primary brand color hex")
    footer_text: Optional[str] = Field(default="Generated via LegalEase AI Platform", description="Custom page footer")
    author_name: Optional[str] = Field(default="", description="Prepared by name/title")

class DocumentRequest(BaseModel):
    document_type: str = Field(..., description="Type of document (e.g. Employment Contract, NDA, Lease Agreement)")
    title: Optional[str] = Field(default="", description="Custom title override")
    effective_date: str = Field(..., description="Effective Date of agreement")
    expiry_date: Optional[str] = Field(default="", description="Expiry Date or Term length")
    jurisdiction: str = Field(..., description="Governing state/country/jurisdiction")
    company_name: Optional[str] = Field(default="", description="Primary organization name")
    parties: List[Party] = Field(..., min_items=1, description="Parties involved in agreement")
    terms: List[str] = Field(..., description="List of terms/clauses to include")
    special_notes: Optional[str] = Field(default="", description="Custom instructions or edge cases")
    branding: Optional[BrandingOptions] = Field(default_factory=BrandingOptions)

class ClauseAssistRequest(BaseModel):
    clause_text: str = Field(..., description="The clause or paragraph to modify or explain")
    action: str = Field(..., description="Action: improve, simplify, formalize, explain, summarize, translate, suggest_missing")
    target_language: Optional[str] = Field(default="English", description="Target language for translation")
    document_context: Optional[str] = Field(default="", description="Surrounding document context")

class DocumentModel(BaseModel):
    id: str
    title: str
    document_type: str
    effective_date: str
    expiry_date: Optional[str] = ""
    jurisdiction: str
    company_name: Optional[str] = ""
    parties: List[Party]
    terms: List[str]
    branding: Optional[BrandingOptions] = Field(default_factory=BrandingOptions)
    content: str
    summary: Dict[str, Any] = Field(default_factory=dict)
    key_clauses: List[Dict[str, str]] = Field(default_factory=list)
    status: str = "Draft"  # Draft, Finalized, Under Review
    created_at: str
    updated_at: str
    is_demo: bool = False

class DocumentUpdateModel(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = None
    terms: Optional[List[str]] = None
    parties: Optional[List[Party]] = None
    branding: Optional[BrandingOptions] = None
