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

  document.querySelectorAll(".mobile-panel a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details) details.removeAttribute("open");
    });
  });
})();
