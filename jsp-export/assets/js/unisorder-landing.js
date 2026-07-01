(function () {
  var assetPath = window.UNIS_ASSET_PATH || "./assets";

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

  var showcase = document.querySelector("[data-feature-showcase]");
  var featureTimer;
  var featureIndex = 0;

  function setFeature(index) {
    if (!showcase) return;
    var cards = showcase.querySelectorAll(".feature-card");
    var slides = showcase.querySelectorAll(".feature-slide");
    var title = document.getElementById("feature-title");
    var card = cards[index];
    if (!card) return;

    featureIndex = index;
    cards.forEach(function (item) {
      var isActive = Number(item.dataset.featureIndex) === index;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    slides.forEach(function (slide) {
      slide.classList.toggle("active", Number(slide.dataset.featureSlide) === index);
    });
    if (title) title.textContent = card.dataset.title || "";
  }

  function startFeatureTimer() {
    if (!showcase) return;
    stopFeatureTimer();
    featureTimer = window.setInterval(function () {
      var count = showcase.querySelectorAll(".feature-card").length;
      setFeature((featureIndex + 1) % count);
    }, 4600);
  }

  function stopFeatureTimer() {
    if (featureTimer) window.clearInterval(featureTimer);
  }

  if (showcase) {
    showcase.querySelectorAll(".feature-card").forEach(function (card) {
      card.addEventListener("click", function () {
        setFeature(Number(card.dataset.featureIndex));
        startFeatureTimer();
      });
    });
    showcase.addEventListener("mouseenter", stopFeatureTimer);
    showcase.addEventListener("mouseleave", startFeatureTimer);
    showcase.addEventListener("focusin", stopFeatureTimer);
    showcase.addEventListener("focusout", startFeatureTimer);
    setFeature(0);
    startFeatureTimer();
  }

  document.querySelectorAll(".mobile-panel a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details) details.removeAttribute("open");
    });
  });
})();
