from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Enum
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Incident(Base):
    __tablename__ = "incidents"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    source = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    status = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    rca = Column(Text, nullable=True)
    signals = relationship("Signal", back_populates="incident")

class Signal(Base):
    __tablename__ = "signals"
    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)
    type = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    timestamp = Column(String, nullable=False)
    incident_id = Column(Integer, ForeignKey("incidents.id"))
    incident = relationship("Incident", back_populates="signals")
