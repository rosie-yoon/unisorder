from fastapi import FastAPI
from core.config import settings

app = FastAPI(title="Shopee Tool API", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "ok", "env": settings.APP_ENV}
