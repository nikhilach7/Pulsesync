# Fix Plan

## Issues to Fix:
1. Add `/health` endpoint to backend
2. Fix frontend proxy configuration (setupProxy.js and vite.config.js)
3. Improve Dashboard loading/error states
4. Make signal sending more robust

## Implementation Steps:

### 1. Add health endpoint to backend
- File: `backend/app/main.py`
- Add `app.get("/health")` endpoint that returns health status

### 2. Fix frontend proxy configuration
- File: `frontend/src/setupProxy.js` - Use `http://backend:8000` to match Docker setup
- File: `frontend/vite.config.js` - Ensure proxy targets correct backend

### 3. Improve Dashboard loading/error states
- File: `frontend/src/components/Dashboard.jsx`
- Remove instant demo data that causes flickering
- Show proper loading skeleton
- Add better error handling with retry option

### 4. Make signal sending more robust
- File: `frontend/src/components/SignalIngestDemo.jsx`
- Add polling to check if signal was actually processed
- Better error feedback
