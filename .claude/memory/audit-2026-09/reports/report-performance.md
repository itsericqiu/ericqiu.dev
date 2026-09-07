# Performance review — ericqiu.dev

Role: Web performance engineer (Core Web Vitals, asset weight, render path, Cloudflare caching).
Method: Lighthouse 13.4.1 (Chromium 141) against the local `dist/` build served by `astro preview`; Playwright/CDP for dark-mode, reduced-motion, animation-cost and slow-network runs; `curl` against the live origin for headers. **The live HTML is byte-identical to `dist/index.html` (35,130 bytes, same asset hashes)**, so local numbers represent production apart from network. Chromium could not reach `https://ericqiu.dev` through the sandbox proxy (`ERR_CONNECTION_RESET`), so live Lighthouse was not possible; live evidence is header/size based.

Artifacts (all under `/tmp/claude-0/-home-user-ericqiu-dev/a4e5624b-3cbb-5dc2-89fe-6c52ff481000/scratchpad/`):
`lh-mobile-local.report.{json,html}`, `lh-desktop-local.report.{json,html}`, `lh-*-final.jpg`, `pw-metrics.json`, `live-headers.txt`, `shot-mobile-light.png`, `shot-desktop-light.png`, `shot-*-full.png`, `shot-mobile-osdark-noclick.png`, `shot-mobile-osdark-oneclick.png`, `slow-frame-*.png`, `profile-{154,231}.{webp,avif,jpeg}` (resize prototypes), scripts `pw/measure.js`, `pw/offscreen.js`.

## Headline numbers

| Metric | Mobile (LH simulated Moto G, slow 4G, 4x CPU) | Desktop (LH preset) | Playwright unthrottled 390x844 @3x | Playwright unthrottled 1440x900 |
|---|---|---|---|---|
| Performance score | **98** | **100** | — | — |
| FCP | 1.1 s | 0.3 s | 64 ms | 76 ms |
| LCP | **2.5 s** (score 0.90) | 0.5 s | 664 ms | 768 ms |
| LCP element | `span.hero-line` "Eric" | same | same | same |
| LCP breakdown | TTFB 18 ms, **element render delay 768 ms** | TTFB 7 ms, **render delay 790 ms** | FCP→LCP gap 600 ms | gap 692 ms |
| Speed Index | 1.1 s | 0.3 s | — | — |
| TBT | 0 ms | 0 ms | 0 long tasks | 0 long tasks |
| CLS | 0.00006 | 0.00001 | 0 | 0.00001 |
| Requests / bytes | 14 req, 261 KiB | 15 req, 255 KiB | doc 8.7 KB br | — |
| Accessibility / BP / SEO | 96 / 96 / 100 | 96 / 96 / 100 | | |

Weight of a first load (compressed transfer): fonts 199 KB (76%), `icon-1024.png` 26 KB (10%), logos 15–30 KB, HTML 8.7 KB, CSS 3.7 KB, favicon 1.9 KB. The site is already lean and well-engineered; the findings below are about the last 20%, correctness of the dark-mode/caching setup, and deploy hygiene.

---

## Findings

### 1. OS dark mode never renders; browser chrome goes dark while the page stays cream — **High**
Evidence (Playwright `colorScheme: 'dark'`, no click — `pw-metrics.json → osDark`, `shot-mobile-osdark-noclick.png`):
- `documentElement.dataset.theme === "light"` from the first evaluated frame (hard-coded at `src/layouts/Base.astro:99`).
- `matchMedia('(prefers-color-scheme: dark)').matches === true`, yet `body` background is `rgb(245,240,232)` (cream) and the hero colour is light-palette amber. Screenshot is pixel-identical to the light run.
- The two `<meta name="theme-color">` tags (`Base.astro:135-136`) use media queries, so on a dark-mode phone the Safari/Chrome toolbar paints `#0D0D0B` around a cream page.
- The whole `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) … }` block (`Base.astro:47-65`, `87-91`, `319-321`) and the media fallback in `Hero.astro:168` are dead code: the selector can never match.
- `Nav.astro:39-43` says "OS preference intentionally ignored"; CLAUDE.md says "dark mode from OS preference" — docs and code disagree.
- After one click: `data-theme="dark"`, bg `rgb(13,13,11)` — dark mode itself works. There is no flash, precisely because the page is never dark at first paint.

