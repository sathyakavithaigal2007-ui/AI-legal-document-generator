import os
import json
import logging
from typing import Dict, Any, List
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("legalease.gemini")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

def get_gemini_client():
    if not GEMINI_API_KEY or GEMINI_API_KEY.startswith("your_"):
        return None
    try:
        from google import genai
        return genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        logger.warning(f"Could not initialize Gemini Client: {e}")
        return None


def generate_document_ai(req_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generates a structured legal document using Google Gemini AI, or falls back to Demo Mode if key is missing.
    """
    client = get_gemini_client()
    
    document_type = req_data.get("document_type", "Legal Agreement")
    title = req_data.get("title") or f"{document_type}"
    effective_date = req_data.get("effective_date", "Immediately upon execution")
    expiry_date = req_data.get("expiry_date", "")
    jurisdiction = req_data.get("jurisdiction", "State of Delaware, USA")
    company_name = req_data.get("company_name", "")
    parties = req_data.get("parties", [])
    terms = req_data.get("terms", [])
    special_notes = req_data.get("special_notes", "")
    branding = req_data.get("branding", {})

    if not client:
        logger.info("Using Demo Mode generator (Gemini API key not configured or invalid).")
        return _generate_demo_document(document_type, title, effective_date, expiry_date, jurisdiction, company_name, parties, terms, special_notes, branding)

    # Prompt constructing structured legal document
    parties_formatted = "\n".join([
        f"- {p.get('name', 'Party')} ({p.get('role', 'Participant')})"
        f"{', representing ' + p.get('organization') if p.get('organization') else ''}"
        f"{', located at ' + p.get('address') if p.get('address') else ''}"
        f"{', Email: ' + p.get('email') if p.get('email') else ''}"
        for p in parties
    ])
    
    terms_formatted = "\n".join([f"- Clause {i+1}: {t}" for i, t in enumerate(terms)])

    prompt = f"""
You are an expert legal counsel drafting a formal, professional {document_type} under the laws of {jurisdiction}.

DOCUMENT SPECIFICATIONS:
Document Title: {title}
Document Type: {document_type}
Effective Date: {effective_date}
Expiry / Duration: {expiry_date if expiry_date else 'Perpetual / Until Terminated in writing'}
Governing Jurisdiction: {jurisdiction}
Primary Company/Entity: {company_name}

INVOLVED PARTIES:
{parties_formatted}

KEY TERMS & USER SPECIFIED CLAUSES:
{terms_formatted}

ADDITIONAL INSTRUCTIONS / SPECIAL NOTES:
{special_notes if special_notes else 'None'}

REQUIREMENTS FOR GENERATED CONTENT:
1. Format as clean, professional legal text suitable for formal execution.
2. Use clear numbered section headings (e.g. 1. DEFINITIONS, 2. SCOPE OF SERVICES, 3. PAYMENT & COMPENSATION, 4. CONFIDENTIALITY, 5. TERM AND TERMINATION, 6. INTELLECTUAL PROPERTY, 7. LIMITATION OF LIABILITY, 8. GOVERNING LAW & DISPUTE RESOLUTION, 9. MISCELLANEOUS, 10. SIGNATURES).
3. Seamlessly integrate all specified user terms and party details without leaving unresolved placeholders unless necessary.
4. Maintain high legal precision, formal wording, and balanced risk distribution.
5. Include explicit Signature Blocks for each party at the end.
6. Do NOT include generic chat commentary (like "Here is your contract:"). Return ONLY the text of the legal document.

Respond in JSON format with the following keys:
{{
  "content": "<The full legal document string formatted with sections>",
  "summary": {{
    "document_type": "{document_type}",
    "party_count": {len(parties)},
    "clause_count": {len(terms) + 8},
    "estimated_read_time": "4 min read",
    "governing_law": "{jurisdiction}",
    "key_provisions": ["Confidentiality", "Termination", "Liability Limitation", "Governing Law"],
    "potential_concerns": ["Ensure dispute resolution venue aligns with operational headquarters.", "Verify tax withholding responsibilities if applicable."]
  }},
  "key_clauses": [
    {{"tag": "Confidentiality", "section": "Section 4", "snippet": "Confidential Information shall include all technical, financial, and business data..."}},
    {{"tag": "Payment", "section": "Section 3", "snippet": "All invoices shall be settled within thirty (30) calendar days..."}},
    {{"tag": "Termination", "section": "Section 5", "snippet": "Either party may terminate this Agreement upon fifteen (15) days prior written notice..."}},
    {{"tag": "Liability", "section": "Section 7", "snippet": "Neither party shall be liable for indirect, consequential, or punitive damages..."}},
    {{"tag": "Dispute Resolution", "section": "Section 8", "snippet": "This Agreement shall be governed by and construed in accordance with the laws of {jurisdiction}..."}}
  ]
}}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={"response_mime_type": "application/json"}
        )
        
        parsed = json.loads(response.text)
        parsed["is_demo"] = False
        return parsed
    except Exception as e:
        logger.error(f"Gemini API execution error: {e}. Falling back to Demo Mode.")
        return _generate_demo_document(document_type, title, effective_date, expiry_date, jurisdiction, company_name, parties, terms, special_notes, branding, is_fallback=True)


