import asyncio
import logging
from app.models.models import Signal, Incident
from app.services.db import SessionLocal
from app.services.debounce import debounce_signal
from app.services.queue import publish_signal

logger = logging.getLogger(__name__)

async def ingest_signal(signals):
    db = SessionLocal()
    try:
        for signal in signals:
            try:
                # Debounce and get incident id
                incident_id = await debounce_signal(signal, db)
                # Store signal
                db_signal = Signal(
                    source=signal.source,
                    type=signal.type,
                    message=signal.message,
                    timestamp=signal.timestamp,
                    incident_id=incident_id
                )
                db.add(db_signal)
                db.commit()
                db.refresh(db_signal)
                # Publish to queue for async processing
                await publish_signal(db_signal)
            except Exception as e:
                logger.error(f"Signal ingestion failed: {e}")
                db.rollback()
    finally:
        db.close()
