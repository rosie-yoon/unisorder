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
  var bulletToneSets = [
    ["tone-sky", "tone-emerald", "tone-amber"],
    ["tone-emerald", "tone-sky", "tone-violet"],
    ["tone-violet", "tone-sky", "tone-rose"],
    ["tone-amber", "tone-rose", "tone-sky"],
    ["tone-indigo", "tone-emerald", "tone-amber"],
    ["tone-emerald", "tone-rose"]
  ];
  var bulletMarks = ["◌", "↻", "□"];

  function renderLines(element, value) {
    if (!element) return;
    element.textContent = "";
    String(value || "").split("|").forEach(function (line, lineIndex) {
      if (lineIndex) element.appendChild(document.createElement("br"));
      element.appendChild(document.createTextNode(line));
    });
  }

  function renderBullets(container, value, index) {
    if (!container) return;
    container.textContent = "";
    var tones = bulletToneSets[index] || bulletToneSets[0];
    String(value || "").split("|").filter(Boolean).forEach(function (text, bulletIndex) {
      var row = document.createElement("div");
      var icon = document.createElement("span");
      var copy = document.createElement("p");
      icon.className = "bullet-icon " + (tones[bulletIndex] || tones[0]);
      icon.textContent = bulletMarks[bulletIndex] || "•";
      copy.textContent = text;
      row.appendChild(icon);
      row.appendChild(copy);
      container.appendChild(row);
    });
  }

  function setFeature(index) {
    if (!showcase) return;
    var cards = showcase.querySelectorAll(".feature-card");
    var slides = showcase.querySelectorAll(".feature-slide");
    var title = document.getElementById("feature-title");
    var description = document.getElementById("feature-description");
    var bullets = document.getElementById("feature-bullets");
    var card = cards[index];
    if (!card) return;

    cards.forEach(function (item) {
      var isActive = Number(item.dataset.featureIndex) === index;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    slides.forEach(function (slide) {
      slide.classList.toggle("active", Number(slide.dataset.featureSlide) === index);
    });
    renderLines(title, card.dataset.title);
    renderLines(description, card.dataset.description);
    renderBullets(bullets, card.dataset.bullets, index);
  }

  if (showcase) {
    showcase.querySelectorAll(".feature-card").forEach(function (card) {
      card.addEventListener("click", function () {
        setFeature(Number(card.dataset.featureIndex));
      });
    });
    setFeature(0);
  }

  document.querySelectorAll(".mobile-panel a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details) details.removeAttribute("open");
    });
  });
})();
