import os
import json
import uuid
import logging
from datetime import datetime
from typing import List, Dict, Any, Optional

logger = logging.getLogger("legalease.document_service")

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
DB_FILE = os.path.join(DATA_DIR, "documents_db.json")

INITIAL_SAMPLE_DOCS = [
    {
        "id": "doc-sample-1",
        "title": "Mutual Non-Disclosure Agreement",
        "document_type": "Non-Disclosure Agreement (NDA)",
        "effective_date": "2026-04-15",
        "expiry_date": "2028-04-15",
        "jurisdiction": "State of Delaware, USA",
        "company_name": "TechNova Solutions Inc.",
        "parties": [
            {
                "name": "Jane Doe",
                "role": "Disclosing Party",
                "organization": "TechNova Solutions Inc.",
                "address": "100 Corporate Blvd, Suite 400, Wilmington, DE",
                "email": "jane.doe@technova.io"
            },
            {
                "name": "Acme Innovations Corp",
                "role": "Receiving Party",
                "organization": "Acme Innovations Corp",
                "address": "500 Innovation Way, Silicon Valley, CA",
                "email": "contact@acmeinnovations.com"
            }
        ],
        "terms": [
            "Confidentiality must be maintained for a minimum of two (2) years.",
            "Information may only be disclosed to employees on a strict need-to-know basis.",
            "Either party may terminate the exchange with 15 days notice."
        ],
        "branding": {
            "company_name": "TechNova Solutions",
            "footer_text": "TechNova Confidential & Proprietary Document",
            "author_name": "Legal Counsel Office"
        },
        "content": """MUTUAL NON-DISCLOSURE AGREEMENT

THIS MUTUAL NON-DISCLOSURE AGREEMENT ("Agreement") is entered into as of April 15, 2026 ("Effective Date"), by and between:

1. TechNova Solutions Inc., located at 100 Corporate Blvd, Suite 400, Wilmington, DE ("Disclosing Party"), represented by Jane Doe.
2. Acme Innovations Corp, located at 500 Innovation Way, Silicon Valley, CA ("Receiving Party").

1. PURPOSE & PROPRIETARY INFORMATION
The Parties intend to engage in commercial evaluations concerning technical software joint ventures. In connection with this purpose, each party may disclose valuable trade secrets, software code, and financial models ("Confidential Information").

2. CONFIDENTIALITY COVENANTS
2.1 Non-Disclosure: Receiving Party shall hold all Confidential Information in strict confidence and shall not copy, reproduce, or distribute such materials without prior express written approval.
2.2 Standard of Care: Receiving Party shall protect Disclosing Party's Confidential Information with the same degree of care it uses for its own proprietary records, but no less than high commercial standards.

3. TERM AND EXPIRED OBLIGATIONS
This Agreement commences on April 15, 2026 and shall remain active for two (2) years until April 15, 2028. Termination of discussions shall not relieve Receiving Party of non-disclosure covenants.

4. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the substantive laws of the State of Delaware, USA.

IN WITNESS WHEREOF, the Parties have executed this Mutual NDA as of the date first above written.

________________________________________
BY: Jane Doe
TITLE: VP of Corporate Development
ENTITY: TechNova Solutions Inc.

________________________________________
BY: Marcus Vance
TITLE: Managing Director
ENTITY: Acme Innovations Corp""",
        "summary": {
            "document_type": "Non-Disclosure Agreement (NDA)",
            "party_count": 2,
            "clause_count": 8,
            "estimated_read_time": "3 min read",
            "governing_law": "State of Delaware, USA",
            "key_provisions": ["Confidentiality", "2-Year Term", "Delaware Law"],
            "potential_concerns": ["Verify standard of care definitions."]
        },
        "key_clauses": [
            {"tag": "Confidentiality", "section": "Section 2", "snippet": "Receiving Party shall hold all Confidential Information in strict confidence..."},
            {"tag": "Termination", "section": "Section 3", "snippet": "This Agreement commences on April 15, 2026 and shall remain active for two (2) years..."},
            {"tag": "Dispute Resolution", "section": "Section 4", "snippet": "This Agreement shall be governed by and construed in accordance with the substantive laws of Delaware..."}
        ],
        "status": "Finalized",
        "created_at": "2026-04-15T09:30:00Z",
        "updated_at": "2026-04-15T10:15:00Z",
        "is_demo": True
    },
    {
        "id": "doc-sample-2",
        "title": "Freelance Software Development Agreement",
        "document_type": "Freelance Contract",
        "effective_date": "2026-05-01",
        "expiry_date": "2026-11-01",
        "jurisdiction": "State of California, USA",
        "company_name": "Aura Digital Labs",
        "parties": [
            {
                "name": "Jane Doe",
                "role": "Service Provider",
                "organization": "Doe Engineering LLC",
                "address": "742 Evergreen Terrace, San Francisco, CA",
                "email": "jane@doeengineering.com"
            },
            {
                "name": "TechNova Inc.",
                "role": "Client",
                "organization": "TechNova Inc.",
                "address": "100 Corporate Blvd, Wilmington, DE",
                "email": "dev-hiring@technova.io"
            }
        ],
        "terms": [
            "Payment must be completed within 30 days of monthly invoice.",
            "Provider delivers source code by agreed milestone deadlines.",
            "Confidentiality must be maintained at all times.",
            "Either party may terminate the agreement with 15 days notice."
        ],
        "branding": {
            "company_name": "Aura Digital Labs",
            "footer_text": "Aura Digital Standard Contractor Agreement",
            "author_name": "Operations Team"
        },
        "content": """FREELANCE SOFTWARE DEVELOPMENT AGREEMENT

THIS FREELANCE AGREEMENT ("Agreement") is made effective May 01, 2026, by and between Jane Doe ("Service Provider") and TechNova Inc. ("Client").

1. SCOPE OF SERVICES
Service Provider shall perform custom full-stack React and Python engineering services as specified under Statement of Work #1.

2. COMPENSATION & PAYMENT TERMS
Client shall compensate Service Provider at the rate of $120.00 per hour. Invoices shall be submitted semi-monthly. Payment must be completed within 30 days of invoice submission.

3. INTELLECTUAL PROPERTY OWNERSHIP
Upon receipt of full payment, Service Provider hereby assigns to Client all right, title, and interest in and to all code, software deliverables, and work product created hereunder.

4. TERMINATION
Either party may terminate this agreement at any time by delivering fifteen (15) calendar days prior written notice.

5. GOVERNING LAW
This agreement is governed under the laws of the State of California, USA.

IN WITNESS WHEREOF, the parties hereto execute this Agreement as of May 01, 2026.

________________________________________
BY: Jane Doe
TITLE: Principal Software Architect

________________________________________
BY: Robert Sterling
TITLE: CTO, TechNova Inc.""",
        "summary": {
            "document_type": "Freelance Contract",
            "party_count": 2,
            "clause_count": 7,
            "estimated_read_time": "2 min read",
            "governing_law": "State of California, USA",
            "key_provisions": ["$120/hr Rate", "Net 30 Payment", "IP Assignment", "15-Day Termination"],
            "potential_concerns": ["Confirm milestone acceptance criteria in writing."]
        },
        "key_clauses": [
            {"tag": "Payment", "section": "Section 2", "snippet": "Payment must be completed within 30 days of invoice submission..."},
            {"tag": "Intellectual Property", "section": "Section 3", "snippet": "Service Provider hereby assigns to Client all right, title, and interest..."},
            {"tag": "Termination", "section": "Section 4", "snippet": "Either party may terminate this agreement at any time by delivering fifteen (15) calendar days prior written notice..."}
        ],
        "status": "Draft",
        "created_at": "2026-05-01T11:00:00Z",
        "updated_at": "2026-05-01T11:00:00Z",
        "is_demo": True
    }
]

