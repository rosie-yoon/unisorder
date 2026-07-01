<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
  String assetPath = request.getContextPath() + "/assets";
  String loginUrl = "https://unisorder.com/login";
  String guideUrl = "https://unisorder.figma.site/";
  String privacyUrl = "https://unisorder.com/privacy";
  String termsUrl = "https://unisorder.com/terms";
  String kakaoUrl = "http://pf.kakao.com/_QSNqX";
%>
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>유니스오더 | 쇼피·라자다 통합 주문 운영</title>
  <meta name="description" content="Shopee·Lazada 주문, 재고, 발주, 한글 송장, 마진 분석을 한곳에서 관리하는 크로스보더 셀러 운영 플랫폼입니다." />
  <link rel="icon" href="<%= assetPath %>/images/favicon.png" />
  <link rel="stylesheet" href="<%= assetPath %>/css/unisorder-landing.css" />
</head>
<body>
  <a class="skip-link" href="#main">본문 바로가기</a>

  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="UnisOrder 홈">
        <img src="<%= assetPath %>/images/brand/unis-logo.png" alt="UnisOrder" />
      </a>

      <nav class="desktop-nav" aria-label="주요 메뉴">
        <a href="#features">기능</a>
        <a href="#use-cases">활용사례</a>
        <a href="#pricing">이용요금</a>
        <a href="<%= guideUrl %>">이용가이드</a>
      </nav>

      <div class="header-actions">
        <a class="button button-light" href="<%= loginUrl %>">로그인</a>
        <a class="button button-green" href="<%= loginUrl %>">무료로 시작하기</a>
      </div>

      <details class="mobile-menu">
        <summary aria-label="메뉴 열기">메뉴</summary>
        <div class="mobile-panel">
          <a href="#features">기능</a>
          <a href="#use-cases">활용사례</a>
          <a href="#pricing">이용요금</a>
          <a href="<%= guideUrl %>">이용가이드</a>
          <a href="<%= loginUrl %>">로그인</a>
          <a class="mobile-cta" href="<%= loginUrl %>">무료로 시작하기</a>
        </div>
      </details>
    </div>
  </header>

  <main id="main">
    <section class="hero">
      <div class="shell hero-shell">
        <p class="hero-kicker">글로벌 전문 셀러들의 노하우를 담은<br class="mobile-only" /> 크로스보더 플랫폼</p>
        <h1>주문부터 재고,<br /><span>마진 관리까지 원스톱 처리</span></h1>
        <div class="hero-actions">
          <a class="button button-green button-large" href="<%= loginUrl %>">무료로 시작하기</a>
          <a class="button button-dark button-large" href="<%= guideUrl %>">이용 가이드 보기</a>
        </div>
      </div>

      <div class="shell product-stage" aria-label="유니스오더 제품 화면">
        <div class="desktop-frame main-frame">
          <img src="<%= assetPath %>/images/product/unisorder-dashboard.png" alt="유니스오더 통합 대시보드 화면" />
        </div>
        <div class="desktop-frame order-frame">
          <img src="<%= assetPath %>/images/product/features/order-processing.png" alt="유니스오더 통합 주문관리 화면" />
        </div>
      </div>
    </section>

    <section id="use-cases" class="quote-strip" aria-label="활용사례">
      <div class="shell case-head">
        <h2>처음 시작하는 셀러님도, 베테랑 셀러님도<br />유니스오더와 함께<br class="mobile-only" /> 한 걸음 더 성장할 수 있습니다.</h2>
      </div>
      <div class="shell quote-grid">
        <article>
          <p>“재고와 주문이 통합 관리되어<br />샵을 확장할 수 있었고,<br />플랫폼도 확장할 계획이에요”</p>
          <div class="case-profile">
            <span class="case-avatar">M</span>
            <span><strong>M 셀러</strong><em>Shopee 2년차</em></span>
          </div>
        </article>
        <article>
          <p>“재고관리와 발주 시스템이 있어<br />해외여행도 가능했어요”</p>
          <div class="case-profile">
            <span class="case-avatar">J</span>
            <span><strong>J 셀러</strong><em>Shopee, Lazada 6년차</em></span>
          </div>
        </article>
        <article>
          <p>“한글 송장과 발주 시스템으로<br />회사를 다니면서도 혼자<br />운영할 수 있었어요”</p>
          <div class="case-profile">
            <span class="case-avatar">R</span>
            <span><strong>R 셀러</strong><em>Shopee 5개월차</em></span>
          </div>
        </article>
      </div>
    </section>

    <section class="problem-section">
      <div class="shell split-section">
        <div class="section-copy">
          <h2>주문은 늘어나는데,<br />제자리 걸음 중인 것<br />같지 않으신가요?</h2>
          <p>반복 업무가 늘어날수록 셀러가 집중해야 할<br />제품 소싱과 마케팅 시간은 줄어듭니다.</p>
        </div>
        <div class="problem-list">
          <article>
            <span>01</span>
            <div>
              <h3>오늘 처리할 주문 한눈에 안 보임</h3>
              <p>국가별·샵별 주문을 따로 열어보느라 처리 흐름이 계속 끊겨요.</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>상품명은 외국어, 실수는 내 책임</h3>
              <p>8개국 언어로 표시되는 상품명과 옵션을 매번 확인하며 발주·포장해야 해요.</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>같은 제품 오늘만 2번째 주문</h3>
              <p>통합으로 주문 확인이 안 되면 같은 제품을 하루에 여러 번 주문하게 됩니다.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="features" class="feature-section">
      <div class="shell">
        <div class="center-head">
          <h2>글로벌 셀러들을 위한 올인원 솔루션</h2>
        </div>

        <div class="feature-stack">
          <article class="feature-row">
            <div class="feature-text">
              <h3>2개 플랫폼 8개국 주문을<br />한 화면에서</h3>
              <p>국가별·샵별로 흩어진 주문 현황을 한 번에 확인하고 오늘 처리할 업무 흐름을 정리합니다.</p>
              <ul>
                <li>Shopee·Lazada 통합 현황 조회</li>
                <li>발송 대기·처리중·취소·반품 상태 확인</li>
              </ul>
            </div>
            <div class="feature-shot">
              <img src="<%= assetPath %>/images/product/unisorder-dashboard.png" alt="통합 대시보드 화면" />
            </div>
          </article>

          <article class="feature-row reverse">
            <div class="feature-text">
              <h3>반복 확인 없이<br />주문 처리 흐름을 빠르게</h3>
              <p>상품 확인, SKU 매칭, 송장 출력처럼 반복되는 주문 업무를 한 화면에서 이어갑니다.</p>
              <ul>
                <li>실시간 주문 수집과 상태 동기화</li>
                <li>처리 누락과 중복 작업 감소</li>
              </ul>
            </div>
            <div class="feature-shot">
              <img src="<%= assetPath %>/images/product/features/order-processing.png" alt="통합 주문처리 화면" />
            </div>
          </article>

          <article class="feature-row">
            <div class="feature-text">
              <h3>외국어 상품 정보를<br />한글로 정확하게</h3>
              <p>8개국 언어로 표시되는 상품명과 옵션을 발주·포장 단계에서 확인하기 쉬운 형태로 정리합니다.</p>
              <ul>
                <li>한글 송장 출력</li>
                <li>오포장과 오출고 리스크 감소</li>
              </ul>
            </div>
            <div class="feature-shot compact">
              <img src="<%= assetPath %>/images/product/features/korean-invoice.png" alt="한글 송장 화면" />
            </div>
          </article>

          <article class="feature-row reverse">
            <div class="feature-text">
              <h3>빠르고 정확한<br />발주와 입고관리</h3>
              <p>SKU 기준으로 주문과 재고 흐름을 연결해 반복 발주와 입고 현황을 점검합니다.</p>
              <ul>
                <li>SKU 기반 재고 관리</li>
                <li>발주 판단에 필요한 수량 정리</li>
              </ul>
            </div>
            <div class="feature-shot">
              <img src="<%= assetPath %>/images/product/features/inventory-purchase.png" alt="재고 발주 화면" />
            </div>
          </article>

          <article class="feature-row">
            <div class="feature-text">
              <h3>상품별 실제 수익성을<br />바로 확인</h3>
              <p>매입가, 판매가, 정산 흐름을 연결해 상품의 수익 및 마진을 빠르게 파악합니다.</p>
              <ul>
                <li>상품별 마진 추적</li>
                <li>환율·매입가 기준 수익 확인</li>
              </ul>
            </div>
            <div class="feature-shot">
              <img src="<%= assetPath %>/images/product/features/margin-analysis.png" alt="마진 분석 화면" />
            </div>
          </article>

          <article class="feature-row reverse">
            <div class="feature-text">
              <h3>8개국 주문 및 정산내역<br />원클릭 다운로드</h3>
              <p>부가세신고자료와 소포수령증 발급에 필요한 문서를 클릭 한 번으로 내려받습니다.</p>
              <ul>
                <li>완료 주문내역 엑셀 파일 제공</li>
                <li>정산 내역 PDF 파일 제공</li>
              </ul>
            </div>
            <div class="feature-shot">
              <img src="<%= assetPath %>/images/product/features/tax-report.png" alt="부가세신고 자료 화면" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="pricing" class="pricing-section">
      <div class="shell">
        <div class="center-head">
          <h2>운영 효율화의 시작<br />유니스오더와 함께하세요</h2>
          <p>지금 성장 단계에 맞는 플랜을 선택하세요.</p>
        </div>

        <div class="pricing-grid">
          <article class="price-card">
            <p>쇼피 입문 셀러를 위한 플랜</p>
            <h3>Free</h3>
            <div class="price free">무료</div>
            <dl>
              <div><dt>지원 플랫폼</dt><dd>Shopee 8개국</dd></div>
              <div><dt>주문수집 기준</dt><dd>200건/월</dd></div>
            </dl>
            <ul>
              <li>통합 대시보드</li>
              <li>실시간 주문 수집</li>
              <li>통합 주문 처리</li>
              <li>한글 송장 출력</li>
              <li>쇼피 프리디클레어</li>
              <li>수동 재고 차감 발주리스트</li>
              <li>운영 분석 리포트</li>
            </ul>
            <a class="button button-light plan-button" href="<%= loginUrl %>">무료로 시작하기</a>
          </article>

          <article class="price-card">
            <p>본격적으로 성장하는 셀러를 위한 플랜</p>
            <h3>Basic</h3>
            <div class="price"><span>월</span> 70,000원 <em>VAT 별도</em></div>
            <dl>
              <div><dt>지원 플랫폼</dt><dd>Shopee 8개국</dd></div>
              <div><dt>주문수집 기준</dt><dd>무제한</dd></div>
            </dl>
            <ul>
              <li>통합 대시보드</li>
              <li>실시간 주문 수집</li>
              <li>통합 주문 처리</li>
              <li>한글 송장 출력</li>
              <li>쇼피 프리디클레어</li>
              <li>수동 재고 차감 발주리스트</li>
              <li>운영 분석 리포트</li>
            </ul>
            <a class="button button-green plan-button" href="<%= loginUrl %>">플랜 선택하기</a>
          </article>

          <article class="price-card">
            <p>다음 단계로 도약하는 셀러를 위한 플랜</p>
            <h3>Pro</h3>
            <div class="price"><span>월</span> 150,000원 <em>VAT 별도</em></div>
            <dl>
              <div><dt>지원 플랫폼</dt><dd>Shopee 8개국</dd></div>
              <div><dt>주문수집 기준</dt><dd>무제한</dd></div>
            </dl>
            <ul>
              <li>통합 대시보드</li>
              <li>실시간 주문 수집</li>
              <li>통합 주문 처리</li>
              <li>한글 송장 출력</li>
              <li>쇼피 프리디클레어</li>
              <li class="plus">실시간 재고 연동</li>
              <li class="plus">SKU 통합 재고 관리</li>
              <li class="plus">자동 재고 차감 발주리스트</li>
              <li>운영 분석 리포트</li>
              <li class="plus">부가세신고자료 원클릭 다운로드</li>
            </ul>
            <a class="button button-green plan-button" href="<%= loginUrl %>">플랜 선택하기</a>
          </article>
        </div>

        <div class="addon">
          <div class="addon-icon" aria-hidden="true">♡</div>
          <div class="addon-copy">
            <strong>Lazada 추가</strong>
            <p>Lazada 옵션을 추가해 사용 중인 플랜과 동일한 기능으로 Lazada를 연동할 수 있습니다.<br />유료 플랜(Basic/Pro) 구독자 전용 서비스</p>
          </div>
          <div class="addon-price">
            <span>ADD-ON</span>
            <strong>월 30,000원</strong>
            <em>(VAT 별도)</em>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="shell">
      <div class="footer-top">
        <a href="/" aria-label="UnisOrder 홈"><img src="<%= assetPath %>/images/brand/unis-logo.png" alt="UnisOrder" /></a>
        <nav>
          <a href="#features">기능</a>
          <a href="#use-cases">활용사례</a>
          <a href="#pricing">이용요금</a>
          <a href="<%= guideUrl %>">이용가이드</a>
          <a href="<%= privacyUrl %>">개인정보처리방침</a>
          <a href="<%= termsUrl %>">이용약관</a>
        </nav>
      </div>
      <div class="footer-info">
        <p>회사명 HOURGRIT (아워그릿) · 대표이사 박상현 · 주소 충청남도 천안시 서북구 불당26로 80</p>
        <p>이메일 <a href="mailto:contact@hourgrit.com">contact@hourgrit.com</a> · 사업자등록번호 642-56-00835 · 통신판매사업신고번호 제 2026-충남천안-0552호</p>
        <p>© 2026 UnisOrder</p>
      </div>
    </div>
  </footer>

  <a class="kakao-floating" href="<%= kakaoUrl %>" target="_blank" rel="noopener noreferrer" aria-label="카카오톡 채널 문의하기">
    <img src="<%= assetPath %>/images/brand/kakao-talk.png" alt="" />
  </a>

  <script>window.UNIS_ASSET_PATH = "<%= assetPath %>";</script>
  <script src="<%= assetPath %>/js/unisorder-landing.js"></script>
</body>
</html>
