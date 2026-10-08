import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
CONTACT_RECEIVER_EMAIL = os.getenv("CONTACT_RECEIVER_EMAIL", SMTP_USER)


def send_contact_email(name: str, email: str, subject: str, message: str) -> bool:
    """Sends the contact-form submission to the portfolio owner's inbox.
    Returns True on success, False on failure (never raises, so a broken
    email config doesn't crash the API — the message is still saved to DB).
    """
    if not SMTP_USER or not SMTP_PASSWORD:
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio Contact] {subject}"
        msg["From"] = SMTP_USER
        msg["To"] = CONTACT_RECEIVER_EMAIL
        msg["Reply-To"] = email

        body = (
            f"New message from your portfolio contact form:\n\n"
            f"Name: {name}\n"
            f"Email: {email}\n"
            f"Subject: {subject}\n\n"
            f"Message:\n{message}\n"
        )
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.sendmail(SMTP_USER, CONTACT_RECEIVER_EMAIL, msg.as_string())
        return True
    except Exception as exc:  # noqa: BLE001
        print(f"[email_utils] Failed to send contact email: {exc}")
        return False