def _ensure_db():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(INITIAL_SAMPLE_DOCS, f, indent=2)

def list_documents(query: str = "", category: str = "All") -> List[Dict[str, Any]]:
    _ensure_db()
    try:
        with open(DB_FILE, "r", encoding="utf-8") as f:
            docs = json.load(f)
    except Exception as e:
        logger.error(f"Error loading documents: {e}")
        docs = INITIAL_SAMPLE_DOCS

    filtered = []
    for doc in docs:
        d_type = doc.get("document_type", "").lower()
        title = doc.get("title", "").lower()
        
        # Category filter
        if category != "All":
            cat_lower = category.lower()
            if cat_lower == "contracts" and "contract" not in d_type:
                continue
            elif cat_lower == "ndas" and "nda" not in d_type and "disclosure" not in d_type:
                continue
            elif cat_lower == "leases" and "lease" not in d_type:
                continue
            elif cat_lower == "employment" and "employment" not in d_type and "offer" not in d_type:
                continue

        # Search query filter
        if query:
            q_lower = query.lower()
            if q_lower not in title and q_lower not in d_type and q_lower not in doc.get("content", "").lower():
                continue

        filtered.append(doc)

    return sorted(filtered, key=lambda x: x.get("updated_at", ""), reverse=True)

def get_document_by_id(doc_id: str) -> Optional[Dict[str, Any]]:
    _ensure_db()
    with open(DB_FILE, "r", encoding="utf-8") as f:
        docs = json.load(f)
    for d in docs:
        if d.get("id") == doc_id:
            return d
    return None

