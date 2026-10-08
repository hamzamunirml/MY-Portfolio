import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .database import init_db
from .routers import projects, experience, contact

load_dotenv()

app = FastAPI(
    title="Hamza Munir — Portfolio API",
    description="Backend powering the projects, experience, and contact form for the portfolio.",
    version="1.0.0",
)

origins = [o.strip() for o in os.getenv("FRONTEND_ORIGINS", "*").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"status": "ok", "service": "portfolio-api"}


@app.get("/health")
def health():
    return {"status": "healthy"}


app.include_router(projects.router)
app.include_router(experience.router)
app.include_router(contact.router)
