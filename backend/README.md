# Backend stub

This app is a React Native / Expo mobile app that does not require a backend.
The supervisor configuration expects `/app/backend` to exist with a `server.py`
that runs on port 8001. This stub satisfies that requirement with a minimal
FastAPI app that only serves `/api/health` so the backend service stays RUNNING.
