import logging
from fastapi import APIRouter, BackgroundTasks, Request, status, HTTPException
from pydantic import BaseModel, validator
from typing import List
from app.services.signal_service import ingest_signal

logger = logging.getLogger(__name__)

router = APIRouter()

class SignalIn(BaseModel):
    source: str
    type: str
    message: str
    timestamp: str
    
    @validator('source')
    def validate_source(cls, v):
        allowed_sources = ['DB', 'API', 'CACHE']
        if v not in allowed_sources:
            raise ValueError(f'Source must be one of: {", ".join(allowed_sources)}')
        return v
    
    @validator('type')
    def validate_type(cls, v):
        allowed_types = ['ERROR', 'WARNING', 'INFO']
        if v not in allowed_types:
            raise ValueError(f'Type must be one of: {", ".join(allowed_types)}')
        return v
    
    @validator('message')
    def validate_message(cls, v):
        if not v or not v.strip():
            raise ValueError('Message cannot be empty')
        if len(v) > 1000:
            raise ValueError('Message cannot exceed 1000 characters')
        return v.strip()

    @validator('timestamp')
    def validate_timestamp(cls, v):
        from datetime import datetime
        try:
            datetime.fromisoformat(v.replace('Z', '+00:00'))
        except ValueError:
            raise ValueError('Invalid timestamp format. Use ISO format.')
        return v

@router.post("/", status_code=202)
async def ingest_signals(signals: List[SignalIn], background_tasks: BackgroundTasks, request: Request):
    """
    Ingest a batch of signals asynchronously.
    """
    logger.info(f"Received {len(signals)} signals from {request.client.host}")
    background_tasks.add_task(ingest_signal, signals)
    return {"status": "accepted", "count": len(signals)}
