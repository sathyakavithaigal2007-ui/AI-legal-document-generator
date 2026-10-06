# LegalEase — AI-Powered Legal Document Generator

LegalEase is a premium, production-quality AI-powered legal document generation SaaS platform designed to streamline contract creation for businesses, founders, contractors, and individuals without starting from scratch.

---

## 🌟 Key Features

- **Multi-Step Document Builder Wizard**: Step-by-step guidance for Document Selection, Basic Info, Dynamic Parties, Terms & Clauses, Branding, and AI Generation.
- **AI Core powered by Google Gemini**: Synthesizes structured legal contracts tailored to specified jurisdictions, dates, parties, and covenants.
- **Demo Mode Fallback**: Built-in, clearly labeled Demo Mode kicks in automatically if `GEMINI_API_KEY` is not present, ensuring full platform functionality and UI demonstrations.
- **Dual Document Workspace**: Realistic legal document paper preview paired with a powerful structured WYSIWYG text editor.
- **AI Assist Tools**:
  - *Explain Clause*: Plain-language breakdown and potential legal risks.
  - *Simplify Language*: Converts legalese to conversational language.
  - *Improve & Legalize*: Enhances legal enforceability and formal tone.
  - *Suggest Missing Provisions*: Recommends essential missing contract clauses.
  - *Translate Clause*: Multi-language legal translation.
- **Key Clause Highlighting & Navigation**: Clickable clause tags (Confidentiality, Payment, Termination, Liability, IP, Dispute Resolution) with auto-scroll positioning.
- **Multi-Format Export Engine**: Download crisp, branded legal files in **PDF**, **DOCX (Microsoft Word)**, or **TXT**.
- **Custom Branding Support**: Add company headers, author signatures, custom footers, and logo placeholders.
- **Template Library Marketplace**: Pre-built legal contract templates for NDAs, Employment Contracts, Freelance Agreements, Lease Agreements, Service Agreements, Offer Letters, and Partnerships.
- **Document History & Dashboard**: Full search, filtering, duplication, editing, and deletion operations for saved drafts.
- **Clear Legal Disclaimer & Security First Architecture**: Prominent disclaimers reminding users that generated contracts should be reviewed by licensed attorneys.

---

## 🛠 Tech Stack & Architecture

- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons
- **Backend Engine**: FastAPI (Python 3.14), Uvicorn, Pydantic
- **AI Synthesis**: Google Gemini AI (`google-genai` SDK)
- **Document Formatting Engines**:
  - `reportlab` (PDF generation with custom headers, footers & canvas page numbering)
  - `python-docx` (Microsoft Word .docx document generation with legal typography)
  - Plain Text UTF-8 formatter (.txt)

---

## 🚀 Quick Start & Installation

### Prerequisites
- Python 3.10+
- Node.js v18+ & npm

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Set your Google Gemini API Key in .env
cp .env.example .env
# Add your GEMINI_API_KEY=your_real_key_here to .env

# Run FastAPI Server
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The backend will run at `http://127.0.0.1:8000` (API Docs available at `http://127.0.0.1:8000/docs`).

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install Node dependencies
npm install

# Start Vite Development Server
npm run dev -- --host 127.0.0.1 --port 3000
```
Open your browser at `http://127.0.0.1:3000`.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server status and version health check |
| `POST` | `/generate` | Generate structured legal contract from parties, dates & terms |
| `POST` | `/ai-assist` | Explain, simplify, improve, or translate clauses |
| `GET` | `/documents` | List saved documents with search and category filters |
| `GET` | `/documents/{id}` | Retrieve single document details |
| `POST` | `/documents` | Save a newly generated or updated document |
| `PUT` | `/documents/{id}` | Update document title, content, or status |
| `DELETE` | `/documents/{id}` | Delete document by ID |
| `POST` | `/documents/export/pdf` | Export document as PDF file |
| `POST` | `/documents/export/docx` | Export document as DOCX file |
| `POST` | `/documents/export/txt` | Export document as TXT file |

---

## ⚖️ Legal Disclaimer

LegalEase is an AI-assisted legal document generation and legal information tool, NOT a law firm or a replacement for a qualified attorney. Generated documents may contain errors or omissions and should be reviewed by a licensed legal professional before execution for important legal matters.
