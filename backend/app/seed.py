"""Run once to populate the database with the starter projects & experience data:
    python -m app.seed
Safe to re-run — it skips records that already exist.
"""
import json
from pathlib import Path
from sqlmodel import Session, select

from .database import engine, init_db
from .models import Project, Experience

CONTENT_DIR = Path(__file__).resolve().parent.parent.parent / "content"


def seed_projects(session: Session) -> None:
    with open(CONTENT_DIR / "projects.json", encoding="utf-8") as f:
        items = json.load(f)
    for item in items:
        if session.get(Project, item["id"]):
            continue
        session.add(Project(**item))
    session.commit()


def seed_experience(session: Session) -> None:
    with open(CONTENT_DIR / "experience.json", encoding="utf-8") as f:
        items = json.load(f)
    for item in items:
        if session.get(Experience, item["id"]):
            continue
        session.add(Experience(**item))
    session.commit()


def main():
    init_db()
    with Session(engine) as session:
        seed_projects(session)
        seed_experience(session)
    print("Seed complete: projects and experience loaded into the database.")


if __name__ == "__main__":
    main()
