# Incident Management System (IMS)

A production-ready, dockerized Incident Management System for high-throughput signal ingestion, debouncing, and incident lifecycle management. Includes a modern React + TailwindCSS frontend and robust backend with PostgreSQL, Redis, and RabbitMQ.

---

## Features
- High-throughput async signal ingestion
- Debouncing logic (group signals into incidents)
- Incident lifecycle management (OPEN → IN_PROGRESS → RESOLVED → CLOSED)
- PostgreSQL for structured data
- Redis for caching/debouncing
- RabbitMQ for async processing
- Modern React + TailwindCSS UI
- Dockerized for easy local setup
- Rate limiting, authentication, logging, metrics (bonus)

---

## Tech Stack
- **Backend:** FastAPI, SQLAlchemy, Redis, RabbitMQ, PostgreSQL
- **Frontend:** React, TailwindCSS, Axios
- **Infra:** Docker, docker-compose

---

## Project Structure
```
/backend
  /app
  /models
  /routes
  /services
/frontend
/docker-compose.yml
/README.md
```

---

## Setup Instructions

1. Clone the repo
2. Run: `docker-compose up --build`
3. Access backend: http://localhost:8000/docs
4. Access frontend: http://localhost:3000

---

## API Endpoints
See backend OpenAPI docs at `/docs` when running.

---

## Authentication (Required for All Features)

- The backend protects all endpoints (including signal ingestion) with HTTP Basic authentication.
- The frontend now requires you to log in with your credentials (default: `admin` / `adminpass`).
- You must log in via the modal on the dashboard before using any features (including sending signals).
- Credentials are stored in your browser for the session.

**If you see errors like 'Error sending signals' or empty dashboards, make sure you are logged in!**

---

## Design Decisions
- Async ingestion with background workers for resilience
- Debouncing via Redis for high performance
- PostgreSQL for durability
- RabbitMQ for decoupled processing
- Clean, minimal UI for SRE workflows

---

## Scaling Considerations
- Horizontal scaling for backend workers
- Redis for distributed debouncing
- RabbitMQ for queue-based scaling
- Stateless backend

---

## Bonus Features
- Rate limiting
- Basic authentication
- Structured logging
- Prometheus metrics endpoint

---

## PDF Submission
See `submission.pdf` content in project root.

---

## License
MIT
