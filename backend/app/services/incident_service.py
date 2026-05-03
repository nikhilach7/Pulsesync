import logging
from app.models.models import Incident, Signal
from app.services.db import SessionLocal
from sqlalchemy.orm import joinedload
from sqlalchemy import desc

logger = logging.getLogger(__name__)

async def get_active_incidents():
    db = SessionLocal()
    try:
        incidents = db.query(Incident).order_by(desc(Incident.created_at)).all()
        result = []
        for inc in incidents:
            result.append({
                "id": inc.id,
                "title": inc.title,
                "source": inc.source,
                "priority": inc.priority,
                "status": inc.status,
                "created_at": inc.created_at.isoformat() if inc.created_at else None,
                "updated_at": inc.updated_at.isoformat() if inc.updated_at else None,
            })
        return result
    except Exception as e:
        print(f"Error in get_active_incidents: {e}")
        return []
    finally:
        db.close()

async def get_incident_detail(incident_id):
    db = SessionLocal()
    try:
        inc = db.query(Incident).options(joinedload(Incident.signals)).filter(Incident.id == incident_id).first()
        if not inc:
            return {}
        result = {
            "id": inc.id,
            "title": inc.title,
            "source": inc.source,
            "priority": inc.priority,
            "status": inc.status,
            "created_at": inc.created_at.isoformat() if inc.created_at else None,
            "updated_at": inc.updated_at.isoformat() if inc.updated_at else None,
            "signals": [
                {
                    "id": s.id,
                    "type": s.type,
                    "message": s.message,
                    "timestamp": s.timestamp
                } for s in inc.signals
            ],
            "rca": inc.rca
        }
        return result
    except Exception as e:
        print(f"Error in get_incident_detail: {e}")
        return {}
    finally:
        db.close()

async def update_incident_status(incident_id, status):
    db = SessionLocal()
    try:
        inc = db.query(Incident).filter(Incident.id == incident_id).first()
        if not inc:
            return {"error": "Incident not found"}
        if status == "CLOSED" and not inc.rca:
            return {"error": "RCA required before closing"}
        inc.status = status
        db.commit()
        db.refresh(inc)
        return {"status": inc.status}
    except Exception as e:
        print(f"Error in update_incident_status: {e}")
        return {"error": str(e)}
    finally:
        db.close()

async def add_rca(incident_id, rca):
    db = SessionLocal()
    try:
        inc = db.query(Incident).filter(Incident.id == incident_id).first()
        if not inc:
            return {"error": "Incident not found"}
        inc.rca = rca
        db.commit()
        db.refresh(inc)
        return {"rca": inc.rca}
    except Exception as e:
        print(f"Error in add_rca: {e}")
        return {"error": str(e)}
    finally:
        db.close()
