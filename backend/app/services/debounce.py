import redis.asyncio as aioredis
import os
from app.models.models import Incident
from app.services.db import get_db_session
from datetime import datetime, timedelta

REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
DEBOUNCE_WINDOW = 10  # seconds

async def debounce_signal(signal, db):
    redis = await aioredis.from_url(f"redis://{REDIS_HOST}:{REDIS_PORT}", decode_responses=True)
    key = f"debounce:{signal.source}"
    incident_id = await redis.get(key)
    if incident_id:
        await redis.close()
        return int(incident_id)
    # Create new incident
    inc = Incident(
        title=f"{signal.source} {signal.type}",
        source=signal.source,
        priority=priority_from_source(signal.source),
        status="OPEN",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(inc)
    db.commit()
    db.refresh(inc)
    await redis.set(key, inc.id, ex=DEBOUNCE_WINDOW)
    await redis.close()
    return inc.id

def priority_from_source(source):
    if source == "DB":
        return "HIGH"
    if source == "API":
        return "MEDIUM"
    return "LOW"
