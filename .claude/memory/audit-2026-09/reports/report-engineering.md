# Engineering review — ericqiu.dev

Role: staff front-end engineer (code quality, architecture, build/deploy, web security hygiene).
Scope: full repo at `/home/user/ericqiu.dev` @ `dcdd79b` (main, 2026-04-27), fresh `npm run build`, `npm outdated`, `npm audit`, live-header checks against https://ericqiu.dev on 2026-09-07. Read-only; nothing in the repo was modified (the rebuild regenerated `public/` icons byte-identically — see B1).

## TL;DR — the five things I would fix first

1. **Dark mode is dead on first load and the theme layer is internally contradictory** (T1, High). `<html data-theme="light">` is hard-coded, so ~45 lines of `prefers-color-scheme` CSS across 3 files can never match, Hero's `matchMedia` fallback is dead code, yet `<meta name="theme-color" media="(prefers-color-scheme: dark)">` and `<meta name="color-scheme" content="light dark">` still follow the OS — OS-dark visitors get a cream page inside a near-black browser chrome with dark-styled scrollbars/form controls. CLAUDE.md's "dark mode from OS preference" is false.
2. **~2.5 MB of design-lab and orphaned assets ship to production and are publicly reachable** (R1, High): `ericqiu.dev/palette-preview`, `/_lab`, `/hero-anim`, `/font-preview`, `/icon-palette/*.png` (112 files), `/coffee-3d.png`, `/logos/*.png` all return 200. The lab pages pull Google Fonts from a third party, undoing the self-hosting work, and have no `noindex`.
3. **No security headers beyond what Cloudflare adds by default** (S1, High): no CSP, no HSTS (confirmed absent live), no `Permissions-Policy`, no `frame-ancestors`. All fixable in `public/_headers`.
4. **`_headers` is partially overridden by Cloudflare and hashed assets are under-cached** (B4, Medium): repo says `max-age=3600` for icons, live serves `max-age=14400`; `/_astro/*.css` (content-hashed) is served with `max-age=14400, must-revalidate` instead of a year + `immutable`.
5. **Zero CI, decorative strictness** (B6, Medium): `tsconfig` extends `strict` but `@astrojs/check` isn't installed and nothing runs it; no build check on PRs (#2–#6 merged with none); `npm audit` reports 19 advisories (16 high) in the build toolchain.

Everything else is Medium/Low polish. The codebase is small, readable and well-documented — the problems are mostly drift between what the docs/intent say and what the code does.

---

## Findings

Severity: Critical / High / Medium / Low / Idea. Effort: S (<1h) / M (half day) / L (multi-day).

### 1. Architecture / data model

**A1 — Content lives in `index.astro`; identity lives in `site.ts`; JSON-LD lives in `Base.astro`; footer copy lives in `Footer.astro` — four sources of truth for overlapping facts.** — *Medium, effort M*
- Evidence: `src/pages/index.astro:18-125` (experiences/education/techStack arrays); `src/layouts/Base.astro:150-175` hard-codes `jobTitle`, `worksFor: "Bloomberg LP"`, `alumniOf`, `sameAs` (GitHub/LinkedIn/Instagram); `src/components/Footer.astro:2-6` hard-codes the same three social URLs again; `Footer.astro:28-32` hard-codes the bio text while `site.footerBio` (`src/site.ts:30`) is **never imported anywhere** (`grep footerBio src` → only the definition).
- Why it matters: for a designed résumé the content *is* the product. A title change ("Senior" → "Staff") or a new social link currently touches 3–4 files, and the JSON-LD (what Google/LinkedIn scrapers read) is the one most likely to be forgotten.
- Fix: create `src/content.ts` (typed: `type Experience = {...}`, `export const experiences = [...] satisfies Experience[]`, same for `education`, `techStack`, `socials`) and derive JSON-LD `worksFor`/`alumniOf`/`sameAs` from it; make Footer read `site.footerBio` and `socials`. Astro Content Collections are overkill for one page — reach for them only if a blog/projects section appears (then `src/content/experiences/*.yaml` with a zod schema is the natural upgrade).

**A2 — Redundant `<Base title= ogTitle= description=>` props in `index.astro:128-132`.** — *Low, effort S*
- The three literal strings are character-for-character identical to `site.pageTitle / ogTitle / description`, which `Base` already uses as defaults (`Base.astro:12-17`). Pure drift risk. Delete the props: `<Base>`.

