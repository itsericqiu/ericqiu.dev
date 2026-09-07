# Accessibility audit — ericqiu.dev (WCAG 2.2 AA)

(Saved by the orchestrator from the subagent's returned text. Artefacts under `a11y/` and `contrast.mjs`.)

Scope: `dist/` build (byte-identical to live) served locally; axe-core via @axe-core/playwright, Chromium 141. Runs: light 1280, dark via data-theme, colorScheme:dark emulation, reducedMotion:reduce, forcedColors:active, mobile 390×844, reflow 320, text-only 200%, text-spacing, print, JS disabled.

Overall: good shape — one axe rule fails, heading order correct, skip link works, focus visible everywhere, reflow/zoom/text-spacing pass. Real problems: (1) print/no-JS blank-out of the entire Work section, (2) one light-mode grey failing contrast in 7 places, (3) motion/theme preferences declared but not honoured.

## Automated results
| Run | Violations | Incomplete |
|---|---|---|
| Light 1280 | 1 (color-contrast, serious, 7 nodes) | 1 (13 nav-link nodes — backdrop-filter) |
| Dark | 0 | same 13 |
| colorScheme:dark emulation, no click | 1 (same 7 — page renders LIGHT) | 1 |
| Mobile 390 light | 1 (same 7) | 1 |

Failing nodes = every `--text-muted` use in light mode: `.hero-bio-aside`, `.section-num` ×4, `.skills-years`, `.copyright`, all 3.49:1 on #F5F0E8.

## Contrast table (light on #F5F0E8)
| Token | Hex | Ratio | Verdict |
|---|---|---|---|
| textPrimary | #111111 | 16.65 | pass |
| textSecondary | #4A4642 | 8.24 | pass |
| textMuted | #828078 | 3.49 | FAIL (needs 4.5) |
| accent / accent-2 | #7E5F28 | 5.21 | pass |
Dark on #0D0D0B: textPrimary 16.36; textSecondary 6.34; textMuted 4.92; accent 8.74 — all pass.
Hero cycle hues: all 12 pass ≥4.67 (lowest: malachite #207A50 light 4.67). Brief's worry not borne out.
Nav links over translucent nav with logos beneath: est. 4.18 light / 1.66 dark.

## Findings
- F1 High — Work section + tech stack print blank and are invisible without JS (`.reveal-entry`/`.reveal` opacity:0; print PDF page 2 completely blank). Fix S: print CSS override; gate hidden state behind `html.js`; default toggle icon in CSS.
- F2 High — `light.textMuted` #828078 fails AA in 7 places. Fix S: `#6B6961` (4.85 on bgPrimary / 4.61 on bgCard).
- F3 Medium — Hero colour cycling ignores prefers-reduced-motion (inline `el.style.animation` out-specifies media query; `setInterval` unconditional; measured colour change under reduce within 5.6s). `scroll-behavior:smooth` unguarded. Fix S: guard interval; snap without wipe; reduced-motion scroll-behavior:auto; pause on document.hidden; consider stopping after N cycles.
- F4 Medium — OS dark mode never honoured (`<html data-theme="light">` hard-coded; verified colorScheme:dark → light page); no persistence; dark theme lacks `color-scheme: dark`. Fix S–M: drop attribute, matchMedia fallback, localStorage + inline head script, color-scheme on dark selectors, make Hero isDark consistent.
- F5 Medium — Theme toggle 16×16 hit area, no aria-pressed, static label. Fix S: padding 8px/margin -8px; aria-pressed; fixed label.
- F6 Medium — Headings announce "01Work"; section aria-labels diverge from headings; schools are `<p><strong>` not h3; two articles named "Bloomberg LP". Fix S: aria-hidden on .section-num; aria-labelledby; h3 schools.
- F7 Medium — Obfuscated email is not a link; SR reads brackets; points at legacy domain. Fix S: Cloudflare Email Obfuscation + plain mailto, or JS-assembled link with Copy.
- F8 Low — 23 of 29 links open new tabs, no indication. Fix: drop _blank on company/school links; sr-only note on CTAs.
- F9 Low — Logo aria-label "Home" vs visible "Eric Qiu."; active nav link lacks aria-current.
- F10 Low — Nav translucency drops link contrast under logos. Fix: bgNav alpha ~0.88 light / ~0.85 dark (6.28 / 4.25 measured).
- F11 Low — Focus-ring inconsistency; `.link-underline` relies on UA ring (visible, passes). Fix: consistent amber focus-visible.
- F12 Low — Anchor targets land flush under nav; add `html{scroll-padding-top:76px}`.

Verified fine: lang, single h1, heading order, landmarks, skip link, tab order, aria-hidden logo links, forced-colors (belt-and-braces rule suggested), reflow 320, 200% zoom, text spacing, touch targets pass via spacing exception, dark-mode contrast.

## Quick wins (S, together clear every measured failure)
textMuted hex; print CSS + JS-gated reveal; reduced-motion guard; toggle hit area + aria-pressed; aria-hidden numbers + aria-labelledby + h3 schools; focus-visible + scroll-padding-top; aria-current + logo label.
## Bigger bets (M)
Honour OS dark mode + persist + color-scheme; real protected mailto; decide whether hero should cycle forever.

## Questions for Eric
1. Perpetual hero cycle a deliberate signature, or OK to stop after a couple of rounds?
2. Should OS dark mode win on first load? (Nav comment says ignoring OS is "intentional".)
3. Do you expect people to print/save-as-PDF this page, or ship a résumé PDF instead?
4. Keep `[at]/[dot]` obfuscation given Cloudflare can protect a real mailto? Move address to ericqiu.dev?
5. Should schools appear in heading outline?
6. Want external links opening new tabs at all?