Why it matters: a recruiter on an iPhone in dark mode sees a dark browser frame around a bright cream page; all the dark-palette work in `palette.ts` is unreachable without a click.

Fix (S): remove the hard-coded attribute (`<html lang="en">`), let CSS `prefers-color-scheme` do first paint (no JS, so no FOUC), have `Nav.astro` compute effective theme as `attr ?? (matchMedia dark ? 'dark' : 'light')`, optionally persist an explicit choice in `localStorage` via a 3-line inline script before the style block. Update CLAUDE.md. If default-light is truly intentional, instead drop the media-query `theme-color` tags and the dead CSS — pick one.

### 2. Entrance animation delays LCP by ~0.6–0.8 s on every device — **Medium**
Evidence: LH LCP breakdown reports **element render delay 768 ms (mobile) / 790 ms (desktop)** with TTFB < 20 ms; Playwright unthrottled shows FCP 64 ms but "Eric" becomes the LCP candidate only at 664 ms (mobile) / 768 ms (desktop). Cause: `.hero-line { animation: line-reveal 0.6s … both }` (`Hero.astro:102-105`) starts at `opacity: 0` (`Base.astro:384-387`), plus `animation-delay: 0.1s` on desktop (`Hero.astro:12`). LCP cannot register until the element paints with non-zero opacity, so the animation is added straight onto LCP. On the LH mobile profile that is the difference between 2.5 s (score 0.90) and ~1.7–1.8 s.

Fix (S): shorten `line-reveal` for `.hero-line` to ≤ 0.25 s and drop the delay, or animate only `transform` with opacity starting at 1 for the name (keep the stagger for kicker/bio/CTA). Alternative: render "Eric" instantly and let the first scan wipe be the reveal.

### 3. Hero colour cycle runs forever, ignores `prefers-reduced-motion`, keeps painting off-screen — **Medium**
Evidence (`pw-metrics.json → animCost`, `pw/offscreen.js`), 12 s windows after settle, 3 scan cycles:

| Condition | Main-thread task time | Paint events | Raster (compositor) | Style recalcs |
|---|---|---|---|---|
| Desktop, hero on-screen | 142 ms (RunTask 389 ms) | 372 / 81 ms | 1470 tasks / 315 ms | 186 |
| Desktop, scrolled to footer | 124 ms (RunTask 206 ms) | 370 / 73 ms | 0 | 185 |
| Mobile viewport, on-screen | 134 ms (RunTask 290 ms) | 370 / 72 ms | 734 / 68 ms | 185 |
| Mobile, scrolled to footer | 134 ms (RunTask 215 ms) | 370 / 75 ms | 0 | 185 |
| `setInterval` suppressed (control) | 3 ms (RunTask 14 ms) | 0 | 0 | 0 |

An idle open tab spends roughly 2–4% of one core continuously (≈60 frames of `@property` interpolation + `background-clip: text` repaint per 1 s scan, every 4 s), and ~1.5% even with the hero scrolled out of view (paint still runs; only raster is culled). Unbounded: `setInterval(advance, 4000)` at `Hero.astro:213` is never cleared; no `document.hidden` check, no IntersectionObserver gate, no reduced-motion check. Reduced-motion run: with `prefers-reduced-motion: reduce`, `.is-scanning` was active in 8 of 38 samples over 9.5 s and the name cycled through 3 colours — `Base.astro:398-402` sets `.hero-line { animation: none }` but the inline `el.style.animation = 'scan-wipe …'` (`Hero.astro:192`) overrides the stylesheet. Background tabs are protected only by Chrome's timer throttling.

Fix (S): bail out when `matchMedia('(prefers-reduced-motion: reduce)').matches`; run the interval only while an IntersectionObserver reports `#top` visible and `!document.hidden` (pause/resume on `visibilitychange`); optionally stop after N loops.

### 4. Hashed `_astro/*` assets and fonts served with a 4-hour revalidating TTL — **Medium**
Evidence (`live-headers.txt`): `/_astro/index.Do_iR_ZY.css`, `/_astro/*.webp` → `cache-control: public, max-age=14400, must-revalidate`, `cf-cache-status: REVALIDATED`; `/fonts/*.woff2` → same, `cf-cache-status: MISS` on 3 of 4 probes (low traffic ⇒ edge eviction). `public/_headers:1-31` covers only icons and `manifest.json`. Returning visitors after 4 h re-issue conditional requests for ~200 KB of fonts and every logo.

