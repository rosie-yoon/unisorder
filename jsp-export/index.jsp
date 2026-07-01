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
        <h1>주문부터 재고,<br class="mobile-only" /><span> 마진 관리까지 원스톱 처리</span></h1>
        <div class="hero-actions">
          <a class="button button-green button-large" href="<%= loginUrl %>">무료로 시작하기</a>
          <a class="button button-dark button-large" href="<%= guideUrl %>">이용가이드</a>
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

        <div class="feature-showcase" data-feature-showcase>
          <div class="feature-tab-wrap">
            <div class="feature-card-grid" role="tablist" aria-label="기능 화면 선택">
              <button class="feature-card active tone-sky" type="button" data-feature-index="0" data-title="2개 플랫폼 8개국 주문을|한 화면에서" data-description="국가별·샵별로 흩어진 주문 현황을 한 번에 확인하고|오늘 처리할 업무 흐름을 정리합니다." data-bullets="Shopee·Lazada 통합 현황 조회|발송 대기·처리중·취소·반품 상태 확인|TOP 5 판매 상품 현황 확인">
                <span class="feature-card-icon"><svg viewBox="0 0 24 24"><path d="M8 5h8M9 3h6v4H9zM6 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1M8 12h.01M12 12h6M8 16h.01M12 16h6"/></svg></span>
                <strong>통합 대시보드</strong>
              </button>
              <button class="feature-card tone-emerald" type="button" data-feature-index="1" data-title="통합 페이지에서 반복 확인 없이 주문 처리 흐름을 빠르게" data-description="상품 확인, SKU 매칭, 송장 출력처럼 반복 업무를 한 화면에서 이어갑니다." data-bullets="실시간 주문 수집과 상태 동기화|상품·옵션 기준 주문 확인|처리 누락과 중복 작업 감소">
                <span class="feature-card-icon"><svg viewBox="0 0 24 24"><path d="m21 8-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="m7.5 10.5 9-5"/><path d="m9.5 17 2 2 4-5"/></svg></span>
                <strong>통합 주문처리</strong>
              </button>
              <button class="feature-card tone-violet" type="button" data-feature-index="2" data-title="외국어 상품 정보를|한글로 정확하게" data-description="8개국 언어로 표시되는 상품명과 옵션을 발주·포장 단계에서|확인하기 쉬운 형태로 정리합니다." data-bullets="한글 송장 출력|상품명·옵션 확인 시간 단축|오포장과 오출고 리스크 감소">
                <span class="feature-card-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/></svg></span>
                <strong>한글 송장</strong>
              </button>
              <button class="feature-card tone-amber" type="button" data-feature-index="3" data-title="빠르고 정확한 발주와 입고관리" data-description="SKU 기준으로 주문과 재고 흐름을 연결해 반복 발주와 입고 현황을 점검하여 효율화를 높입니다." data-bullets="SKU 기반 재고 관리|재고 부족 상품 확인|발주 판단에 필요한 수량 정리">
                <span class="feature-card-icon"><svg viewBox="0 0 24 24"><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg></span>
                <strong>재고·발주</strong>
              </button>
              <button class="feature-card tone-indigo" type="button" data-feature-index="4" data-title="상품별 실제 수익성을 바로 확인" data-description="매입가, 판매가, 정산 흐름을 연결해|상품의 수익 및 마진을 빠르게 파악합니다." data-bullets="상품별 마진 추적|환율·매입가 기준 수익 확인|판매가격 점검 상품 구분">
                <span class="feature-card-icon"><svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 16V9M12 16V5M17 16v-3"/></svg></span>
                <strong>마진 분석</strong>
              </button>
              <button class="feature-card tone-rose" type="button" data-feature-index="5" data-title="8개국 주문 및 정산내역|원클릭 다운로드" data-description="부가세신고자료와 소포수령증 발급에 필요한 문서를|클릭 한 번으로 내려받습니다." data-bullets="완료 주문내역 엑셀 파일 제공|정산 내역 PDF 파일 제공">
                <span class="feature-card-icon"><svg viewBox="0 0 24 24"><path d="M6 2h12v20l-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M9 7h6M9 11h6M9 15h4"/></svg></span>
                <strong>부가세신고 자료</strong>
              </button>
            </div>
          </div>

          <div class="feature-detail">
            <div class="feature-showcase-copy">
              <h3 id="feature-title">2개 플랫폼 8개국 주문을 한 화면에서</h3>
              <p id="feature-description">국가별·샵별로 흩어진 주문 현황을 한 번에 확인하고<br />오늘 처리할 업무 흐름을 정리합니다.</p>
              <div class="feature-bullets" id="feature-bullets">
                <div><span class="bullet-icon tone-sky">◌</span><p>Shopee·Lazada 통합 현황 조회</p></div>
                <div><span class="bullet-icon tone-emerald">↻</span><p>발송 대기·처리중·취소·반품 상태 확인</p></div>
                <div><span class="bullet-icon tone-amber">□</span><p>TOP 5 판매 상품 현황 확인</p></div>
              </div>
            </div>

            <div class="feature-screen" aria-live="polite">
              <div class="feature-image-frame">
                <img class="feature-slide active" data-feature-slide="0" src="<%= assetPath %>/images/product/unisorder-dashboard.png" alt="통합 대시보드 화면" />
                <img class="feature-slide" data-feature-slide="1" src="<%= assetPath %>/images/product/features/order-processing.png" alt="통합 주문처리 화면" />
                <img class="feature-slide portrait" data-feature-slide="2" src="<%= assetPath %>/images/product/features/korean-invoice.png" alt="한글 송장 화면" />
                <img class="feature-slide" data-feature-slide="3" src="<%= assetPath %>/images/product/features/inventory-purchase.png" alt="재고 발주 화면" />
                <img class="feature-slide" data-feature-slide="4" src="<%= assetPath %>/images/product/features/margin-analysis.png" alt="마진 분석 화면" />
                <img class="feature-slide tax" data-feature-slide="5" src="<%= assetPath %>/images/product/features/tax-report.png" alt="부가세신고 자료 화면" />
              </div>
            </div>
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

        <div class="pricing-grid pc-grid">
          <article class="price-card pc-card">
            <h3 class="pc-name">Free</h3>
            <div class="pc-price-row"><span class="price pc-price free">무료</span></div>
            <p class="pc-desc">쇼피 입문 셀러를 위한 플랜</p>
            <div class="pc-infobox">
              <div><div class="pc-info-label">지원 플랫폼</div><div class="pc-info-value">Shopee 8개국</div></div>
              <div><div class="pc-info-label">주문수집</div><div class="pc-info-value">200건/월</div></div>
            </div>
            <div class="pc-featurebox">
              <div class="pc-features-header">포함 기능</div>
              <ul class="pc-features">
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>통합 대시보드</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>실시간 주문 수집</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>통합 주문 처리</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>한글 송장 출력</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>쇼피 프리디클레어</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>수동 재고 차감 발주리스트</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>운영 분석 리포트</span></li>
              </ul>
            </div>
            <a class="pc-cta" href="<%= loginUrl %>"><span>무료로 시작하기</span><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
          </article>

          <article class="price-card pc-card">
            <h3 class="pc-name">Basic</h3>
            <div class="pc-price-row"><span class="price pc-price"><span>월</span> 70,000원</span><em class="pc-vat">(VAT 별도)</em></div>
            <p class="pc-desc">본격적으로 성장하는 셀러를 위한 플랜</p>
            <div class="pc-infobox">
              <div><div class="pc-info-label">지원 플랫폼</div><div class="pc-info-value">Shopee 8개국</div></div>
              <div><div class="pc-info-label">주문수집</div><div class="pc-info-value">무제한</div></div>
            </div>
            <div class="pc-featurebox">
              <div class="pc-features-header">포함 기능</div>
              <ul class="pc-features">
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>통합 대시보드</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>실시간 주문 수집</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>통합 주문 처리</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>한글 송장 출력</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>쇼피 프리디클레어</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>수동 재고 차감 발주리스트</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>운영 분석 리포트</span></li>
              </ul>
            </div>
            <a class="pc-cta pc-cta-primary" href="<%= loginUrl %>"><span>플랜 선택하기</span><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
          </article>

          <article class="price-card pc-card">
            <h3 class="pc-name">Pro</h3>
            <div class="pc-price-row"><span class="price pc-price"><span>월</span> 150,000원</span><em class="pc-vat">(VAT 별도)</em></div>
            <p class="pc-desc">다음 단계로 도약하는 셀러를 위한 플랜</p>
            <div class="pc-infobox">
              <div><div class="pc-info-label">지원 플랫폼</div><div class="pc-info-value">Shopee 8개국</div></div>
              <div><div class="pc-info-label">주문수집</div><div class="pc-info-value">무제한</div></div>
            </div>
            <div class="pc-featurebox">
              <div class="pc-features-header">포함 기능</div>
              <ul class="pc-features">
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>통합 대시보드</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>실시간 주문 수집</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>통합 주문 처리</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>한글 송장 출력</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>쇼피 프리디클레어</span></li>
                <li><svg class="plus" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v8M8 12h8"></path></svg><span>실시간 재고 연동</span></li>
                <li><svg class="plus" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v8M8 12h8"></path></svg><span>SKU 통합 재고 관리</span></li>
                <li><svg class="plus" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v8M8 12h8"></path></svg><span>자동 재고 차감 발주리스트</span></li>
                <li><svg class="ck" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"></path></svg><span>운영 분석 리포트</span></li>
                <li><svg class="plus" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v8M8 12h8"></path></svg><span>부가세신고자료 원클릭 다운로드</span></li>
              </ul>
            </div>
            <a class="pc-cta pc-cta-primary" href="<%= loginUrl %>"><span>플랜 선택하기</span><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg></a>
          </article>
        </div>

        <div class="addon addon-card">
          <div class="addon-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
              <path d="m18 15-2-2" />
              <path d="m15 18-2-2" />
            </svg>
          </div>
          <div class="addon-copy addon-body">
            <strong class="addon-title">Lazada 추가</strong>
            <p class="addon-desc">Lazada 옵션을 추가해 사용 중인 플랜과 동일한 기능으로 <strong>Lazada</strong>를 연동할 수 있습니다.<span class="addon-eligible">유료 플랜(Basic/Pro) 구독자 전용 서비스</span></p>
          </div>
          <div class="addon-price-box">
            <span class="addon-badge">ADD-ON</span>
            <strong class="addon-price">월 30,000원</strong>
            <em class="addon-vat">(VAT 별도)</em>
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
