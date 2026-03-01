/**
 * _lab.js — Shared behaviour for all lab pages (ericqiu.dev)
 *
 * Place this <script> just before </body> on every lab page.
 * It auto-initialises any components it finds on the page.
 */
(function () {

  /* ── Collapsible nav toggle ──────────────────────────────────────────────
   * Wires up #nav-toggle  →  toggles .open on #nav-links and #nav-strip.
   * Works with the .nav-strip / .nav-links / .nav-toggle markup in _lab.css.
   */
  function initLabNav() {
    var navStrip  = document.getElementById('nav-strip');
    var navToggle = document.getElementById('nav-toggle');
    var navLinks  = document.getElementById('nav-links');
    if (!navToggle || !navLinks) return;

    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      if (navStrip) navStrip.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    });

    /* Close nav when a jump-link inside it is tapped (mobile UX) */
    navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        if (navStrip) navStrip.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Auto-init ───────────────────────────────────────────────────────── */
  initLabNav();

  /* Expose globally so page scripts can call it again if they rebuild the DOM */
  window.initLabNav = initLabNav;

})();