**A3 — `ExperienceCard.astro` is dead code.** — *Low, effort S*
- Last imported before `18c0375` (2026-02-28 redesign). Uses `--button-shadow`, which no longer exists in `palette.ts`, and an `icon: string` (Font Awesome class) prop from the Typedream era. `work-tracking.md` still lists "Consider whether to keep" — decide: delete (git has it).

**A4 — Dark-mode CSS is emitted three times and the "dual selector" pattern is copy-pasted in five places.** — *Medium, effort M (do together with T1)*
- Evidence: `Base.astro:23-82` (`:root`, `@media dark :root:not([data-theme="light"])`, `[data-theme="dark"]` — 15 vars × 3), plus the same pair for `::selection` (`:83-94`), `.invert-on-dark` (`:319-322`), `EducationCard.astro:89-94` (via `:global()`), `index.astro:525-534`.
- Because of T1 the media-query half of every pair is unreachable today, so 2 of the 3 blocks are dead weight (≈1 KB of the 2.2 KB inline style) and the `:global()` hacks exist only to serve them.
- Fix (recommended): make JS the single authority for the attribute (see T1 strategy) and emit **one** dark block: `[data-theme="dark"] { … }`. Generate both blocks from one helper in the frontmatter:
  ```ts
  const vars = (m: PaletteMode) => Object.entries(TOKEN_MAP).map(([k, v]) => `${k}:${m[v]}`).join(';');
  const cssVars = `:root{${vars(light)}} [data-theme="dark"]{${vars(dark)}}`;
  ```
  Every `:global(:root:not([data-theme="light"]))` and `@media (prefers-color-scheme: dark)` override in components then collapses to a single `:global([data-theme="dark"])` rule (or, better, a token: `.logo-dark-only{display:var(--show-dark, none)}`).
- Not recommended: `light-dark()`. It is Baseline 2024 (Safari 17.5+). On iOS 16–17.4 an unsupported `light-dark()` value invalidates the declaration, so `var(--bg-primary)` resolves to nothing and the page loses all colour. Given the owner's explicit iPhone focus, don't take that risk for a 1 KB saving.

**A5 — Scoped vs global styling is otherwise sane; two smells.** — *Low, effort S*
- `Hero.astro:148-153` — `animation-delay: 0s !important` on mobile exists only to beat the *inline* `style="animation-delay: 0.1s"` attributes on `Hero.astro:12-13,18`. Move the stagger to CSS (`.hero-line:nth-child(2){animation-delay:.3s}`) and the `!important` disappears; it also removes 2 of the 10 inline `style=` attributes that block a strict `style-src` (see S1).
- `index.astro:143,195` inline `transition-delay` for reveal stagger — same story; `nth-child` or `--i` custom property + `calc()` keeps it declarative.

### 2. Theme handling

**T1 — OS dark mode is unreachable; three layers disagree about who owns the theme.** — *High, effort M*
- Evidence chain:
  - `Base.astro:99` `<html lang="en" data-theme="light">` (also confirmed live: `curl https://ericqiu.dev | grep '<html'` → `data-theme="light"`).
  - `Base.astro:47-65,87-91,319-321`, `EducationCard.astro:89-92`, `index.astro:525-531` — all gated on `:root:not([data-theme="light"])` → **never match**.
  - `Hero.astro:168` `isDark()` falls through to `matchMedia` only when the attribute is absent → **never**.
  - `Nav.astro:39-43` `getEffectiveTheme()` returns `'light'` by design ("OS preference intentionally ignored"); no `matchMedia` listener.
  - `Base.astro:134-136` `color-scheme: light dark` + two media-gated `theme-color` metas → **still follow the OS**. Result for an OS-dark visitor: cream page, `#0D0D0B` Safari/Chrome toolbar, dark UA scrollbars and any future form control. Result after clicking the toggle in OS-light: dark page, cream toolbar. Neither state is coherent.
  - No persistence: toggle state is lost on reload (`5cb0ac8`).
