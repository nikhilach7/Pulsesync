from fastapi import APIRouter, HTTPException, status
from typing import List
from app.services.incident_service import (
    get_active_incidents, get_incident_detail, update_incident_status, add_rca
)

router = APIRouter()

@router.get("/", response_model=List[dict])
async def list_incidents():
    return await get_active_incidents()

@router.get("/{incident_id}")
async def incident_detail(incident_id: int):
    return await get_incident_detail(incident_id)

@router.patch("/{incident_id}/status")
async def update_status(incident_id: int, status: str):
    return await update_incident_status(incident_id, status)

@router.post("/{incident_id}/rca")
async def submit_rca(incident_id: int, rca: str):
    return await add_rca(incident_id, rca)
