define("bootstrap/browse/gc_promo",["jquery"],function(t){var e=t(".content-wrap .promo-outer");e.click(function(e){var n=t(this).attr("data-href");e.metaKey?window.open(n):window.location=n}),e.on("click","a",function(t){t.stopPropagation()})});