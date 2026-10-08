from fastapi import APIRouter, Depends
from sqlmodel import Session

from ..database import get_session
from ..models import ContactMessage, ContactCreate
from ..email_utils import send_contact_email

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("")
def submit_contact_message(payload: ContactCreate, session: Session = Depends(get_session)):
    sent = send_contact_email(
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )

    record = ContactMessage(**payload.model_dump(), email_sent=sent)
    session.add(record)
    session.commit()
    session.refresh(record)

    return {
        "ok": True,
        "email_sent": sent,
        "message": "Message received! I'll get back to you soon."
        if sent
        else "Message saved. (Email delivery is not configured on the server yet.)",
    }