def save_document(doc_data: Dict[str, Any]) -> Dict[str, Any]:
    _ensure_db()
    with open(DB_FILE, "r", encoding="utf-8") as f:
        docs = json.load(f)

    now_iso = datetime.utcnow().isoformat() + "Z"
    new_id = f"doc-{uuid.uuid4().hex[:8]}"

    doc_obj = {
        "id": doc_data.get("id") or new_id,
        "title": doc_data.get("title", "Untitled Document"),
        "document_type": doc_data.get("document_type", "Custom Legal Document"),
        "effective_date": doc_data.get("effective_date", datetime.now().strftime("%Y-%m-%d")),
        "expiry_date": doc_data.get("expiry_date", ""),
        "jurisdiction": doc_data.get("jurisdiction", "State of Delaware, USA"),
        "company_name": doc_data.get("company_name", ""),
        "parties": doc_data.get("parties", []),
        "terms": doc_data.get("terms", []),
        "branding": doc_data.get("branding", {}),
        "content": doc_data.get("content", ""),
        "summary": doc_data.get("summary", {}),
        "key_clauses": doc_data.get("key_clauses", []),
        "status": doc_data.get("status", "Draft"),
        "created_at": doc_data.get("created_at") or now_iso,
        "updated_at": now_iso,
        "is_demo": doc_data.get("is_demo", False)
    }

    # Replace if exists, else append
    existing_idx = next((i for i, d in enumerate(docs) if d["id"] == doc_obj["id"]), None)
    if existing_idx is not None:
        docs[existing_idx] = doc_obj
    else:
        docs.append(doc_obj)

    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(docs, f, indent=2)

    return doc_obj

def update_document(doc_id: str, update_fields: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    _ensure_db()
    with open(DB_FILE, "r", encoding="utf-8") as f:
        docs = json.load(f)

    for i, d in enumerate(docs):
        if d.get("id") == doc_id:
            for k, v in update_fields.items():
                if v is not None:
                    d[k] = v
            d["updated_at"] = datetime.utcnow().isoformat() + "Z"
            docs[i] = d
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump(docs, f, indent=2)
            return d
    return None

def delete_document(doc_id: str) -> bool:
    _ensure_db()
    with open(DB_FILE, "r", encoding="utf-8") as f:
        docs = json.load(f)

    filtered = [d for d in docs if d.get("id") != doc_id]
    if len(filtered) == len(docs):
        return False

    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(filtered, f, indent=2)
    return True