def _generate_demo_document(document_type: str, title: str, effective_date: str, expiry_date: str, jurisdiction: str, company_name: str, parties: List[Dict[str, Any]], terms: List[str], special_notes: str, branding: Dict[str, Any], is_fallback: bool = False) -> Dict[str, Any]:
    """Creates a high-quality, realistic demo document when Gemini API key is missing."""
    
    p1_name = parties[0].get("name", "First Party") if len(parties) > 0 else "Disclosing Party"
    p1_role = parties[0].get("role", "Party A") if len(parties) > 0 else "Disclosing Party"
    p1_org = parties[0].get("organization", company_name or "Primary Entity") if len(parties) > 0 else "Primary Entity"
    p1_addr = parties[0].get("address", "100 Corporate Blvd, Suite 400, Wilmington, DE") if len(parties) > 0 else "Address On File"

    p2_name = parties[1].get("name", "Second Party") if len(parties) > 2 or len(parties) > 1 else "Receiving Party"
    p2_role = parties[1].get("role", "Party B") if len(parties) > 1 else "Receiving Party"
    p2_org = parties[1].get("organization", "Partner Organization") if len(parties) > 1 else "Counterparty Entity"
    p2_addr = parties[1].get("address", "500 Innovation Way, Tech Park, CA 94025") if len(parties) > 1 else "Address On File"

    clauses_text = ""
    for idx, term in enumerate(terms, start=1):
        clauses_text += f"3.{idx} Specific Provision: {term}\n"

    if not clauses_text:
        clauses_text = (
            "3.1 Payment Terms: All invoices and fee schedules shall be remitted within thirty (30) calendar days of receipt.\n"
            "3.2 Confidential Information: Both parties agree to protect and maintain non-public technical and commercial disclosures strictly in confidence.\n"
            "3.3 Standard of Performance: Services and deliverables shall be executed in accordance with highest professional industry standards.\n"
        )

    doc_text = f"""{title.upper()}

THIS {document_type.upper()} ("Agreement") is made and entered into as of {effective_date} ("Effective Date"), by and between:

PARTIES:
1. {p1_name}, acting in the capacity of {p1_role} ("{p1_role.title()}"), representing {p1_org}, located at {p1_addr}.
2. {p2_name}, acting in the capacity of {p2_role} ("{p2_role.title()}"), representing {p2_org}, located at {p2_addr}.

WHEREAS, {p1_role.title()} and {p2_role.title()} desire to formalize their mutual rights, covenants, and responsibilities concerning the matters described herein under the laws of {jurisdiction}.

NOW, THEREFORE, in consideration of the mutual covenants contained herein and other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:

1. DEFINITIONS AND INTERPRETATION
1.1 "Agreement" refers to this {document_type}, including all schedules, exhibits, and amendments attached hereto.
1.2 "Confidential Information" means any proprietary data, trade secrets, software, customer lists, or financial records disclosed by either Party.
1.3 "Effective Date" shall be {effective_date}.
1.4 "Term" shall commence on the Effective Date and remain in force until {expiry_date if expiry_date else "terminated in accordance with Section 5"}.

2. SCOPE AND RECITALS
2.1 Purpose: This Agreement governs the formal operational relationship between {p1_name} and {p2_name} in connection with {document_type}.
2.2 Jurisdiction: This Agreement is drafted in compliance with statutory requirements enforced within {jurisdiction}.

3. OPERATIONAL COVENANTS & SPECIFIC TERMS
{clauses_text}

4. CONFIDENTIALITY & NON-DISCLOSURE
4.1 Duty of Confidentiality: Each Party agrees to hold in strict confidence all Confidential Information of the other Party, using at least the same degree of care it employs to protect its own confidential materials of similar nature, but no less than reasonable care.
4.2 Exclusions: Confidential Information does not include information that is publicly known through no breach of this Agreement, or was independently developed without reference to disclosed materials.

5. TERM AND TERMINATION
5.1 Duration: This Agreement becomes effective on {effective_date} and shall expire on {expiry_date if expiry_date else "written mutual release"}.
5.2 Termination for Convenience: Either Party may terminate this Agreement by giving at least fifteen (15) calendar days prior written notice to the other Party.
5.3 Termination for Cause: Immediate termination may occur upon material breach not cured within seven (7) days of formal written default notification.

6. INTELLECTUAL PROPERTY RIGHTS
6.1 Ownership: All pre-existing intellectual property, copyrights, patents, and trademarks remain the sole property of the originating Party.
6.2 Deliverables: Any custom work product developed under this Agreement shall belong strictly to {p1_org} upon full settlement of financial obligations.

7. LIMITATION OF LIABILITY
7.1 Liability Cap: To the maximum extent permitted under law, neither party's total aggregate liability arising out of or related to this Agreement shall exceed the total amount paid under this Agreement in the six (6) months prior to the event giving rise to liability.
7.2 Consequential Damages Exclusion: IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.

8. GOVERNING LAW AND DISPUTE RESOLUTION
8.1 Governing Law: This Agreement shall be governed by, interpreted, and enforced in accordance with the substantive laws of {jurisdiction}.
8.2 Arbitration & Venue: Any dispute, controversy, or claim arising out of this Agreement shall be settled through binding arbitration conducted in accordance with commercial arbitration standards within {jurisdiction}.

9. MISCELLANEOUS PROVISIONS
9.1 Entire Agreement: This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior proposals, negotiations, or representations.
9.2 Severability: If any provision is deemed invalid or unenforceable, the remaining provisions shall continue in full force and effect.
9.3 Amendments: Modifications to this Agreement must be executed in writing signed by authorized representatives of both Parties.

IN WITNESS WHEREOF, the Parties hereto have caused this {document_type} to be duly executed by their authorized representatives as of the Effective Date written above.


________________________________________
BY: {p1_name}
TITLE: {p1_role}
ENTITY: {p1_org}
DATE: {effective_date}


________________________________________
BY: {p2_name}
TITLE: {p2_role}
ENTITY: {p2_org}
DATE: {effective_date}
"""

    demo_note = "Demo Mode — AI API key not configured in environment variables." if not is_fallback else "Demo Mode — Fell back due to API response timeout."

    return {
        "content": doc_text.strip(),
        "is_demo": True,
        "demo_note": demo_note,
        "summary": {
            "document_type": document_type,
            "party_count": len(parties) if parties else 2,
            "clause_count": len(terms) + 9,
            "estimated_read_time": "3 min read",
            "governing_law": jurisdiction,
            "key_provisions": ["Confidentiality", "Payment Terms", "Termination Notice", "Liability Limitation", "Governing Law"],
            "potential_concerns": [
                "Demo content generated. Review all financial limits with legal counsel.",
                "Ensure jurisdiction venue matches operational headquarters."
            ]
        },
        "key_clauses": [
            {"tag": "Confidentiality", "section": "Section 4", "snippet": "Each Party agrees to hold in strict confidence all Confidential Information of the other Party..."},
            {"tag": "Payment", "section": "Section 3.1", "snippet": "All invoices and fee schedules shall be remitted within thirty (30) calendar days..."},
            {"tag": "Termination", "section": "Section 5", "snippet": "Either Party may terminate this Agreement by giving at least fifteen (15) calendar days prior written notice..."},
            {"tag": "Liability", "section": "Section 7", "snippet": "Neither party's total aggregate liability arising out of or related to this Agreement shall exceed..."},
            {"tag": "Intellectual Property", "section": "Section 6", "snippet": "All pre-existing intellectual property, copyrights, patents, and trademarks remain the sole property..."},
            {"tag": "Dispute Resolution", "section": "Section 8", "snippet": "This Agreement shall be governed by, interpreted, and enforced in accordance with the substantive laws of..."}
        ]
    }


