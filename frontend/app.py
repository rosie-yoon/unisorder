import streamlit as st
import requests
from core.config import settings

st.set_page_config(page_title="Shopee Tool Console", layout="wide")
st.title("Shopee 내부 콘솔 (MVP)")
st.caption("FastAPI + Streamlit")

col1, col2 = st.columns(2)
with col1:
    st.subheader("환경")
    st.write(f"ENV: **{settings.APP_ENV}**")
with col2:
    st.subheader("백엔드 헬스체크")
    try:
        r = requests.get("http://localhost:8000/health", timeout=3)
        st.success(r.json())
    except Exception as e:
        st.error(f"API 연결 실패: {e}")

st.divider()
st.write("여기부터 기능 탭을 확장합니다. (상품등록 → 주문관리)")
