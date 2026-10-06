import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")

app = FastAPI(
    title="LegalEase API Engine",
    description="Backend AI Legal Document Generation & Export Platform",
    version="1.0.0"
)

# Enable CORS for local React/Vite development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "app": "LegalEase AI-Powered Legal Document Generator API",
        "docs_url": "/docs",
        "health_check": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