def ai_assist_clause(clause_text: str, action: str, target_language: str = "English", document_context: str = "") -> Dict[str, Any]:
    """Handles AI Assist operations (improve, simplify, formalize, explain, summarize, translate, suggest_missing)."""
    client = get_gemini_client()
    
    if not client:
        return _demo_ai_assist(clause_text, action, target_language)

    prompt = f"""
You are an AI legal expert assistant. 
Perform the action '{action}' on the provided legal clause text.

Clause Text:
\"\"\"{clause_text}\"\"\"

Document Context:
\"\"\"{document_context}\"\"\"

Target Language (if translating): {target_language}

Instructions per Action:
- 'improve': Enhance precision, clarity, and legal enforceability without altering intent.
- 'simplify': Rewrite in simple plain English that a non-lawyer easily understands.
- 'formalize': Elevate to formal corporate legal language.
- 'explain': Provide a plain-language explanation AND potential legal concerns or risks.
- 'summarize': Provide a 1-2 sentence bullet summary.
- 'translate': Translate the clause accurately to {target_language}.
- 'suggest_missing': Suggest 3 essential missing clauses for this contract type.

Return JSON response:
{{
  "action": "{action}",
  "result_text": "<The rewritten/translated/summarized text or explanation>",
  "explanation": "<Plain language breakdown if applicable>",
  "potential_concerns": ["<Concern 1>", "<Concern 2>"],
  "disclaimer": "AI-assisted suggestion for informational purposes. Not formal legal advice."
}}
"""
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={"response_mime_type": "application/json"}
        )
        return json.loads(response.text)
    except Exception as e:
        logger.error(f"AI Assist error: {e}")
        return _demo_ai_assist(clause_text, action, target_language)


