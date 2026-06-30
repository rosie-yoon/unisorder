# UnisOrder JSP Landing Export

이 디렉터리는 Vercel/Next.js에 올라간 유니스오더 랜딩 화면을 기존 JSP 서버에 전달하기 위한 정적 JSP 패키지입니다.

## 구성

- `index.jsp`: 랜딩 페이지 마크업과 JSP 변수
- `assets/css/unisorder-landing.css`: 화면 스타일
- `assets/js/unisorder-landing.js`: 기능 탭, 성장사례 자동 전환, 모바일 메뉴
- `assets/images`: 로고, 파비콘, 카카오톡 아이콘, 제품 화면 이미지

## 적용 방법

1. `index.jsp`와 `assets` 폴더를 JSP 프로젝트의 공개 정적 경로에 복사합니다.
2. 프로젝트의 정적 리소스 경로가 `/assets`가 아니라면 `index.jsp` 상단의 `assetPath`만 수정합니다.

```jsp
String assetPath = request.getContextPath() + "/assets";
```

3. 운영 서비스 경로는 아래 절대주소로 고정되어 있습니다.

- 로그인/CTA: `https://unisorder.com/login`
- 이용가이드 임시 연결: `https://unisorder.figma.site/`
- 개인정보처리방침: `https://unisorder.com/privacy`
- 이용약관: `https://unisorder.com/terms`
- 카카오톡 채널: `http://pf.kakao.com/_QSNqX`

## 주의사항

- 이 파일은 소개 랜딩 페이지만 대체합니다. 기존 운영 앱, 로그인, Shopee/Lazada OAuth, API 경로는 그대로 유지해야 합니다.
- DNS를 루트 도메인 전체에 바로 연결하기 전에 기존 운영 앱 경로가 깨지지 않는지 개발자가 라우팅 범위를 먼저 확인해야 합니다.
- 기능 탭 이미지는 페이지 로딩 시 모두 DOM에 올라가므로 탭 클릭 시 추가 네트워크 요청 없이 즉시 전환됩니다.
