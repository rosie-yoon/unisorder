(function () {
  var assetPath = window.UNIS_ASSET_PATH || "./assets";

  var features = [
    {
      title: "2개 플랫폼 8개국 주문을<br />한 화면에서",
      description: "국가별·샵별로 흩어진 주문 현황을 한 번에 확인하고<br />오늘 처리할 업무 흐름을 정리합니다.",
      points: ["Shopee·Lazada 통합 현황 조회", "발송 대기·처리중·취소·반품 상태 확인", "TOP 5 판매 상품 현황 확인"]
    },
    {
      title: "통합 페이지에서 반복 확인 없이<br />주문 처리 흐름을 빠르게",
      description: "상품 확인, SKU 매칭, 송장 출력처럼<br />반복 업무를 한 화면에서 이어갑니다.",
      points: ["실시간 주문 수집과 상태 동기화", "상품·옵션 기준 주문 확인", "처리 누락과 중복 작업 감소"]
    },
    {
      title: "외국어 상품 정보를<br />한글로 정확하게",
      description: "8개국 언어로 표시되는 상품명과 옵션을 발주·포장 단계에서<br />확인하기 쉬운 형태로 정리합니다.",
      points: ["한글 송장 출력", "상품명·옵션 확인 시간 단축", "오포장과 오출고 리스크 감소"]
    },
    {
      title: "빠르고 정확한 발주와<br />입고관리",
      description: "SKU 기준으로 주문과 재고 흐름을 연결해<br />반복 발주와 입고 현황을 점검하여 효율화를 높입니다.",
      points: ["SKU 기반 재고 관리", "재고 부족 상품 확인", "발주 판단에 필요한 수량 정리"]
    },
    {
      title: "상품별 실제 수익성을<br />바로 확인",
      description: "매입가, 판매가, 정산 흐름을 연결해<br />상품의 수익 및 마진을 빠르게 파악합니다.",
      points: ["상품별 마진 추적", "환율·매입가 기준 수익 확인", "판매가격 점검 상품 구분"]
    },
    {
      title: "8개국 주문 및 정산내역<br />원클릭 다운로드",
      description: "부가세신고자료와 소포수령증 발급에 필요한 문서를<br />클릭 한 번으로 내려받습니다.",
      points: ["완료 주문내역 엑셀 파일 제공", "정산 내역 PDF 파일 제공"]
    }
  ];

  function setFeature(index) {
    var feature = features[index];
    if (!feature) return;

    document.querySelectorAll(".feature-tab").forEach(function (tab) {
      tab.classList.toggle("active", Number(tab.dataset.featureIndex) === index);
    });

    document.querySelectorAll(".feature-image").forEach(function (image) {
      image.classList.toggle("active", Number(image.dataset.featureImage) === index);
    });

    var title = document.getElementById("feature-title");
    var description = document.getElementById("feature-description");
    var points = document.getElementById("feature-points");
    if (title) title.innerHTML = feature.title;
    if (description) description.innerHTML = feature.description;
    if (points) {
      points.innerHTML = feature.points.map(function (point) {
        return "<li>" + point + "</li>";
      }).join("");
    }
  }

  document.querySelectorAll(".feature-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      setFeature(Number(tab.dataset.featureIndex));
    });
  });

  [
    "/images/product/unisorder-dashboard.png",
    "/images/product/features/order-processing.png",
    "/images/product/features/korean-invoice.png",
    "/images/product/features/inventory-purchase.png",
    "/images/product/features/margin-analysis.png",
    "/images/product/features/tax-report.png"
  ].forEach(function (src) {
    var image = new Image();
    image.src = assetPath + src;
  });

  var storyIndex = 0;
  var storyCount = document.querySelectorAll(".story-card").length;
  var storyTrack = document.querySelector(".story-track");
  var storyTimer;

  function setStory(index) {
    if (!storyCount || !storyTrack) return;
    storyIndex = (index + storyCount) % storyCount;
    storyTrack.style.transform = "translateX(-" + storyIndex * 100 + "%)";
    document.querySelectorAll(".story-dot").forEach(function (dot) {
      dot.classList.toggle("active", Number(dot.dataset.storyIndex) === storyIndex);
    });
  }

  function startStoryTimer() {
    stopStoryTimer();
    storyTimer = window.setInterval(function () {
      setStory(storyIndex + 1);
    }, 5200);
  }

  function stopStoryTimer() {
    if (storyTimer) window.clearInterval(storyTimer);
  }

  document.querySelectorAll(".story-dot").forEach(function (dot) {
    dot.addEventListener("click", function () {
      setStory(Number(dot.dataset.storyIndex));
      startStoryTimer();
    });
  });

  var storyNext = document.querySelector(".story-next");
  if (storyNext) {
    storyNext.addEventListener("click", function () {
      setStory(storyIndex + 1);
      startStoryTimer();
    });
  }

  var storySlider = document.querySelector("[data-story-slider]");
  if (storySlider) {
    storySlider.addEventListener("mouseenter", stopStoryTimer);
    storySlider.addEventListener("mouseleave", startStoryTimer);
    storySlider.addEventListener("focusin", stopStoryTimer);
    storySlider.addEventListener("focusout", startStoryTimer);
  }

  startStoryTimer();

  document.querySelectorAll(".mobile-menu-panel a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details) details.removeAttribute("open");
    });
  });
})();
