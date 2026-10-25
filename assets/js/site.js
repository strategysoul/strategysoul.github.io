/* StrategySoul: mobile nav, reveals, counters, case filters, card spotlight. No dependencies. */
(function () {
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- mobile nav ---------- */
  var nav = document.querySelector(".nav"), btn = document.querySelector(".nav__toggle");
  if (nav && btn) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close" : "Menu";
    });
    // same-page anchors (Work on the home page) don't reload, so close explicitly
    $$(".nav__links a", nav).forEach(function (a) {
      a.addEventListener("click", function () { if (nav.classList.contains("is-open")) btn.click(); });
    });
    addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) btn.click();
    });
  }

  /* ---------- count-up for impact numbers ---------- */
  // "$800K" -> prefix "$", 800, suffix "K". The final text stays in aria-label.
  function countUp(el) {
    var m = el.textContent.trim().match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m || reduced) return;
    var pre = m[1], end = parseFloat(m[2].replace(/,/g, "")), post = m[3], t0 = null, dur = 1400;
    var dec = (m[2].split(".")[1] || "").length, comma = m[2].indexOf(",") > -1;
    el.setAttribute("aria-label", el.textContent.trim());
    function frame(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
      var s = v.toFixed(dec);
      if (comma) s = Number(s).toLocaleString("en-US");
      el.textContent = pre + s + post;
      if (p < 1) requestAnimationFrame(frame);
    }
    el.textContent = pre + "0" + post;
    requestAnimationFrame(frame);
  }

  /* ---------- reveals (and counters when their block appears) ---------- */
  var els = $$(".rv");
  function show(el) {
    el.classList.add("on");
    $$(".stat__n, .minis b", el).forEach(countUp);
  }
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { show(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(show);
  }

  /* ---------- case study filters ---------- */
  var grid = document.querySelector(".cases");
  $$(".filters .chip").forEach(function (chip, _, chips) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      grid.classList.toggle("is-filtered", f !== "all");
      $$(".case", grid).forEach(function (card) {
        var keep = f === "all" || card.getAttribute("data-cat") === f;
        card.hidden = !keep;
        card.classList.add("on");   // never leave a filtered-in card invisible
        card.classList.remove("is-entering");
        if (keep) { void card.offsetWidth; card.classList.add("is-entering"); }
      });
    });
  });

  /* ---------- cursor spotlight on cards ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches) {
    $$(".case, .feature, .stat").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
