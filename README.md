# PulseSync 

PulseSync is a production-ready, highly-scalable Incident Management System (IMS). It is designed to handle high-throughput signal ingestion from various sources (API, Database, Cache), automatically debounce and group related signals into actionable incidents, and provide a seamless lifecycle management workflow for Site Reliability Engineers (SREs).

---

## Key Features

*   **High-Throughput Async Ingestion**: Signals are ingested asynchronously to ensure the API never blocks, guaranteeing ultra-low latency response times.
*   **Intelligent Debouncing**: Utilizes Redis to intelligently group identical or related signals occurring within a configured time window into a single unified incident, preventing alert fatigue.
*   **Incident Lifecycle Management**: Track incidents through a robust state machine (`OPEN` → `IN_PROGRESS` → `RESOLVED` → `CLOSED`).
*   **Root Cause Analysis (RCA) Enforcement**: Closing an incident requires an RCA submission, ensuring strict operational compliance.
*   **Real-time Analytics Dashboard**: A sleek, dark-mode compatible React/Tailwind frontend to visualize incident metrics and act on them instantly.
*   **Fully Dockerized Environment**: Simple one-command local setup powered by `docker-compose`.

---

## Getting Started

### Prerequisites
*   Docker
*   Docker Compose
*   Git

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nikhilach7/Pulsesync.git
    cd Pulsesync
    ```

2.  **Environment Variables:**
    The backend uses a `.env` file for configuration. A `.env.example` is provided in the `backend/` directory. The `docker-compose.yml` is already pre-configured to pass the correct network credentials for local development.

3.  **Start the infrastructure:**
    ```bash
    # Build and start all services in detached mode
    docker-compose up -d --build
    ```

4.  **Access the Applications:**
    *   **Frontend Dashboard:** http://localhost:3000
    *   **Backend API Swagger Docs:** http://localhost:8000/docs
    *   **RabbitMQ Management UI:** http://localhost:15672

---



## Development & Tooling

### Project Structure
```text
PulseSync/
├── backend/                  # FastAPI Application
│   ├── app/                  # Application code (routes, models, services)
│   ├── alembic/              # Database migration scripts
│   ├── requirements.txt      # Python dependencies
│   └── Dockerfile            # Backend container definition
├── frontend/                 # React Application
│   ├── src/                  # UI components, pages, and contexts
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Theme and styling configuration
│   └── Dockerfile            # Frontend container definition
└── docker-compose.yml        # Orchestration configuration
```

### Hot Reloading
When running via `docker-compose`, the `frontend/` directory is mounted as a volume. Changes to your React components will automatically trigger Vite's Hot Module Replacement (HMR) and update the browser instantly.

---

## Scaling Considerations

To take this application to production scale:
1.  **Stateless API:** Run multiple replicas of the FastAPI `backend` container behind a load balancer (e.g., Nginx, AWS ALB).
2.  **Worker Scaling:** Horizontally scale the RabbitMQ consumer processes independently from the API to handle massive spikes in signal traffic.
3.  **Redis Cluster:** Upgrade the single Redis instance to a Redis Cluster for highly available and distributed debouncing locks.
4.  **Connection Pooling:** Utilize PgBouncer in front of PostgreSQL to manage thousands of concurrent DB connections efficiently.

---
