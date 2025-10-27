# Shopee 내부 콘솔 (MVP)
FastAPI + Streamlit 기반 내부 운영 도구

## 구성
- backend: FastAPI API 서버
- frontend: Streamlit 콘솔
- core: 공용 설정/유틸
- infra: 배포/도커 관련

## 로컬 실행
1) docker compose up -d
2) uvicorn backend.app.main:app --reload --port 8000
3) PYTHONPATH=$PWD streamlit run frontend/app.py --server.port 8501
