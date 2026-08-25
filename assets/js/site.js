/* StrategySoul v2.0 — shared behaviour. No dependencies. */
(function () {
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* hero name reveal */
  requestAnimationFrame(function () { document.body.classList.add("is-ready"); });

  /* year */
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- custom cursor + work preview ---------- */
  (function () {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    var dot = $("#curDot"), bubble = $("#curBubble"), prev = $("#workPreview");
    if (!dot) return;
    var mx = innerWidth / 2, my = innerHeight / 2, bx = mx, by = my, px = mx, py = my, on = false, pon = false;

    addEventListener("mousemove", function (e) { mx = e.clientX; my = e.clientY; }, { passive: true });

    (function loop() {
      dot.style.transform = "translate(" + mx + "px," + my + "px)";
      bx += (mx - bx) * 0.14; by += (my - by) * 0.14;
      bubble.style.transform = "translate(" + bx + "px," + by + "px) scale(" + (on ? 1 : 0) + ")";
      px += (mx - px) * 0.09; py += (my - py) * 0.09;
      prev.style.transform = "translate(" + px + "px," + py + "px) scale(" + (pon ? 1 : 0.86) + ")";
      requestAnimationFrame(loop);
    })();

    $$("[data-preview]").forEach(function (link) {
      var src = link.getAttribute("data-preview");
      link.addEventListener("mouseenter", function () {
        on = true; pon = true;
        dot.classList.add("is-hidden");
        prev.classList.add("is-on");
        prev.innerHTML = '<img src="' + src + '" alt="">';
      });
      link.addEventListener("mouseleave", function () {
        on = false; pon = false;
        dot.classList.remove("is-hidden");
        prev.classList.remove("is-on");
      });
    });

    // plain links still get the bubble, without a preview panel
    $$(".work__link:not([data-preview]), .nextread").forEach(function (link) {
      link.addEventListener("mouseenter", function () { on = true; dot.classList.add("is-hidden"); });
      link.addEventListener("mouseleave", function () { on = false; dot.classList.remove("is-hidden"); });
    });
  })();

  /* ---------- nav ---------- */
  (function () {
    var panel = $("#navPanel"), btn = $("#menuBtn"), close = $("#navClose");
    if (!panel || !btn) return;
    function set(open) {
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", String(!open));
      btn.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("is-locked", open);
    }
    btn.addEventListener("click", function () { set(true); });
    if (close) close.addEventListener("click", function () { set(false); });
    $$("[data-nav]").forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  })();

  /* ---------- scroll reveals ---------- */
  (function () {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    $$(".rv").forEach(function (el) { io.observe(el); });
  })();

  /* ---------- statement word reveal ---------- */
  (function () {
    var st = $(".statement__text");
    if (!st) return;
    // split top-level text nodes into words, leaving inline markup intact
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t.trim()) { frag.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement("span");
            s.className = "w"; s.textContent = t;
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) { split(n); }
      });
    })(st);

    var words = $$(".w", st);
    if (reduced) { words.forEach(function (w) { w.classList.add("on"); }); return; }
    function onScroll() {
      var box = st.getBoundingClientRect();
      var start = innerHeight * 0.86, end = innerHeight * 0.3;
      var p = (start - box.top) / (start - end);
      var upto = Math.round(Math.max(0, Math.min(1, p)) * words.length);
      words.forEach(function (w, i) { w.classList.toggle("on", i < upto); });
    }
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- reading progress ---------- */
  (function () {
    var bar = $("#progress");
    if (!bar) return;
    function upd() {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    }
    addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
    upd();
  })();

  /* ---------- local clock ---------- */
  (function () {
    var el = $("#clock");
    if (!el) return;
    function tick() {
      var t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
      var z = Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop().replace("_", " ");
      el.textContent = t + " — " + z;
    }
    tick(); setInterval(tick, 15000);
  })();

  /* ---------- wrap wide tables so the page never scrolls sideways ---------- */
  $$(".prose table").forEach(function (t) {
    if (t.parentNode.classList.contains("table-wrap")) return;
    var w = document.createElement("div");
    w.className = "table-wrap";
    t.parentNode.insertBefore(w, t);
    w.appendChild(t);
  });
})();
