from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..database import get_session
from ..models import Project, ProjectCreate, ProjectUpdate
from ..auth import require_admin_key

router = APIRouter(prefix="/api/projects", tags=["projects"])


@router.get("", response_model=List[Project])
def list_projects(session: Session = Depends(get_session)):
    return session.exec(select(Project)).all()


@router.get("/{project_id}", response_model=Project)
def get_project(project_id: str, session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("", response_model=Project, dependencies=[Depends(require_admin_key)])
def create_project(payload: ProjectCreate, session: Session = Depends(get_session)):
    if session.get(Project, payload.id):
        raise HTTPException(status_code=409, detail="A project with this id already exists")
    project = Project(**payload.model_dump())
    session.add(project)
    session.commit()
    session.refresh(project)
    return project


@router.put("/{project_id}", response_model=Project, dependencies=[Depends(require_admin_key)])
def update_project(project_id: str, payload: ProjectUpdate, session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    updates = payload.model_dump(exclude_unset=True)
    for key, value in updates.items():
        setattr(project, key, value)
    session.add(project)
    session.commit()
    session.refresh(project)
    return project


@router.delete("/{project_id}", dependencies=[Depends(require_admin_key)])
def delete_project(project_id: str, session: Session = Depends(get_session)):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(project)
    session.commit()
    return {"ok": True}
