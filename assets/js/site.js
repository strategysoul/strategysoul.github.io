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
    var els = $$(".rv");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
    // Same safety net as the intro lines.
    setTimeout(function () { els.forEach(function (el) { el.classList.add("on"); }); }, 2500);
  })();

  /* ---------- preloader ---------- */
  (function () {
    var pre = $("#preloader");
    if (!pre) return;
    var bar = $("#preBar"), count = $("#preCount"), n = 0;
    function finish() {
      pre.classList.add("is-done");
      setTimeout(function () { pre.remove(); }, 1200);
    }
    if (reduced) { count.textContent = "100"; finish(); return; }
    var t = setInterval(function () {
      n += Math.random() * 9 + 3;
      if (n >= 100) { n = 100; clearInterval(t); setTimeout(finish, 360); }
      count.textContent = Math.floor(n);
      bar.style.width = n + "%";
    }, 90);
  })();

  /* ---------- intro line reveal (.span-lines equivalent) ---------- */
  (function () {
    var el = $("#introLines");
    if (!el) return;
    if (reduced) { el.classList.add("on"); return; }
    var io = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { reveal(); }
    }, { threshold: 0.3 });
    function reveal() { el.classList.add("on"); io.disconnect(); clearTimeout(fallback); }
    // Safety net: if IntersectionObserver never fires (background tab, throttled
    // compositor, observer unsupported) the copy must still become visible.
    var fallback = setTimeout(reveal, 2000);
    io.observe(el);
  })();

  /* ---------- magnetic buttons ---------- */
  (function () {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    $$("[data-magnetic]").forEach(function (el) {
      var rect = null;
      function enter() { rect = el.getBoundingClientRect(); }
      function move(e) {
        if (!rect) rect = el.getBoundingClientRect();
        var dx = e.clientX - (rect.left + rect.width / 2);
        var dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = "translate(" + dx * 0.28 + "px," + dy * 0.28 + "px)";
      }
      function leave() { el.style.transform = "translate(0,0)"; rect = null; }
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
    });
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