- History / intent: `5cb0ac8` (2026-02-28, "remove theme persistence — always load from OS preference") removed the `localStorage` pre-paint script *and* the persistence, leaving CSS media queries as the OS mechanism. Four days later `1c08479` (2026-03-03, "default to light theme") added `data-theme="light"` to `<html>` explicitly to "suppress OS dark preference", and stripped Nav's OS handling — but did not touch the now-dead CSS, Hero's fallback, the `theme-color` metas, `color-scheme`, or CLAUDE.md. So the *current* intent is "light by default, dark only via toggle" — that is a legitimate editorial choice, but it was implemented halfway.
- Fix — pick one and make every layer agree:
  - **Option A (respect OS + toggle + remember; my recommendation given the owner cares about dark mode):**
    1. Remove `data-theme` from `<html>`.
    2. First thing in `<head>`, one blocking inline script (must stay inline to avoid FOUC; it is ~200 bytes and hashable for CSP):
       ```html
       <script>(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();</script>
       ```
    3. CSS: only `:root{…light…}` and `[data-theme="dark"]{…dark…}` (A4). Drop all `@media (prefers-color-scheme)` blocks.
    4. Nav toggle: flip attribute, `localStorage.setItem('theme', next)`, set `aria-pressed`, and **update `theme-color`**: keep one `<meta name="theme-color">` (no `media`) and set its `content` from `palette` — expose `light.themeColor/dark.themeColor` via `define:vars` or `data-` attributes.
    5. Listen to `matchMedia('(prefers-color-scheme: dark)').onchange` and follow it only when no stored preference exists.
    6. Keep `<meta name="color-scheme" content="light dark">` — it is now truthful.
    7. Hero: `isDark()` becomes `dataset.theme === 'dark'`; the MutationObserver already handles the rest.
  - **Option B (keep "light unless toggled"):** delete the dead media-query CSS (A4), change `color-scheme` meta to `light`, collapse to a single `theme-color` meta whose content Nav updates on toggle, delete Hero's `matchMedia` branch, and correct CLAUDE.md ("Theme toggle: dark mode from OS preference") — it currently documents behaviour that doesn't exist.
  - Either way: ~40 lines net deletion, one small script addition, and CLAUDE.md/work-tracking updated in the same commit per the repo's own doc rules.

**T2 — `theme-color` never reflects the toggled theme (subset of T1, calling out separately because it is user-visible on iPhone).** — *Medium, effort S* — covered by T1 step 4.

### 3. JavaScript quality

**J1 — Hero colour cycle ignores `prefers-reduced-motion`, and the CSS opt-out is defeated by inline styles.** — *Medium, effort S*
- Evidence: `Base.astro:398-402` neutralises `line-reveal` for reduced-motion. But `Hero.astro:192` sets `el.style.animation = 'scan-wipe 1.0s …'` **inline**, which outranks the `animation: none` rule, and `Hero.astro:90-99` applies `-webkit-text-fill-color: transparent` + `background-clip: text` while `.is-scanning`. So a reduced-motion user still sees "Eric" sweep colours every 4 s for their whole visit. No `prefers-reduced-motion` or `visibilityState` reference exists anywhere in `src/` (grep confirmed).
- Fix: at the top of the IIFE, `var rm = matchMedia('(prefers-reduced-motion: reduce)'); if (rm.matches) return;` after setting the initial colour (or cross-fade `color` with a 300 ms transition instead of the scan). Also `document.addEventListener('visibilitychange', …)` to clear/restart the interval, and keep the `setInterval` handle so it can be cleared. The MutationObserver never disconnecting is fine for a single-page site — note only.

**J2 — Six inline IIFEs; consolidate into one bundled module + one tiny pre-paint script.** — *Low, effort M*
- Evidence: built `dist/index.html` has 6 `<script>` blocks (7.4 KB) — GA loader, scroll-progress, reveal observer (`Base`), theme toggle, active-nav (`Nav`), colour cycle (`Hero` via `define:vars`).
- Only the theme pre-paint script (T1) needs to be inline. Everything else can be a normal Astro `<script>` (no `is:inline`) → Astro bundles it into one `/_astro/*.js`, which is cacheable, hashed, and makes a strict CSP (`script-src 'self' 'sha256-<prepaint>' https://www.googletagmanager.com`) trivial. `define:vars` can be replaced by `data-cycle-light/dark` attributes on `#top` (JSON) read by the module — this also side-steps the astro `define:vars` XSS advisory class (GHSA-j687-52p2-xcff; not exploitable here because the data is trusted, but one fewer thing to reason about).
- Shared constants: `NAV_H = 60` in `Nav.astro:64` duplicates `height: 60px` in `Nav.astro:104,115`; expose `--nav-h: 60px` from the palette-var block and read it with `getComputedStyle` once, or simply use `scroll-padding-top: var(--nav-h)` on `html` (currently **absent** — anchor jumps land the section's top edge under the fixed nav; only the section's own 60px padding saves it).

