from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models import Experience, ExperienceCreate, ExperienceUpdate
from ..auth import require_admin_key

router = APIRouter(prefix="/api/experience", tags=["experience"])


@router.get("", response_model=List[Experience])
def list_experience(session: Session = Depends(get_session)):
    return session.exec(select(Experience)).all()


@router.get("/{experience_id}", response_model=Experience)
def get_experience(experience_id: str, session: Session = Depends(get_session)):
    item = session.get(Experience, experience_id)
    if not item:
        raise HTTPException(status_code=404, detail="Experience entry not found")
    return item


@router.post("", response_model=Experience, dependencies=[Depends(require_admin_key)])
def create_experience(payload: ExperienceCreate, session: Session = Depends(get_session)):
    if session.get(Experience, payload.id):
        raise HTTPException(status_code=409, detail="An experience entry with this id already exists")
    item = Experience(**payload.model_dump())
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.put("/{experience_id}", response_model=Experience, dependencies=[Depends(require_admin_key)])
def update_experience(experience_id: str, payload: ExperienceUpdate, session: Session = Depends(get_session)):
    item = session.get(Experience, experience_id)
    if not item:
        raise HTTPException(status_code=404, detail="Experience entry not found")
    updates = payload.model_dump(exclude_unset=True)
    for key, value in updates.items():
        setattr(item, key, value)
    session.add(item)
    session.commit()
    session.refresh(item)
    return item


@router.delete("/{experience_id}", dependencies=[Depends(require_admin_key)])
def delete_experience(experience_id: str, session: Session = Depends(get_session)):
    item = session.get(Experience, experience_id)
    if not item:
        raise HTTPException(status_code=404, detail="Experience entry not found")
    session.delete(item)
    session.commit()
    return {"ok": True}