def _demo_ai_assist(clause_text: str, action: str, target_language: str = "English") -> Dict[str, Any]:
    """Demo mode responses for AI Assist features."""
    if action == "explain":
        return {
            "action": "explain",
            "result_text": "Plain Language Explanation: This clause requires both parties to keep shared business details secret and gives a 15-day notice window if either party wants to end the contract.",
            "explanation": "This provision protects proprietary information and ensures neither party is left stranded without prior notice if the relationship ends.",
            "potential_concerns": [
                "15 days notice might be too short for complex transitions.",
                "Ensure 'Confidential Information' covers digital files and email communications explicitly."
            ],
            "disclaimer": "Demo Mode explanation — Informational only. Consult legal counsel for critical agreements."
        }
    elif action == "simplify":
        return {
            "action": "simplify",
            "result_text": "Both sides agree to keep all private business info secret and give at least 15 days written warning before ending this deal.",
            "explanation": "Converted legal jargon into plain conversational language.",
            "potential_concerns": [],
            "disclaimer": "Demo Mode — AI suggestion for informational reference."
        }
    elif action == "improve" or action == "formalize":
        return {
            "action": action,
            "result_text": "Each Party covenants and warrants that it shall maintain all Confidential Information in strict secrecy utilizing reasonable commercial standards of security, and may terminate this instrument upon no less than fifteen (15) calendar days advance written notice.",
            "explanation": "Enhanced legal terminology and procedural precision.",
            "potential_concerns": [],
            "disclaimer": "Demo Mode — AI suggestion for informational reference."
        }
    elif action == "suggest_missing":
        return {
            "action": "suggest_missing",
            "result_text": "Suggested missing provisions for this contract:\n1. Force Majeure (Acts of God / Unforeseen events clause)\n2. Data Privacy & GDPR Compliance Covenant\n3. Non-Solicitation of Key Personnel (12-month restriction)",
            "explanation": "Common provisions typically found in enterprise agreements of this nature.",
            "potential_concerns": [],
            "disclaimer": "Demo Mode — AI suggestion for informational reference."
        }
    else: # translate or summarize
        return {
            "action": action,
            "result_text": f"[{action.upper()} RESULT]: {clause_text[:120]}...",
            "explanation": f"Processed clause using {action} mode.",
            "potential_concerns": [],
            "disclaimer": "Demo Mode — AI suggestion for informational reference."
        }