**J3 — Scroll-progress `docHeight` cache can go stale.** — *Low, effort S*
- Evidence: `Base.astro:216-239` caches `scrollHeight - innerHeight` in one rAF after the script runs, then only on `resize`. Nothing recomputes on `load`, `document.fonts.ready`, or when reveal transitions finish. In practice risk is small (fonts are preloaded with `font-display: swap` — a metric-different fallback can still shift hero height; Astro `<Image>` sets width/height so lazy logos don't shift; reveals use transform only). I could not measure a visible error, but the fix is one line: `new ResizeObserver(function(){cacheDocHeight();updateProgress();}).observe(document.documentElement)` (replaces the `resize` listener too).

### 4. Build & deploy

**B1 — `npm run build` regenerates committed icons on every deploy.** — *Low (verified harmless), effort S*
- Measured: ran `npm run build`; `git hash-object` for `favicon.svg/png`, `icon-192/512/1024`, `apple-touch-icon*` identical to `HEAD` before and after → satori+resvg output is byte-stable, no nondeterministic diffs. But the step is pure redundancy: Cloudflare's build can't commit, so it only ever recreates what's already in git. Recommend: remove `gen:icons` from `build`, and in CI run `npm run gen:icons && git diff --exit-code public/` so a `palette.ts` icon change that forgot to regenerate fails the PR.

**B2 — `public/og-image.png` is a stale Typedream-era screenshot silently overwritten by the route.** — *Medium, effort S*
- Measured: `public/og-image.png` is 690×431 RGBA, white top bar, black hero, "Hi, I'm Eric 👋" + 3D coffee mug (viewed it). `src/pages/og-image.png.ts` emits 1200×630 cream card; `dist/og-image.png` = 21,620 B = exactly what the live site serves (`content-length: 21620`). Astro copies `public/` first and the endpoint overwrites, with **no warning** in the build log (grep of the full log for `warn|error|og-image` shows only the route line). So the dynamic route wins today, but the moment someone renames the route the 2018-style image resurfaces. Delete the static file.
- Doc drift: CLAUDE.md "OG Image: dark card (`#0D0D0B`)" is wrong — code uses `light.bgPrimary` (cream), and `work-tracking.md` correctly says cream. Fix CLAUDE.md.

**B3 — `astro.config.mjs` dev-server settings are wrong/leaky; `site` logic targets the wrong platform.** — *Medium, effort S*
- `vite.server.allowedHosts: ["all", "erics-macbook-pro"]` — Vite accepts `true` or an array of hostnames; `"all"` is not a keyword, it is just a hostname literal, so it does nothing, and the array leaks a machine name into a public repo. `server.host: true` binds the dev server to all interfaces (LAN-exposed) by default for everyone who runs `npm run dev`. Fix: remove both; if LAN testing on a phone is wanted, run `astro dev --host` ad hoc (the gitignored `dev.sh` suggests that's already the pattern).
- `site` picks `CF_PAGES_BRANCH/CF_PAGES_URL`, but the deploy config is a **Workers static-assets** project (`wrangler.json` has `assets.directory`, no `pages_build_output_dir`). Workers Builds exposes `WORKERS_CI_BRANCH`, not `CF_PAGES_*`, so the branch check is dead and every preview build claims `https://ericqiu.dev` as canonical/sitemap. Harmless for prod, misleading for previews. CLAUDE.md says "Cloudflare Pages" throughout — one of the two is wrong (question Q1).

**B4 — `_headers` is partially overridden by the zone, and content-hashed assets are under-cached.** — *Medium, effort S*
- Measured live: `/favicon.png?v=2` → `cache-control: public, max-age=14400, stale-while-revalidate=86400` (repo says `max-age=3600`); `/icon-512.png` same; `/_astro/index.Do_iR_ZY.css` → `public, max-age=14400, must-revalidate`; `/profile.jpg` (391 KB) → `max-age=14400`; HTML → `max-age=0, must-revalidate`. The surviving `stale-while-revalidate=86400` proves `_headers` is applied, but the zone's Browser Cache TTL (4 h default) floors `max-age`. Consequences: the `_headers` icon TTL comment is aspirational, and every return visit after 4 h revalidates the hashed CSS/JS/images, which is the one thing that should be `immutable`.
- Fix: add to `_headers`:
  ```
  /_astro/*
    Cache-Control: public, max-age=31536000, immutable
  /fonts/*
    Cache-Control: public, max-age=31536000, immutable
  ```
  (both are content-addressed / never change in place), and either set the zone's Browser Cache TTL to "Respect existing headers" or drop the icon max-age lines and rely on `?v=N` (which is what actually works today). The `Cache-Control` in `og-image.png.ts:169-171` is ignored in static output (route becomes a file) — remove the header to avoid implying it does something.

**B5 — `wrangler.json`: stale `compatibility_date`, meaningless flags for an assets-only Worker.** — *Low, effort S*
- `compatibility_date: 2025-02-21` (18 months old), `nodejs_compat` and `observability.enabled` — there is no `main` script, so no code runs at the edge; the flags are inert. Bump the date when touching the file; remove the flags to avoid implying there's a Worker. `.node-version` = 22 matches the local toolchain (v22.22.2) and is honoured by Workers Builds/Pages. `package-lock.json` (lockfileVersion 3) is in sync with `node_modules` (`npm ls` clean); no `engines` field — add `"engines": {"node": ">=22"}`.

**B6 — No CI, no type check, no lint/format.** — *Medium, effort S–M*
- `.github/` does not exist; PRs #2–#6 in the log were merged without any check. `tsconfig.json` extends `astro/tsconfigs/strict` but `@astrojs/check` is not installed — I ran `npx astro check` and it stopped at the install prompt (`npm i @astrojs/check typescript`), which I did not accept (read-only session). `typescript` is present only transitively. No Prettier/ESLint/`.editorconfig`; the codebase is consistent anyway, but `prettier-plugin-astro` would lock that in for free.
- Fix (S): one workflow — `npm ci && npx astro check && npm run build` on PR + push; add `astro check` to `package.json` (`"check": "astro check"`, and `"build": "astro check && astro build"` if he wants it blocking). Add Dependabot (`.github/dependabot.yml`, npm, weekly, grouped) so B7 doesn't recur. Optional: Lighthouse CI or `unlighthouse` on the preview URL, and `lychee` for link checking (which would have flagged the `ericqiu.io` destination drift the brief mentions).

**B7 — Dependencies: 5 months stale, 19 advisories (16 high) in the toolchain.** — *Medium, effort S (safe part) / M (Astro major)*
- Exact `npm outdated` output:
  ```
  Package           Current   Wanted   Latest
  @astrojs/sitemap    3.7.0    3.7.4    3.7.4
  astro              5.17.3   5.18.2    7.3.1
  satori             0.19.2   0.19.3   0.33.4
  tsx                4.21.0  4.23.13  4.23.13
  wrangler           4.67.0  4.129.1  4.129.1
  ```
- `npm audit --omit=dev`: 19 vulnerabilities (1 low, 2 moderate, 16 high). Notables: `astro <=7.0.9` — 9 advisories (define:vars XSS GHSA-j687-52p2-xcff, spread-attr XSS GHSA-jrpj-wcv7-9fh9 / GHSA-f48w-9m4c-m7f5, slot-name XSS GHSA-8hv8-536x-4wqp, view-transition XSS ×2, server-island replay, host-header SSRF, allowlist bypass); `h3 <=1.15.8` path traversal ×2 + SSE injection ×2; `devalue <=5.8.0` prototype pollution ×3; `defu` prototype pollution; `js-yaml` DoS ×3; `esbuild` dev-server file read (Windows); `fflate` infinite loop.
- Honest risk read: this is a fully prerendered static site with no server, no user input and no islands, so none of these are reachable at runtime; the exposure is build-time/dev-server only. Still, `npm audit fix` (non-breaking) clears defu/devalue/h3/js-yaml/fflate, and `astro@5.18.2` is a patch away. Astro 7 is two majors ahead — schedule as a bigger bet (B-bet 3). `wrangler` is 62 minor versions behind; harmless (not used at runtime) but bump it.

### 5. Repo hygiene

**R1 — Lab pages and orphaned assets are published to production.** — *High (for a site whose value is curated presentation), effort S*
- Measured live (2026-09-07): `/palette-preview.html` → 308 → `/palette-preview` **200 (114 KB)**; likewise `/_lab` (10.5 KB), `/hero-anim` (20 KB), `/font-preview` (12.6 KB), `/palette-sections` (30 KB), `/palette-multicolour` (65 KB); `/icon-palette/eq-amber-light.png` 200; `/coffee-3d.png` 200 (254 KB); `/logos/bmo.png` 200 (49 KB). None carry `<meta name="robots" content="noindex">`; `robots.txt` allows everything; they are simply absent from the sitemap. Every lab page `<link>`s `fonts.googleapis.com` (six pages), i.e. a third-party request the production page deliberately eliminated in `9263a59`.
- Tracked-size accounting: `public/` in git is 3.1 MB; unreferenced by the site: `icon-palette/` 1.4 MB (112 PNGs), `coffee-3d.png` 254 KB, `logos/*.png` 272 KB (duplicates of `src/assets/logos/*.webp`; last referenced in `2322bc9`), lab HTML/JS/CSS ≈ 300 KB, `og-image.png` 56 KB (B2). Plus `src/assets/inter-bold.ttf` 326 KB (CLAUDE.md itself says "kept, unused"). `profile.jpg` 391 KB for a 77 px avatar is referenced but oversized (performance lane).
- CLAUDE.md drift: says `icon-palette/ — gitignored`; `1c08479` deliberately removed that line from `.gitignore` and committed 100 icons (now 112). Also says gen-icon-palette "generates 28 EQ icons" — it generates 112.
- Fix: move `public/_lab*`, `public/*.html`, `public/icon-palette/` to a root-level `lab/` directory (outside `public/`, so Astro never copies it; open via `npx serve lab` or `file://` — they already don't depend on the dev server). Update `_lab.html` links and CLAUDE.md/palette-notes. Delete `coffee-3d.png`, `public/logos/`, `public/og-image.png`, `src/assets/inter-bold.ttf`, `ExperienceCard.astro`; move `PLAN.md` content to `.claude/memory/` (it is already summarised in `work-tracking.md`) or delete. If he *wants* the lab reachable at a URL for sharing from his phone, keep it under `public/lab/` and add `/lab/*  X-Robots-Tag: noindex` in `_headers` — but then also self-host the fonts there (they are already in `public/fonts/`).

**R2 — Missing repo scaffolding.** — *Low, effort S*
- No `README.md` (CLAUDE.md doubles as one, but GitHub visitors — the stated audience includes engineering peers — see nothing), no `LICENSE` (content vs code split: e.g. MIT for code, "all rights reserved" for copy/photos), no `.editorconfig`, no `.prettierrc`. `font-preview.html` is not in CLAUDE.md's file tree (it is in `palette-notes.md`).

### 6. Security hygiene

**S1 — No CSP / HSTS / Permissions-Policy / frame-ancestors.** — *High (cheap, standard), effort S for headers, M for a strict CSP*
- Measured live: response headers are `cache-control`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `server: cloudflare`, `cf-*`. **No** `strict-transport-security` (Workers assets don't add it; it must be enabled in the dashboard under SSL/TLS → Edge Certificates → HSTS, or emitted from `_headers`). Note: `.dev` is on the browser HSTS preload list, so browsers already refuse plain HTTP to ericqiu.dev — the header is still worth sending for non-browser clients and scanners, but it is not the emergency it would be on a `.com`. No `content-security-policy`, `permissions-policy`, `x-frame-options`.
- Inventory for CSP (from `dist/index.html`): 6 inline `<script>` (7,385 B), 1 inline `<style>` (2,192 B, the palette vars), 1 external CSS, 10 `style=""` attributes, JSON-LD script, GA loader that injects `https://www.googletagmanager.com/gtag/js` (which then talks to `https://*.google-analytics.com` / `https://*.analytics.google.com`), fonts from `'self'`, images from `'self'` only.
- Fix, staged:
  1. Now (S), append to `public/_headers` under `/*`:
     ```
     /*
       Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
       X-Frame-Options: DENY
       Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
       Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'; object-src 'none'; upgrade-insecure-requests
     ```
     Report-Only costs nothing and shows console violations while he iterates. (Cloudflare `_headers` applies to Workers assets as well as Pages.)
  2. Then (M), after J2 consolidates scripts into one bundled module: `script-src 'self' 'sha256-<theme-prepaint-hash>' https://www.googletagmanager.com` (drop `'unsafe-inline'`), and after A5 removes the inline `style=` attributes: `style-src 'self' 'sha256-<palette-style-hash>'`. The hashes are stable per build; a 10-line postbuild script can read `dist/index.html`, hash the inline blocks and rewrite `dist/_headers`. Then flip to enforcing.
  3. `<meta name="generator" content="Astro v5.17.3">` advertises a version with nine public advisories; trivial to drop (remove the tag from `Base.astro:103`). Cosmetic.
- Verified fine: all 12 `target="_blank"` anchors carry `rel="noopener noreferrer"` (the two grep "misses" were multi-line attributes; `Footer.astro:42` composes `me noopener noreferrer`). `set:html` is used twice with build-time trusted data (palette CSS, `JSON.stringify` JSON-LD) — fine. No secrets: grep for key/token/secret/password across the tree hits only the word "token(s)" in palette docs. GA measurement ID exposure is normal.

### 7. Correctness nits

- **C1** `og-image.png.ts:169-171` `Cache-Control` is dead in static output (live serves the zone default 14400) — remove or move to `_headers`. *Low, S*
- **C2** `manifest.json.ts:19` `{ sizes: "any", type: "image/png", purpose: "any maskable" }` — `sizes: "any"` is only meaningful for SVG; and the combined `"any maskable"` value is discouraged (Lighthouse/PWABuilder warn) because a maskable-safe icon looks small as an `any` icon. I measured the 512 px render: glyph bbox 70 % × 44 % of canvas; **0 glyph pixels fall outside the 40 %-radius maskable safe circle**, so it *is* maskable-safe (the `.` sits at r≈204 px vs safe r=205 — right on the line). Split into two entries (`purpose: "any"` and `purpose: "maskable"`) and give the maskable variant ~10 % more padding in `gen-icons.ts` (e.g. `FONT_SIZE 224`). *Low, S*
- **C3** Favicon `?v=2` + `_headers` 3600 s: the `?v=` bust is the mechanism that actually works (B4 shows max-age is floored to 14400 anyway). Keep `?v=N`, stop pretending the TTL is 1 h. *Low, S*
- **C4** `Footer.astro:8` `const year = new Date().getFullYear()` is baked at build; last deploy was 2026-04-27, so on 2027-01-01 the site says "© 2026" until the next push. Cheapest fix: drop the year ("© Eric Qiu" is common on editorial sites) or make it a 40-byte inline `<script>` (would need a CSP hash) or accept it. *Low, S*
- **C5** `index.astro:166` `widths={[180,360]} sizes="180px"` while `@media (max-width:640px)` caps the logo at 140 px → phones fetch the 360 w for ≥2× DPR when 280 w would do (~20 % over-fetch per logo; six logos). Use `sizes="(max-width: 640px) 140px, 180px"`. *Idea, S*
- **C6** `EducationCard.astro:27-36` renders both Waterloo logos and hides one with `display:none`; with `loading="lazy"` the hidden one is never fetched (no box → never intersects), so it's correct today, but it silently becomes a double download if anyone removes `loading="lazy"`. A comment or a `data-theme`-driven `src` swap in the toggle script is more robust. *Idea, S*
- **C7** `loading="lazy"` on above-the-fold: none — Hero has no images; the first Bloomberg logo can be in the initial viewport on tall desktop screens but it is decorative and not an LCP candidate. Fine.
- **C8** `html { scroll-behavior: smooth }` with no `scroll-padding-top` (J2) and the nav toggle `aria-label="Toggle dark mode"` without `aria-pressed` — noted for the a11y reviewer.

---

## Measured outputs (verbatim)

**Build** (`npm run build`, Node v22.22.2, npm 10.9.7): exit 0, 1.87 s, no `warn`/`error` lines. Only `og-image` mention:
```
20:59:04 λ src/pages/og-image.png.ts
20:59:04   └─ /og-image.png (+278ms)
```
Output: `dist/` 3.1 MB (of which `icon-palette/` 1.4 MB); `dist/index.html` 35,130 B; 6 inline `<script>` (7,385 B) + 1 inline `<style>` (2,192 B) + 1 external CSS; sitemap contains exactly one URL (`https://ericqiu.dev/`). Icons regenerated byte-identical to HEAD (see B1).

**npm outdated** — see B7 table. **npm audit --omit=dev** — see B7; summary line: `19 vulnerabilities (1 low, 2 moderate, 16 high)`; `npm audit fix` (non-forced) fixes defu, devalue, fflate, h3, js-yaml; astro/esbuild/sharp require the major bump.

**astro check**: not runnable — `@astrojs/check` not installed (prompted to `npm i @astrojs/check typescript`; declined in read-only session).

**Live headers** (`curl -I https://ericqiu.dev/`): `cache-control: public, max-age=0, must-revalidate`, `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `server: cloudflare`, `cf-cache-status: DYNAMIC`. Absent: HSTS, CSP, Permissions-Policy, X-Frame-Options. `/og-image.png` 21,620 B (= dist, dynamic route wins). `/_astro/*.css` and `/profile.jpg`: `max-age=14400`. Lab pages: all 200 at extensionless URLs.

---

## Quick wins (≤1 h each)

1. Delete dead files: `public/og-image.png`, `public/coffee-3d.png`, `public/logos/`, `src/assets/inter-bold.ttf`, `src/components/ExperienceCard.astro`, `PLAN.md` (fold into memory). (~1 MB out of git/prod.)
2. Move `public/*.html`, `public/_lab*`, `public/icon-palette/` → `lab/` outside `public/` (or add `X-Robots-Tag: noindex` for `/lab/*` if kept online). (R1)
3. Add security headers block + `Content-Security-Policy-Report-Only` + `/_astro/*` and `/fonts/*` `immutable` to `public/_headers`. Enable HSTS in the Cloudflare dashboard. (S1, B4)
4. `npm audit fix && npm i astro@^5.18 @astrojs/sitemap@latest wrangler@latest tsx@latest`; add `@astrojs/check typescript` and a `check` script. (B7, B6)
5. `astro.config.mjs`: remove `server.host` and `vite.server.allowedHosts`. (B3)
6. `Hero.astro`: early-return on `prefers-reduced-motion`, pause on `visibilitychange`. (J1)
7. `index.astro`: drop the redundant `<Base title/ogTitle/description>` props; `Footer.astro`: use `site.footerBio`. (A2, A1-lite)
8. `.github/workflows/ci.yml`: `npm ci`, `astro check`, `npm run build`; `.github/dependabot.yml`. (B6)
9. Fix CLAUDE.md claims: dark-mode-from-OS, OG "dark card", icon-palette "gitignored", "28 icons", "Cloudflare Pages" vs Workers; add `font-preview.html`, `lab/`. (Repo's own doc rules require this in the same commit as the code changes.)
10. `manifest.json.ts`: split `any` / `maskable` entries; remove `Cache-Control` from `og-image.png.ts`. (C1, C2)

## Bigger bets

1. **Coherent theme system (T1 Option A + A4 + J2)** — pre-paint script, single `[data-theme=dark]` block, persisted toggle that also drives `theme-color`, one bundled JS module. Net negative LOC, fixes a visible iPhone bug, and unlocks a strict CSP. Effort M (half a day including doc updates).
2. **Typed content module (A1)** — `src/content.ts` feeding index, JSON-LD and footer; groundwork for the backlog's projects/résumé items. Effort M. Upgrade to Content Collections only when a second content type (blog/projects) exists.
3. **Astro 7 migration** — two majors; satori 0.33 also. Do after CI exists so the diff is verifiable; the surface area here is tiny (one page, two endpoints, `Image`, sitemap), so expect an hour or two, mostly reading changelogs. Effort M.
4. **Enforcing CSP with hashes** — after (1) and A5; a postbuild script that hashes the two remaining inline blocks and writes `dist/_headers`. Effort M.

## Open questions for Eric

- **Q1 Platform:** CLAUDE.md says Cloudflare Pages; `wrangler.json` is a Workers static-assets config and `astro.config.mjs` reads `CF_PAGES_*`. Which is it actually deployed on today? (Determines whether `site` env logic and the `nodejs_compat`/`observability` flags matter, and where HSTS gets enabled.)
- **Q2 Theme intent:** `1c08479` deliberately suppressed OS dark mode. Is "light by default, dark only if you click" still the intent, or was that a stop-gap while the dark palette was being tuned? (T1 Option A vs B.)
- **Q3 Lab pages:** do you want them reachable on the internet (e.g. to open on your phone / share with a reviewer), or are they purely local tooling? (Decides `lab/` outside `public/` vs `public/lab/` + noindex.)
- **Q4 Analytics:** is GA4 worth its cost here (third-party script, CSP complexity, consent posture for EU visitors)? Cloudflare Web Analytics is cookieless, first-party, and free on this plan — would you switch?
- **Q5 Should the toggle persist?** `5cb0ac8` removed persistence on purpose; was that about avoiding localStorage/"cookie" semantics, or about a FOUC bug that the pre-paint script would have fixed?
- **Q6 Do you want the design lab, icon-palette PNGs and old assets kept in git history only, or archived somewhere else before deletion?**

## Cross-cutting notes for the synthesizer

- The theme bug (T1) is the single finding most likely to be *seen* by the target audience (any recruiter on an iPhone in dark mode gets mismatched chrome). It overlaps with design/a11y reviewers.
- `profile.jpg` (391 KB for 77 px) and lab-page Google Fonts are performance-lane items; I only confirm sizes/reachability here.
- `ericqiu.io` "Chat with me" destination and JSON-LD `jobTitle` accuracy are content-lane items; from the engineering side, A1 is what makes them a one-line fix in future.
- Everything above is consistent with the repo's own documentation-maintenance rules: any of these changes should update `CLAUDE.md` and `.claude/memory/work-tracking.md` in the same commit.
