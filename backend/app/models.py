from typing import Optional, List
from datetime import datetime
from sqlmodel import SQLModel, Field, Column
from sqlalchemy import JSON


class ProjectBase(SQLModel):
    id: str = Field(primary_key=True)
    title: str
    category: str  # 'GenAI/RAG' | 'Computer Vision' | 'NLP' | 'MLOps'
    shortDescription: str
    fullDescription: str
    image: str
    techStack: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    githubUrl: str
    liveUrl: Optional[str] = None
    metrics: List[dict] = Field(sa_column=Column(JSON), default_factory=list)
    architectureHighlights: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    datasetInfo: Optional[str] = None


class Project(ProjectBase, table=True):
    __tablename__ = "projects"


class ProjectCreate(SQLModel):
    id: str
    title: str
    category: str
    shortDescription: str
    fullDescription: str
    image: str
    techStack: List[str] = []
    githubUrl: str
    liveUrl: Optional[str] = None
    metrics: List[dict] = []
    architectureHighlights: List[str] = []
    datasetInfo: Optional[str] = None


class ProjectUpdate(SQLModel):
    title: Optional[str] = None
    category: Optional[str] = None
    shortDescription: Optional[str] = None
    fullDescription: Optional[str] = None
    image: Optional[str] = None
    techStack: Optional[List[str]] = None
    githubUrl: Optional[str] = None
    liveUrl: Optional[str] = None
    metrics: Optional[List[dict]] = None
    architectureHighlights: Optional[List[str]] = None
    datasetInfo: Optional[str] = None


class ExperienceBase(SQLModel):
    id: str = Field(primary_key=True)
    role: str
    company: str
    period: str
    location: str
    type: str
    description: str
    achievements: List[str] = Field(sa_column=Column(JSON), default_factory=list)
    techUsed: List[str] = Field(sa_column=Column(JSON), default_factory=list)


class Experience(ExperienceBase, table=True):
    __tablename__ = "experience"


class ExperienceCreate(SQLModel):
    id: str
    role: str
    company: str
    period: str
    location: str
    type: str
    description: str
    achievements: List[str] = []
    techUsed: List[str] = []


class ExperienceUpdate(SQLModel):
    role: Optional[str] = None
    company: Optional[str] = None
    period: Optional[str] = None
    location: Optional[str] = None
    type: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = None
    techUsed: Optional[List[str]] = None


class ContactMessage(SQLModel, table=True):
    __tablename__ = "contact_messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    email_sent: bool = Field(default=False)


class ContactCreate(SQLModel):
    name: str
    email: str
    subject: str
    message: str
