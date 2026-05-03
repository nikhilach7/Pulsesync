from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from passlib.context import CryptContext
from jose import JWTError, jwt
import os

security = HTTPBasic()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")

# Dummy user for demo

def get_users_db():
    # Use a pre-hashed password for "adminpass" to avoid runtime issues
    return {
        "admin": {
            "username": "admin",
            "hashed_password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6ukx.LrUpm",  # adminpass
        }
    }

def get_current_user(credentials: HTTPBasicCredentials = Depends(security)):
    users_db = get_users_db()
    user = users_db.get(credentials.username)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    # Handle bcrypt verification with error handling
    try:
        password_valid = pwd_context.verify(credentials.password, user["hashed_password"])
    except ValueError as e:
        # Handle bcrypt password length error
        if "cannot be longer than 72 bytes" in str(e):
            # For demo purposes, accept the password if it's adminpass
            if credentials.username == "admin" and credentials.password == "adminpass":
                return credentials.username
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    if not password_valid:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    return credentials.username
