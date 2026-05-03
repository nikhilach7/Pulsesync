from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.models import Base
import os
import time

DB_USER = os.getenv("POSTGRES_USER", "postgres")
DB_PASS = os.getenv("POSTGRES_PASSWORD", "postgres")
DB_HOST = os.getenv("POSTGRES_HOST", "db")
DB_PORT = os.getenv("POSTGRES_PORT", "5432")
DB_NAME = os.getenv("POSTGRES_DB", "postgres")

DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

def create_tables():
    """Create database tables with retry logic"""
    max_retries = 5
    retry_delay = 5
    
    for attempt in range(max_retries):
        try:
            # Create engine with larger connection pool
            engine = create_engine(DATABASE_URL, pool_pre_ping=True, pool_size=20, max_overflow=30)
            Base.metadata.create_all(bind=engine)
            print("Database tables created successfully")
            
            # Create sample data
            create_sample_data(engine)
            
            return engine
        except Exception as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt < max_retries - 1:
                print(f"Retrying in {retry_delay} seconds...")
                time.sleep(retry_delay)
            else:
                raise e

def create_sample_data(engine):
    """Create sample incident data"""
    from sqlalchemy.orm import sessionmaker
    from app.models.models import Incident, Signal
    from datetime import datetime, timedelta
    
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(Incident).count() == 0:
            print("Creating sample data...")
            
            # Create sample incidents
            incidents = [
                Incident(
                    title="Database Connection Failed",
                    source="DB",
                    priority="HIGH",
                    status="OPEN",
                    created_at=datetime.utcnow() - timedelta(hours=1)
                ),
                Incident(
                    title="API Response Slow",
                    source="API", 
                    priority="MEDIUM",
                    status="IN_PROGRESS",
                    created_at=datetime.utcnow() - timedelta(hours=2)
                ),
                Incident(
                    title="Cache Memory Leak",
                    source="CACHE",
                    priority="LOW", 
                    status="RESOLVED",
                    created_at=datetime.utcnow() - timedelta(hours=3)
                ),
                Incident(
                    title="Authentication Service Down",
                    source="API",
                    priority="HIGH",
                    status="CLOSED",
                    created_at=datetime.utcnow() - timedelta(hours=4),
                    rca="Fixed by restarting authentication service"
                ),
                Incident(
                    title="High CPU Usage",
                    source="DB",
                    priority="MEDIUM",
                    status="RESOLVED", 
                    created_at=datetime.utcnow() - timedelta(hours=5)
                ),
                Incident(
                    title="Network Timeout",
                    source="API",
                    priority="LOW",
                    status="CLOSED",
                    created_at=datetime.utcnow() - timedelta(hours=6),
                    rca="Network configuration updated"
                )
            ]
            
            for incident in incidents:
                db.add(incident)
            
            db.commit()
            print(f"Created {len(incidents)} sample incidents")
        else:
            print("Sample data already exists")
            
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

# Initialize engine with retry
engine = create_tables()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