Fix (S), add to `public/_headers`:
```
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
```
(Fonts are unhashed but stable; rename the file if ever re-subset.)

### 5. `_headers` icon TTLs are silently overridden by the zone Browser Cache TTL — **Low**
Evidence: `_headers` sets `max-age=3600` for all icon paths; live responses are `public, max-age=14400, stale-while-revalidate=86400` for every icon, while `/manifest.json` (`cf-cache-status: DYNAMIC`) keeps 3600. That matches Cloudflare's zone **Browser Cache TTL = 4 hours** default raising any cacheable response's shorter `max-age`. The `?v=2` busting is what actually works; the 3600 rule is inert and CLAUDE.md's "icon TTL reduced 86400→3600s" is not what ships. Fix (S): set zone Browser Cache TTL to "Respect Existing Headers", or drop the 3600 rules and document `?v=N` as the mechanism.

### 6. `icon-1024.png` (26 KB) downloaded on every first visit — **Low**
Evidence: LH network log, both form factors: `icon-1024.png`, priority **High**, requested at ~245 ms — second-largest non-font download, 10% of page weight. Chrome fetches the manifest on load and then the icon it selects; `src/pages/manifest.json.ts:18-19` lists 1024 twice, including as the sole `maskable` entry. Fix (S): make `icon-512.png` the maskable/primary icon and drop 1024 (nothing needs > 512; iOS uses `apple-touch-icon`).

### 7. Render-blocking external CSS could be inlined — **Low**
Evidence: `/_astro/index.Do_iR_ZY.css` 17 KB raw / 3.7 KB br, flagged by LH `render-blocking-insight` (est. 154 ms mobile). The HTML is `max-age=0, must-revalidate`, so caching CSS separately buys nothing on a one-page site. Fix (S): `build: { inlineStylesheets: 'always' }` in `astro.config.mjs` — saves one round trip before first paint.

### 8. `profile.jpg`: 391 KB, 1024×1024, EXIF+ICC, for a 77 px avatar — **Low** (data usage, not CWV)
Evidence: `file public/profile.jpg` → 1024×1024 baseline JPEG, 391,173 bytes; rendered 77×77 (`Footer.astro:17-24`). `loading="lazy"`, so no LCP impact, but scrolling to the footer on mobile pulls 391 KB for a 231 px (3x) circle. Prototypes (`scratchpad/profile-*`): 154 px WebP **4.5 KB**, 231 px WebP **8.2 KB**, 231 px AVIF 6.6 KB — 98% smaller. Fix (S): move to `src/assets/`, `<Image src={profile} width={77} densities={[1,2,3]} format="webp" />`; keep a 512 px copy in `public/` for JSON-LD `image` (`Base.astro:171`) if desired.

### 9. Fonts are near the floor for this design; FOUT is the residual risk — **Low / informational**
Evidence (fonttools on `public/fonts/*.woff2`): Fraunces roman 67 KB / italic 82 KB are latin-only (222 codepoints) variable files carrying **`opsz 9–144` + `wght 100–900`** (filename says 300–900; full weight axis ships). `font-optical-sizing: auto` is used everywhere, so `opsz` is doing real work. Weights in use: roman 600/800; italic 350/400/600/800 (`index.astro` `.cta-tagline`, `.photo-callout-text`, Nav, Hero) — static instancing would need 6 files and lose `opsz`; not worth it. `unicode-range` is unnecessary with single latin subsets. Partial instancing (`varLib.instancer wght=300:800`) might trim ~10%; marginal.
The cost is timing, not bytes: LH mobile FCP 1.1 s vs LCP 2.5 s with `font-display: swap` means Georgia paints first and Fraunces swaps ~1 s later on a slow-4G first visit (CLS stayed 0.0008 in the throttled run thanks to fixed hero line-height). Loopback screenshots (`slow-frame-*.png`) could not capture the fallback frame — treat the FOUT as inferred from the LH timeline. Cheap mitigations: `size-adjust`/`ascent-override` on a `local(Georgia)` fallback face; preload `space-mono-latin-700.woff2` (the `01 WORK` label is above the fold on mobile — `shot-mobile-light.png` — but that face is discovered late via CSS).

