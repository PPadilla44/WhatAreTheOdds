"""Minimal FastAPI stub so the Emergent supervisor `backend` program stays up.

This project is an Expo mobile/web app and does not need a backend. The
supervisor config is read-only and requires `/app/backend/server.py` running
on port 8001. This app only serves a single health endpoint.
"""
from fastapi import FastAPI

app = FastAPI(title="What Are The Odds? – backend stub")


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "expo-app-stub"}
