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

  <div class="notice-bar">
    <strong>Shopee·Lazada 2개 플랫폼 8개국 운영 통합</strong>
    <span>주문, 재고, 발주, 마진 분석까지 한 화면에서 정리하세요</span>
  </div>

  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="/" aria-label="UnisOrder 홈">
        <img src="<%= assetPath %>/images/brand/unis-logo.png" alt="UnisOrder" />
      </a>

      <nav class="desktop-nav" aria-label="주요 메뉴">
        <a href="#features">기능</a>
        <a href="#stories">성장사례</a>
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
          <a href="#stories">성장사례</a>
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
        <p class="hero-kicker">해외 역직구 전문 셀러들의<br class="mobile-break" /> 실운영 노하우를 담은<br class="mobile-break" /> 크로스보더 셀러 플랫폼</p>
        <h1>주문 처리에<br /><span>운영 시간을<br class="mobile-break" /> 빼앗기지 마세요</span></h1>
        <p class="hero-copy">
          주문이 늘어날수록 상품 확인, 송장 출력,<br class="mobile-break" /> 재고 확인에 많은 시간이 들어갑니다.
          유니스오더는 주문부터 재고,<br class="mobile-break" /> 마진까지 한곳에 모아<br class="mobile-break" /> 운영 시간을 줄여줍니다.
        </p>
        <div class="hero-actions">
          <a class="button button-green button-large" href="<%= loginUrl %>">무료로 시작하기</a>
          <a class="button button-dark button-large" href="<%= guideUrl %>">이용 가이드 보기</a>
        </div>
      </div>

      <div class="shell product-stage" aria-label="유니스오더 제품 화면">
        <div class="desktop-frame">
          <div class="frame-top">
            <span></span><span></span><span></span>
            <strong>UNISORDER Dashboard</strong>
          </div>
          <img src="<%= assetPath %>/images/product/unisorder-dashboard.png" alt="유니스오더 통합 대시보드 화면" />
        </div>
        <div class="mobile-frame" aria-hidden="true">
          <div class="phone-head"></div>
          <img src="<%= assetPath %>/images/product/features/order-processing.png" alt="" />
        </div>
        <div class="stage-note">
          <strong>오늘 처리할 주문</strong>
          <span>국가별·샵별 주문 흐름을 한 번에 확인</span>
        </div>
      </div>
    </section>

    <section class="quote-strip">
      <div class="shell quote-grid">
        <article>
          <p>“샵이 늘어나면서 주문 확인보다<br class="mobile-break" /> 정리에 더 많은 시간이<br class="mobile-break" /> 들기 시작했어요.”</p>
          <span>6개국 12개샵 운영 셀러 · M 셀러님</span>
        </article>
        <article>
          <p>“사무실에 있지 않아도 주문 흐름을<br class="mobile-break" /> 놓치지 않는 게 가장 컸어요.”</p>
          <span>4년차 장기 운영 셀러 · J 셀러님</span>
        </article>
        <article>
          <p>“주문이 늘어도 혼자 운영할 수 있다는<br class="mobile-break" /> 확신이 생겼습니다.”</p>
          <span>6개월차 투잡 셀러 · R 셀러님</span>
        </article>
      </div>
    </section>

    <section class="problem-section">
      <div class="shell split-section">
        <div class="section-copy">
          <h2>주문은 늘어나는데,<br />운영 흐름은 계속 끊기고 있나요?</h2>
          <p>반복 업무가 늘어날수록 셀러가 집중해야 할 제품 소싱과 마케팅 시간은 줄어듭니다.</p>
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
          <p>클릭하면 실제 유니스오더 화면과 함께 핵심 기능을 확인할 수 있습니다.</p>
        </div>

        <div class="feature-layout">
          <div class="feature-tabs" role="tablist" aria-label="기능 목록">
            <button class="feature-tab active" type="button" data-feature-index="0">통합 대시보드</button>
            <button class="feature-tab" type="button" data-feature-index="1">통합 주문처리</button>
            <button class="feature-tab" type="button" data-feature-index="2">한글 송장</button>
            <button class="feature-tab" type="button" data-feature-index="3">재고·발주</button>
            <button class="feature-tab" type="button" data-feature-index="4">마진 분석</button>
            <button class="feature-tab" type="button" data-feature-index="5">부가세신고 자료</button>
          </div>

          <div class="feature-detail">
            <div class="feature-text">
              <h3 id="feature-title">2개 플랫폼 8개국 주문을<br />한 화면에서</h3>
              <p id="feature-description">국가별·샵별로 흩어진 주문 현황을 한 번에 확인하고<br />오늘 처리할 업무 흐름을 정리합니다.</p>
              <ul id="feature-points">
                <li>Shopee·Lazada 통합 현황 조회</li>
                <li>발송 대기·처리중·취소·반품 상태 확인</li>
                <li>TOP 5 판매 상품 현황 확인</li>
              </ul>
            </div>
            <div class="feature-visual">
              <img class="feature-image active" data-feature-image="0" src="<%= assetPath %>/images/product/unisorder-dashboard.png" alt="통합 대시보드 화면" />
              <img class="feature-image" data-feature-image="1" src="<%= assetPath %>/images/product/features/order-processing.png" alt="통합 주문처리 화면" />
              <img class="feature-image" data-feature-image="2" src="<%= assetPath %>/images/product/features/korean-invoice.png" alt="한글 송장 화면" />
              <img class="feature-image" data-feature-image="3" src="<%= assetPath %>/images/product/features/inventory-purchase.png" alt="재고 발주 화면" />
              <img class="feature-image" data-feature-image="4" src="<%= assetPath %>/images/product/features/margin-analysis.png" alt="마진 분석 화면" />
              <img class="feature-image" data-feature-image="5" src="<%= assetPath %>/images/product/features/tax-report.png" alt="부가세신고 자료 화면" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="stories" class="stories-section">
      <div class="shell split-section story-split">
        <div class="section-copy">
          <h2>운영이 단순해지면<br />성장할 공간이 생깁니다</h2>
          <p>반복 업무에 묶여 있던 시간이 줄어들수록, 상품과 전략에 집중할 수 있는 시간은 늘어납니다.</p>
          <div class="story-controls">
            <button class="story-dot active" type="button" data-story-index="0" aria-label="첫 번째 성장사례"></button>
            <button class="story-dot" type="button" data-story-index="1" aria-label="두 번째 성장사례"></button>
            <button class="story-dot" type="button" data-story-index="2" aria-label="세 번째 성장사례"></button>
            <button class="story-next" type="button" aria-label="다음 성장사례">→</button>
          </div>
        </div>

        <div class="story-window" data-story-slider>
          <div class="story-track">
            <article class="story-card">
              <p class="seller-meta">6개국 12개샵 운영 셀러</p>
              <h3>M 셀러님</h3>
              <blockquote>“샵이 늘어나면서 주문 확인보다 정리에 더 많은 시간이 들기 시작했어요.”</blockquote>
              <strong>국가별 주문과 재고를 한곳에서 확인해 발주·포장 흐름을 단순화했습니다</strong>
              <div class="before-after">
                <p><span>Before</span>샵별로 주문을 따로 확인하고 재고를 수기로 맞추느라 반복 정리에 많은 시간이 쓰였습니다.</p>
                <p><span>After</span>통합 화면에서 주문과 재고를 함께 확인하면서 상품 확장과 판매 전략에 더 집중할 수 있었습니다.</p>
              </div>
            </article>
            <article class="story-card">
              <p class="seller-meta">4년차 장기 운영 셀러</p>
              <h3>J 셀러님</h3>
              <blockquote>“사무실에 있지 않아도 주문 흐름을 놓치지 않는 게 가장 컸어요.”</blockquote>
              <strong>외부에서도 발주 타이밍을 놓치지 않고 주문 흐름을 유지했습니다</strong>
              <div class="before-after">
                <p><span>Before</span>자리를 비우거나 여행 중일 때 발주 타이밍을 놓칠까 봐 개인 일정을 쉽게 잡기 어려웠습니다.</p>
                <p><span>After</span>외부에서도 주문 확인과 발주가 가능해져 장소에 얽매이지 않는 운영 구조를 만들 수 있었습니다.</p>
              </div>
            </article>
            <article class="story-card">
              <p class="seller-meta">6개월차 투잡 셀러</p>
              <h3>R 셀러님</h3>
              <blockquote>“주문이 늘어나는 건 좋은데, 혼자 감당할 수 있을지가 제일 걱정이었어요.”</blockquote>
              <strong>한글 송장과 발주 시스템으로 주문이 늘어도 혼자 운영할 수 있었습니다</strong>
              <div class="before-after">
                <p><span>Before</span>외국어 상품명 확인과 송장 준비에 퇴근 후 시간이 빠르게 사라져 혼자 감당하기 어렵게 느껴졌습니다.</p>
                <p><span>After</span>한글 송장으로 상품 확인 시간을 줄이고 발주 흐름을 단순화해, 추가 인력 없이 투잡 운영을 이어갈 수 있었습니다.</p>
              </div>
            </article>
          </div>
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
          <strong>Lazada 추가</strong>
          <p>Lazada 옵션을 추가해 사용 중인 플랜과 동일한 기능으로 Lazada를 연동할 수 있습니다. 유료 플랜(Basic/Pro) 구독자 전용 서비스</p>
          <span>월 30,000원 <em>VAT 별도</em></span>
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
          <a href="#stories">성장사례</a>
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