### 10. Deploy ships ~2.06 MB of unreferenced files (67% of `dist/`) — **Low** perf / cross-cutting
Evidence: `dist/` is 3.1 MB; `dist/index.html` has zero references to: `icon-palette/` (1.4 MB, 112 PNGs, **committed** despite CLAUDE.md saying gitignored), `logos/*.png` (272 KB, duplicates of `src/assets/logos/*.webp`), `coffee-3d.png` (254 KB), `palette-*.html`, `hero-anim.html`, `font-preview.html`, `_lab.html`, `_lab*.js/css` (~300 KB), three extra `apple-touch-icon-*` variants. `public/og-image.png` (55 KB, 690×431) is stale: the dynamic route wins — `dist/og-image.png` is the 1200×630, 21.6 KB satori output and that is what production serves. No page-weight impact, but every deploy is inflated, all lab pages are publicly reachable (`/palette-preview` → 200, 114 KB; `.html` URLs 308 to extensionless) and pull Google Fonts from a third party. Fix (S): delete `public/logos/`, `public/coffee-3d.png`, `public/og-image.png`, `src/assets/inter-bold.ttf`; move `public/icon-palette/` and the lab pages outside `public/`; actually gitignore `icon-palette/`.

### 11. Already good (no action)
CLS ≈ 0 with explicit `width/height` on every image; TBT 0, no long tasks > 50 ms at 4x CPU; HTML 8.7 KB brotli; Brotli + HTTP/2 + HTTP/3 (`alt-svc: h3`) live; GA deferred to first interaction/idle with `dns-prefetch` only (`Base.astro:177-209`); scroll handlers rAF-gated and read-only (`Base.astro:227-235`, `Nav.astro:83-90`); logos responsive WebP with 1x/2x srcset; `loading="lazy"` below the fold; TTFB ~10 ms; no unused CSS/JS.

---

## Quick wins (≤ 1 hour each)
1. `_headers`: `immutable` 1-year rules for `/_astro/*` and `/fonts/*` (F4).
2. Fix OS dark mode: drop `data-theme="light"` from `<html>`, make `Nav.astro` read the media query (F1).
3. Gate the hero cycle: reduced-motion bail-out + `visibilitychange` + IntersectionObserver pause (F3).
4. Cut the name's entrance animation to ≤ 0.25 s / no delay (F2) — expected mobile LCP 2.5 s → ~1.7 s.
5. Manifest: 512 as maskable, drop 1024 (F6).
6. `inlineStylesheets: 'always'` (F7).
7. Delete the dead files in F10; gitignore `icon-palette/`.

## Bigger bets
- `profile.jpg` through `astro:assets` with 1x/2x/3x WebP (F8).
- Font fallback metrics (`size-adjust`, `ascent-override`, `line-gap-override`) so the slow-network swap is invisible (F9) — ~2 h with tuning.
- Relocate the design lab out of `public/` so it stops shipping to production — ½ day if shared-asset paths need fixing.
- Decide whether the colour cycle should be finite (one loop, then rest) — removes the only ongoing CPU cost on the page.

## Cross-cutting notes for the synthesizer
- `astro.config.mjs` keys off `CF_PAGES_BRANCH`, but the deploy is a Workers-assets project (`wrangler.json`); Workers Builds exposes `WORKERS_CI_BRANCH`. Falls back to the prod URL, so fine today, but preview deploys would claim `https://ericqiu.dev` as canonical.
- LH accessibility (96): `--text-muted #828078` on cream is 3.48:1 (bio aside, section numerals, `.skills-years`); nav logo `aria-label="Home"` mismatches visible "Eric Qiu.". For the a11y reviewer.
- CLAUDE.md statements contradicted by measurement: "dark mode from OS preference" (F1), "icon TTL reduced … 3600s" (F5), "`icon-palette/` gitignored" (F10).

## Open questions only Eric can answer
1. Is default-light-regardless-of-OS a deliberate choice (the Nav comment says so) or a leftover? The `theme-color` metas and the dead dark CSS suggest OS-aware was the intent.
2. Should the name colour cycle run indefinitely, or is a finite loop acceptable?
3. Are the design-lab pages meant to be publicly reachable at ericqiu.dev, or only for local use?
4. Is the 1024 px icon needed for anything specific, or can 512 be the ceiling?
5. Must JSON-LD `image` stay a full-resolution photo, or can it point at the optimized avatar?
