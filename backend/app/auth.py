import os
from fastapi import Header, HTTPException, status
from dotenv import load_dotenv

load_dotenv()

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "")


def require_admin_key(x_api_key: str = Header(default="")) -> None:
    """Protects write endpoints (create/update/delete).
    Send the secret as an 'X-API-Key' header, e.g. via the /docs 'Authorize'
    button, curl, or Postman.
    """
    if not ADMIN_API_KEY or x_api_key != ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing X-API-Key header",
        )
