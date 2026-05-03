import uvicorn
import logging
from fastapi import FastAPI, Request, BackgroundTasks, status, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from app.routes import signals, incidents

app = FastAPI(title="PulseSync")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(level=logging.INFO)

# Routers
app.include_router(signals.router, prefix="/signals", tags=["Signals"])
app.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])

@app.get("/")
def root():
    return {"message": "PulseSync Backend Running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "ims-backend"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
