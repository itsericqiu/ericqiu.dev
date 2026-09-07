# ericqiu.dev — Site Audit & Improvement Plan (September 2026)

**Status:** Plan only. No production code was changed in this pass.
**Method:** One orchestrator combed the repo, git history, memory notes, live site, and the linked domains, then seven specialist reviewers worked in parallel — performance, accessibility, SEO/metadata, content strategy, visual design, engineering/security, and a hiring-manager/recruiter lens. Everything below was measured or read from source; where a reviewer inferred rather than measured, it says so. The full per-lane reports are in `reports/`.

---

## 0. Read this first

**The site is technically excellent and strategically under-delivering.** Lighthouse is 98/100 mobile, 100 desktop; CLS ≈ 0; TBT 0; the type system (Fraunces / Instrument Sans / Space Mono) is a confident editorial pairing. Six months of effort went into palette exploration, a hero animation, and a design lab — while the copy still leads with "Coffee Addict", the primary CTA links to a dead 2018 page, five of six work entries are four-month co-ops, and the only image on a photographer's site is a 77px illustrated avatar.

Every reviewer, independently, converged on the same conclusion: **content and identity are the bottleneck, not craft.** Further palette or animation iteration has negative marginal return until Work, Contact, and Projects are fixed.

Three things need attention before anything else, because they are actively harming rather than merely underperforming:

| # | Issue | Why it's urgent |
|---|---|---|
| 1 | **This repo is public** and pins first on Eric's GitHub. `.claude/memory/*` (including reviewer critique of his own copy), `PLAN.md`, and this audit are readable by anyone. | A recruiter following the GitHub link sees the sausage being made. |
| 2 | **"Chat with me →" sends visitors to `ericqiu.io`** — a 2018 Netlify page whose meta description says "Software Engineering Student" and whose only content is a chat bubble linking back to ericqiu.dev. | The site's primary conversion action reads as broken. |
| 3 | **OS dark mode is dead.** `<html data-theme="light">` is hard-coded, so every `prefers-color-scheme: dark` rule is unreachable, yet `theme-color` metas still follow the OS — dark-mode iPhones paint a black browser chrome around a cream page. | Visible on the audience's primary device; contradicts CLAUDE.md. |

---

## 1. Background: what the site is for and how it got here

**Owner.** Eric Qiu, Senior Software Engineer, Software Infrastructure at Bloomberg LP (managed multi-tenant distributed services used by 300+ teams). University of Waterloo CS 2016–2021 with a POSTECH exchange; co-ops at Addepar, Postmates, Bloomberg (2018, ML for options vol surfaces), BMO Capital Markets, LCBO. From Hamilton, Ontario; in New York City since 2021. Photographer (Fujifilm X100VI; a real 47-photo Astro site at photos.ericqiu.io), pour-over coffee, reading. GitHub shows active 2026 side projects the site never mentions: `home-stack` (Go, Tailnet + Caddy), `uscis-caselens` (userscript with a threat model and proper README), `gallery-next` (the photo site), `home-portal`, `homelab`.

**Purpose.** A designed résumé and identity landing page. Audience, inferred: recruiters and hiring managers arriving from LinkedIn, engineering peers, people he meets in NYC, Instagram followers. There is no blog, no projects section, no résumé PDF, no quantified outcomes beyond "300 teams."

**Timeline, from git history and memory notes.**
- **Feb 2026** — the site was an Astro replica of an older Typedream page (cards, coffee-mug illustration). On 2026-02-28 it was redesigned in one intensive day into the current "editorial typographic concept."
- **Mar 2026** — a large design-lab effort: ~96 palettes across four lab HTML pages, a dual-accent token system, a six-hue "letter-seg" hero animation, icon colour flip-flop (amber → navy → amber). Result: amber/cream retained; the animation shipped; `--accent-2` wired but identical to `--accent`. The palette decision (Approach 1/2/3 in `palette-notes.md`) was never made.
- **Apr 2026** — performance pass: self-hosted WOFF2, deferred GA4, rAF-throttled scroll, scroll-spy nav. Last commit 2026-04-27.
- **May–Sep 2026** — nothing on this repo, while GitHub activity on other projects continued through 2026-09-05. The site is four months behind the person.

**What Eric demonstrably cares about** (and this plan respects): typography and palette craft, tasteful motion, iPhone performance, dark mode, single sources of truth (`site.ts`, `palette.ts`), and keeping `CLAUDE.md` / `.claude/memory/` current.

**Known open backlog** in `work-tracking.md` already contains several of the right items (merge Bloomberg entries, differentiate co-ops, cut "DR-1 Compliance", résumé PDF, rewrite BMO/Bloomberg-2018 copy). They sat open while colour-direction items got the attention. This plan inverts that priority.

---

## 2. Measured baseline

| Measure | Result | Source |
|---|---|---|
| Lighthouse mobile (sim. Moto G, slow 4G) | Perf **98** · A11y 96 · BP 96 · SEO 100 | `reports/report-performance.md` |
| Lighthouse desktop | Perf **100** · A11y 96 · BP 96 · SEO 100 | same |
| LCP mobile / desktop | 2.5 s / 0.5 s — element is the word "Eric"; **0.77 s of it is entrance-animation render delay** | same |
| CLS / TBT | ≈ 0 / 0 ms | same |
| First-load transfer | 261 KiB, 14 requests; fonts are 199 KB (76%) | same |
| Hero cycle CPU cost | ~2–4% of a core continuously; still painting when scrolled off-screen; still running under `prefers-reduced-motion` | same |
| axe-core violations | **1 rule, 7 nodes**: `--text-muted #828078` on cream = 3.49:1 (needs 4.5) | `reports/report-accessibility.md` |
| Print / no-JS | Work section and tech stack render **blank** (opacity 0 awaiting IntersectionObserver); PDF page 2 is empty | same |
| Desktop fold (1440×900, 1024×768, 390×844) | No work entry is visible at load; the fold ends on an orphaned "01 WORK" label with blank space (first entry misses the reveal threshold by 11px) | `reports/report-design.md` |
| Unreferenced files shipped to prod | ~2.06 MB (67% of `dist/`): `icon-palette/` 1.4 MB, `logos/*.png`, `coffee-3d.png`, stale `og-image.png`, lab pages | performance + engineering |
| Security headers (live) | No CSP, no HSTS, no Permissions-Policy, no frame-ancestors | `reports/report-engineering.md` |
| Cache headers (live) | `_astro/*` and `/fonts/*` served `max-age=14400, must-revalidate` instead of a year + `immutable`; `_headers` icon TTLs overridden by the Cloudflare zone | performance + engineering |
| 404 handling | Every unknown URL returns the homepage with HTTP 200 (site-wide soft 404); no `404.astro` | `reports/report-seo.md` |
| Live robots.txt | Cloudflare-managed block prepended: `Disallow: /` for ClaudeBot, GPTBot, Google-Extended, CCBot, Applebot-Extended, Bytespider, etc. — invisible from the repo | same |
| Google for `"Eric Qiu" Bloomberg` | #1 LinkedIn · #4 ericqiu.dev · #6 the stale ericqiu.io ("Student" snippet) | same |
| Dependencies | astro 5.17.3 (5.18.2 patch available; 7.3.1 latest); `npm audit`: 19 advisories, 16 high, all build/dev-time for a prerendered site | engineering |
| CI | None. No `astro check`, no build on PR, no Dependabot | engineering |
| JSON-LD | `logo` is not a valid Person property; no `@id`, no `WebSite`/`ProfilePage`; `sameAs` missing photo site and X | SEO |
| Title consistency | "Senior Software Engineer" ×7 and bare "Software Engineer" ×8 in `dist/index.html`; the OG card and kicker are the *un*-senior version | content + career |

---

## 3. Consolidated findings

Deduplicated across all seven lanes. Severity reflects impact on the site's actual job (getting Eric the next conversation), not abstract best practice. Effort: **S** ≤ 1 h · **M** half-day · **L** multi-day.

### 3.1 Actively broken or harmful (fix regardless of any other decision)

| ID | Finding | Sev | Effort | Lanes |
|---|---|---|---|---|
| B1 | Public repo exposes `.claude/memory/*` self-critique, `PLAN.md`, and this audit via Eric's first pinned GitHub repo | High | S | career, eng |
| B2 | "Chat with me →" → stale `ericqiu.io` (2018, "Student", dead UA analytics, links back here) | Critical | S | content, career, SEO |
| B3 | OS dark mode unreachable; `theme-color` metas and `color-scheme` still follow OS → mismatched chrome; ~45 lines of dead CSS; Hero/Nav/Base disagree on what "dark" means | High | M | eng, perf, a11y, design |
| B4 | Work section invisible in print and without JS (reveal starts at `opacity:0`) | High | S | a11y |
| B5 | `light.textMuted #828078` fails AA (3.49:1) in 7 places including the hero aside and "6+ years" | High | S | a11y, perf, design |
| B6 | Desktop/mobile fold ends on an orphaned "01 WORK" label — first employer invisible at load (reveal threshold 5% vs 4.1% visible) | High | S | design |
| B7 | Hero colour cycle ignores `prefers-reduced-motion` (inline `el.style.animation` out-ranks the CSS opt-out), never pauses when hidden or off-screen, runs forever (WCAG 2.2.2) | Medium | S | a11y, perf, eng, design |
| B8 | Nav breaks below 390px: at 360 "EQ." touches "Work"; at 320 the theme toggle is off-canvas | High | S | design |
| B9 | `public/og-image.png` is the 2023 Typedream coffee-mug card, silently shadowed by the dynamic route — one route rename away from shipping | Medium | S | SEO, design, eng |
| B10 | Site-wide soft 404 (unknown URLs → 200 + homepage) | High | S | SEO |
| B11 | Cloudflare-managed robots block excludes all AI retrieval crawlers from a personal-brand site (LinkedIn and the stale `.io` answer "who is Eric Qiu" instead) | High | S (dashboard) | SEO |
| B12 | Six lab pages + `icon-palette/` + dead PNGs + `inter-bold.ttf` are deployed, crawlable, and load Google Fonts (undoing self-hosting) | High | S–M | eng, perf, SEO, career |
| B13 | No security headers beyond Cloudflare defaults; `meta generator` advertises Astro 5.17.3 which has 9 advisories | High | S | eng |
| B14 | Hashed assets and fonts under-cached (4 h revalidate instead of immutable) | Medium | S | perf, eng |
| B15 | Entrance animation adds ~0.7 s to LCP on every device | Medium | S | perf |
| B16 | JSON-LD `Person.logo` invalid; `og:image` lacks width/height/alt; no `og:site_name`; duplicated `<Base>` props drift from `site.ts` | Medium | S | SEO, eng |
| B17 | `Footer.astro` hard-codes the bio; `site.footerBio` is never imported — `site.ts` is not the single source of truth it claims | Low | S | content, eng |
| B18 | Theme toggle: 16×16 hit area, no `aria-pressed`, static label; headings announce "01Work"; schools are `<p><strong>` not `<h3>`; no `scroll-padding-top` | Medium | S | a11y |
| B19 | `astro.config.mjs`: `allowedHosts: ["all", ...]` is a no-op that leaks a machine name; `server.host: true` LAN-exposes dev; `site` keys off `CF_PAGES_BRANCH` but `wrangler.json` is a Workers-assets config (preview deploys would claim the prod canonical) | Medium | S | eng, perf |
| B20 | Fraunces static TTFs for satori are instanced at **opsz=9** ("Fraunces 9pt Black") — the OG image and every favicon use the text cut, not the display cut the site uses | Medium | S | design |

### 3.2 Positioning and content (the highest-leverage work)

| ID | Finding | Sev | Effort | Lanes |
|---|---|---|---|---|
| C1 | Kicker "Software Engineer // Coffee Addict // New York City" leads the page *and* the OG card; "Senior" appears nowhere above the fold; the only scale number (300+ teams) is buried in a 41-word sentence | High | S | content, career |
| C2 | Six equal-weight Work entries, five of them 4-month co-ops from 2017–2020 — the page reads new-grad; the Bloomberg 2020 co-op has no description; the 2018 co-op has its own entry | High | M | content, career, design |
| C3 | Internal jargon: "DR-1 compliant", "Global Data", "Data Cognition desk", "Symphony messages", "FICC" — meaningless outside Bloomberg and a possible comms-policy risk | Medium | S | content, career |
| C4 | Overclaims and deflators: "Architected and led multi-developer team" as a 4-month intern; "Assisted"; "Prototyped proof-of-concept"; "blockchain… analogous to ICOs" (2018 framing) | Medium | S | content, career |
| C5 | "Candidate for Bachelor of Software Engineering 2016–2020" reads as an unfinished second degree | Medium | S | all content lanes |
| C6 | "6+ years of experience" matches nothing (5 y 3 m full-time; 9 y span including co-ops) | Medium | S | content, career |
| C7 | Hobbies mentioned 5–6 times in ~600 words (coffee ×4, photography ×5), always apologetically ("also", "there's a … side too", "outside work") — dilutes; the photo site is a shipped product mis-filed as a hobby aside | Medium | S | content, career, design |
| C8 | Obfuscated `hello[at]ericqiu[dot]io`: not a link, screen-reader noise, on the domain being retired; anti-scraping value ≈ 0 (the legacy site's JSON-LD already publishes the address in plain text) | Medium | S | content, a11y, career |
| C9 | Education is a first-class section with crests and course lists five years after graduation | Medium | M | content, career, design |
| C10 | "What I Do" tech rows contain two non-technologies (DR-1 Compliance, HCI) and a wrong counter; the one good sentence ("I build the infrastructure other systems depend on") is buried in section 03 | Medium | S | content, career |
| C11 | No credibility evidence beyond assertion: no projects, writing, talks, résumé, "what's next" line, or availability statement — while GitHub holds `home-stack`, `uscis-caselens`, `gallery-next` | High | S–L | career |
| C12 | Domain split: `.dev` (new), `.io` (stale, CTA target, email domain, still indexed), `.me` (alternate), `photos.ericqiu.io`. `ericqiu.dev` already has iCloud MX + SPF, so email can move with no DNS work | Medium | M | SEO, content |

### 3.3 Design and identity

| ID | Finding | Sev | Effort | Lanes |
|---|---|---|---|---|
| D1 | The six-hue cycling "Eric" is the page's only signature gesture and it reads as decoration: the gradient band (±12% of a 900px block) is wider than the ~165px word, so the "diagonal scan" renders as a plain crossfade; plum/teal/blue appear nowhere else on the page | High | M | design |
| D2 | Only image on a photographer's site is a 77px illustrated (anime-style) avatar; the hero's right half is ~900px of empty cream at 1440 | High | M | design, career |
| D3 | Unresolved palette decision (Approach 1/2/3) has been open since March. Design lane's recommendation: **Approach 1 — verdigris `#2A6B5E` / `#5AB4A0` in exactly three places** (static "Eric", icon ground, OG stripe + progress bar); keep amber/cream for all content accents | Medium | M | design |
| D4 | Two logo systems on one page: Work pins all logos to 180px wide (Addepar becomes a 34px sliver, Postmates a 137px block; the Bloomberg artwork is the "Engineering" lockup, contradicting the "Bloomberg LP" copy rule); Education uses a 33% column with 120px centred crests and the page's only disc bullets | Medium | M | design |
| D5 | Three left edges (nav 32px, content 270px, footer 195px) — no spine; `--footer-width: 1100px` vs `--max-width: 900px` | Medium | S | design |
| D6 | Five Fraunces weights (800/600/400/350/300), with 300/350 bumped to 400 in dark mode — the code admits they're too thin | Medium | S | design |
| D7 | Dark ground `#0D0D0B` is flat; memory notes already say so. Warm near-black (`#14110D`–`#1A1612`) recommended | Medium | S | design |
| D8 | OG card: ~55% empty cream; kicker ~10px at LinkedIn thumbnail size; square centre-crops (WhatsApp, X fallback) cut off the entire name; no "Bloomberg"/"Senior"/photo | Medium | S–M | SEO, design |
| D9 | Favicon at 16–32px: E and italic Q merge, the period vanishes, brown ground doesn't pop in a tab | Medium | S | design |
| D10 | Hover stripe sticks after tap on touch; focus rings inconsistent (`.link-underline` uses UA ring); progress bar doubles the nav border; nav blur at 0.72 alpha ghosts text and drops link contrast under scrolling logos | Low | S | design, a11y |
| D11 | Two body measures (66 vs 92 characters per line); Space Mono kicker wraps awkwardly at 390 | Low | S | design |

### 3.4 Engineering and maintainability

| ID | Finding | Sev | Effort | Lanes |
|---|---|---|---|---|
| E1 | Four sources of truth for overlapping facts: `index.astro` content arrays, JSON-LD in `Base.astro`, social URLs in `Footer.astro`, `site.ts` | Medium | M | eng, content |
| E2 | Dark-mode CSS emitted three times; dual-selector pattern copy-pasted in five places; two of three blocks dead because of B3. (Do **not** use `light-dark()`: Safari < 17.5 drops all colour) | Medium | M | eng |
| E3 | Six inline IIFEs (7.4 KB) + `define:vars` + 10 inline `style=""` attributes block a strict CSP; `NAV_H` duplicated as a magic number | Low | M | eng |
| E4 | `build` regenerates committed icons on every deploy (verified byte-stable, so harmless but redundant) | Low | S | eng |
| E5 | No CI, no `astro check`, no Dependabot; `npm audit` 19 advisories in toolchain | Medium | S–M | eng |
| E6 | `ExperienceCard.astro` dead since Feb; `PLAN.md` is a completed plan at repo root; `font-preview.html` undocumented; no README | Low | S | eng |
| E7 | CLAUDE.md drift: claims OS-preference dark mode, a "dark card" OG image, `icon-palette/` gitignored, "28 icons", Cloudflare Pages (it's Workers assets) | Low | S | eng, perf, design |
| E8 | Manifest: `sizes:"any"` on a PNG, combined `"any maskable"` purpose on an unpadded icon; 1024px icon fetched at high priority on every first visit | Low | S | eng, perf |
| E9 | `profile.jpg` 391 KB for a 77px avatar (lazy, so not a CWV issue; 98% reducible via `astro:assets`) | Low | S | perf |
| E10 | Fallback-font metrics not tuned: on slow 4G Georgia paints first and Fraunces swaps ~1 s later | Low | S–M | perf |

---

## 4. Where reviewers disagreed, and the recommendation

| Tension | Positions | Recommendation |
|---|---|---|
| **Hero colour cycle** | Design: gimmick, retire it for one static signature colour. A11y/perf: at minimum gate it. Owner: invested a month in it. | Ship the guards now (B7). Then decide D1/D3 together: the honest read is that the cycle exists because the lab produced it, not because the page needed it. A single verdigris "Eric" that never moves is more distinctive than six hues that fade. If it stays, make the wipe actually visible (`display:inline-block; width:max-content`, band ±4%) and finite. |
| **Email obfuscation** | Content/a11y/career: drop it, publish a plain `mailto:` on `ericqiu.dev`. Owner convention: "never a mailto link (anti-scraping)". | Drop it. Cloudflare's Scrape Shield obfuscates a real `mailto:` for free, `hello@` is dictionary-guessed regardless, and the legacy site already leaks the address. This is a convention change and needs Eric's sign-off (see §6). |
| **Education section** | Content/career: demote to two lines. Design: keep but rebuild as a Work-style row. | Demote to two lines under Work, no crests, no courses. Course lists lower perceived seniority five years out. |
| **Employer logos** | Design: either drop them or normalise by optical area. Career: neutral. | Drop them from the co-op list entirely (it becomes a compact mono list). Keep only Bloomberg's plain wordmark, if any. |
| **"Now" section** | Content: valuable but a liability if it goes stale (last commit was April). Career: do it, it's the natural home for availability + homelab. | Ship an *undated* "Currently" line driven from `site.ts` first; promote to a dated `/now` page only once a quarterly edit habit is real. |
| **Blog** | Career: high payoff only if sustained; the dead 2019–2023 `blog` repo is a warning. | Don't build an engine. Write 2–3 anonymised "problems I've worked on" notes first; the index page *is* the blog. |
| **Default theme** | Engineering: two coherent options — respect OS + toggle + persist (A), or light-default done properly (B). Nav comment says ignoring OS was "intentional". | Option A. The `theme-color` metas, `color-scheme: light dark`, and the Hero's `matchMedia` branch all show OS-aware was the intent; the hard-coded attribute was a stop-gap. |

---

## 5. Roadmap

Sequenced so each phase is shippable on its own and earlier phases don't get invalidated by later decisions.

### Phase 0 — Stop the bleeding (one sitting, all S, no design decisions required)

1. **Repo exposure (B1).** Decide: flip the repo private, *or* move `.claude/memory/` (and this audit) out of the repo and gitignore `.claude/`, keeping `CLAUDE.md` operational-only. Do this before anything links to the repo.
2. **Kill the dead CTA (B2).** Replace "Chat with me →" with the email link (or Cal.com — see §6); add a one-line availability statement.
3. **Contrast (B5).** `light.textMuted` → `#6B6961` in `palette.ts` (4.85:1 on bgPrimary, 4.61 on bgCard, still reads muted).
4. **Fold (B6).** Reveal observer `threshold: 0` with `rootMargin: '0px 0px -40px 0px'`, or render entry 0 visible server-side; trim hero `padding-bottom` 80→48 and `.section-title` margin 3rem→2rem.
5. **Print / no-JS (B4).** `@media print` override for `.reveal*`; gate the hidden state behind an `html.js` class set in `<head>`; hide nav/progress/skip in print.
6. **Motion guards (B7).** Early-return the interval under `prefers-reduced-motion`; pause on `visibilitychange` and when `#top` leaves the viewport; `scroll-behavior: auto` under reduced motion.
7. **Nav ≤ 390 (B8).** Drop to two links or allow wrap below 480px.
8. **Delete dead files (B9, B12, E6).** `public/og-image.png`, `public/coffee-3d.png`, `public/logos/`, `public/icon-palette/` (re-gitignore), `src/assets/inter-bold.ttf`, `ExperienceCard.astro`, root `PLAN.md` (fold into memory). Move lab pages out of `public/` (root `lab/`), or keep under `public/lab/` with `X-Robots-Tag: noindex` and self-hosted fonts.
9. **Headers (B13, B14).** In `public/_headers`: HSTS, `X-Frame-Options: DENY`, `Permissions-Policy`, `Content-Security-Policy-Report-Only` (starter policy in `reports/report-engineering.md` §6), `/_astro/*` and `/fonts/*` → `max-age=31536000, immutable`. Set the Cloudflare zone Browser TTL to "respect existing headers". Drop the `generator` meta.
10. **404 (B10).** Add `src/pages/404.astro` (noindex); if Workers assets, `not_found_handling: "404-page"` in `wrangler.json`.
11. **Robots (B11).** In Cloudflare → Security → Bots: allow retrieval crawlers (ClaudeBot, GPTBot, OAI-SearchBot, PerplexityBot, Applebot-Extended); keep `ai-train=no` if desired.
12. **Metadata (B16, B17, C1 title half).** One title string everywhere (`kicker`, `pageTitle`, `ogTitle`, JSON-LD, GitHub bio, LinkedIn); remove duplicated `<Base>` props; `og:image:width/height/alt`, `og:site_name`, `twitter:creator`; JSON-LD → `@graph` of `WebSite` + `ProfilePage` + `Person` with `@id`, no `logo`, richer `sameAs` (photo site, X, old domains); `sitemap({ lastmod })`; `Footer` reads `site.footerBio`.
13. **A11y semantics (B18).** `aria-hidden` on `.section-num`; `aria-labelledby` on sections; `<h3>` for schools; toggle `padding:8px; margin:-8px` + `aria-pressed`; `aria-current` on active nav link; `.link-underline:focus-visible`; `html { scroll-padding-top: 76px }`.
14. **Config (B19, E4).** Remove `server.host` and `allowedHosts`; key `site` off `WORKERS_CI_BRANCH` (or drop the branch logic); remove `gen:icons` from `build` and add a CI drift check instead.
15. **LCP (B15).** Name entrance ≤ 0.25 s with no delay, or transform-only from opacity 1. Expected mobile LCP 2.5 s → ~1.7 s.
16. **Docs (E7).** Correct CLAUDE.md drift in the same commit.

### Phase 1 — Say the right things (content; needs Eric's facts, see §6)

1. **Kicker and bio (C1).** Drop "Coffee Addict". Recommended: `SOFTWARE INFRASTRUCTURE // NEW YORK CITY` (or `SENIOR SOFTWARE ENGINEER // INFRASTRUCTURE // NEW YORK CITY`) and a bio that leads with what the platform is and the 300+ teams number. Five drafted directions are in `reports/report-content.md` §1; the hiring-manager lane favours the "one sentence of what the system is" framing.
2. **Restructure Work (C2, C3, C4).** One merged Bloomberg entry (2021–present, with 2020 and 2018 co-ops as a trailing line) with a one-line platform description and 3–4 outcome bullets with numbers; the five other co-ops collapse into a compact mono "Earlier" list, one line each. Rewritten drafts for every entry, with `[CONFIRM]` markers, are in `reports/report-content.md` §2. Translate or cut every internal noun.
3. **Education (C5, C9).** Two lines under Work: "University of Waterloo — BCS, 2021" and "POSTECH — exchange term, 2019". Remove "Candidate for…", crests, departments, courses.
4. **Cut "What I Do" (C6, C10).** Promote "I build the infrastructure other systems depend on" to the hero or the Bloomberg entry. Delete "6+ years", "DR-1 Compliance", the Specialties row. If a tech line survives, make it honest (Go · Python · Kubernetes · the actual datastore/queue · Linux · on-call).
5. **Contact (C8, C12).** Plain `mailto:hello@ericqiu.dev` (MX already provisioned; keep receiving on `.io`); availability + response-expectation line; "Get in touch" → "Contact". 301 `ericqiu.io/*` and `ericqiu.me/*` → `ericqiu.dev`. Add DMARC on `.dev`.
6. **One photography treatment (C7).** Remove the hero "I also shoot photos →" and the callout strip. One confident block in the photo site's own voice — "Photos from places I've been. Iceland, Vietnam, Japan, Spain, London, New York — mostly on a Fujifilm X100VI." — placed in the Currently/Projects slot. Coffee gets one mention, total.
7. **Currently line (see §4).** A mono `NOW — …` line from `site.ts` (what he's building, reading, shooting, and whether he's open to conversations).
8. **Voice guide.** Adopt the eight rules in `reports/report-content.md` §6 into `editorial-redesign-notes.md`.

### Phase 2 — Look like a person (design and identity; needs the §6 decisions)

1. **Theme system (B3, E2, E3).** Option A: remove `data-theme` from `<html>`; ~200-byte pre-paint script (`localStorage.theme ?? matchMedia`); a single generated `[data-theme="dark"]` block; toggle persists and updates one non-media `theme-color` meta; Hero `isDark()` reads the attribute. Add `color-scheme: dark` on the dark selector. Warm the dark ground (D7). Net-negative LOC; unlocks a strict CSP later.
2. **Signature colour (D1, D3).** Approach 1 with verdigris in three places; static "Eric". Retire or gate-and-fix the cycle. This closes the palette question that has been open since March. Update `palette.ts` `icon`, OG stripe, progress bar; regenerate icons.
3. **A photograph (D2).** One of Eric's own photographs in the hero's empty right half (3:2, ~900px), full-bleed on mobile; replace or remove the illustrated avatar. This is the single most distinctive move available and costs one image.
4. **One row system (D4, D5, D6).** Work and the co-op list share one layout; footer and nav on the 900px column; three Fraunces weights (800/600/400); delete the dark-mode weight override.
5. **Brand marks (B20, D8, D9).** Re-instance Fraunces at `opsz=144 wght=800` (roman + italic) for satori; OG redesign: name 160–180px, disambiguators ("Senior Software Engineer · Bloomberg LP · NYC") or the photograph on the right, all text inside the square-safe zone; size-specific favicon (drop the period below 64px, larger letters, signature-colour ground).
6. **Interaction polish (D10, D11).** `@media (hover:hover)` around hover effects; nav alpha 0.85; progress bar becomes the nav's bottom border or goes; description measure 600px; kicker line-break control at 390.

### Phase 3 — Show, don't assert (credibility)

1. **Projects / Selected work** — 4–5 entries, two sentences each: photos.ericqiu.io (Astro, image pipeline, 47 photos, 13 collections), `uscis-caselens` (threat model, privacy doc), `home-stack` (Go, Tailnet, Caddy — the most infra-relevant thing on his GitHub), this site's token pipeline (`palette.ts` → CSS vars / icons / OG / manifest). Clean up the GitHub side first: bio, pins, profile README, check `wtr-3b`/`wtr-4a` for employer details.
2. **`/resume`** — HTML page + PDF; canonical over LinkedIn.
3. **Two to four anonymised "problems I've worked on" notes** — tenancy isolation in a shared cluster; what the top DR tier means for a service owner; a zero-downtime migration; on-call lessons from a platform 300 teams depend on. 300–600 words, one diagram, one lesson each. Employer-comms sanity check first. These are the blog.
4. **`/now`** — only once the Currently line has been edited at least twice.
5. **Typed content (E1).** `src/content.ts` with `Experience[]`, `Project[]`, etc. feeding `index.astro`, JSON-LD, and the footer. Content Collections only if notes/projects become many.
6. **CI (E5).** GitHub Actions: `npm ci`, `astro check`, `build`, icon-drift check; Dependabot; optionally Lighthouse CI and a link checker. `npm audit fix` (non-forced) and bump to astro 5.18 / current sitemap / wrangler / tsx now.

### Phase 4 — Bigger bets (after the above)

- Astro 7 + satori 0.33 migration (only with CI in place).
- Enforcing hash-based CSP via a post-build script (after E3 consolidates inline scripts).
- Fallback-font `size-adjust`/`ascent-override` metrics so the slow-network swap is invisible (E10); preload `space-mono-latin-700.woff2`.
- `profile.jpg` through `astro:assets` at 1×/2×/3× (E9); keep a 512px copy for JSON-LD.
- Cloudflare Web Analytics (cookieless) as a complement or replacement for GA4.
- A NYC infra-meetup lightning talk from any Phase 3 note; then a Talks line.
- Manifest: 512 as the maskable/primary icon with safe-zone padding; drop 1024 (E8).

---

## 6. Decisions only Eric can make

Grouped by which phase they unblock. Everything in Phase 0 can proceed without answers.

**Unblocks Phase 0 item 1 and 2**
1. Repo: private, or move the memory notes out and keep it public?
2. "Chat with me": plain email, Cal.com (changes the kind of inbound), or nothing?

**Unblocks Phase 1**
3. What *is* the platform, at the publicly allowed specificity? Which parts did you personally design or own? Three shareable numbers (tenants, clusters, p99, availability, incident reduction, migration size)?
4. Is Bloomberg comms comfortable with "300 teams", "DR-1", "Global Data", "Bloomberg Engineering", and the 2018 vol-surface line? Has anyone there seen the site?
5. Hired as Senior in 2021 or promoted? Any tech-lead or staff scope not stated? What did the 2020 co-op do (currently blank)? Postmates: how many developers, and what was your actual role?
6. Waterloo: what's the SE → CS story, and should it be mentioned at all?
7. What's next — bigger scope in place, a move, staff-level infra, something blending design and photography? Active or passive? NYC-only or remote? Cold coffee-chats welcome?
8. Will you publish a plain `mailto:` (this reverses a stated convention)? Move the published address to `@ericqiu.dev`? 301 `.io` and `.me`, or park them? Is `@itsericqiu` on X live enough to advertise? Still yours: keybase.io/ericqiu, about.me/ericqiu?
9. Photography: hero differentiator or project card? (Open in the notes since February; a decision unblocks four copy edits.)
10. Will you keep a Currently line updated quarterly?

**Unblocks Phase 2**
11. Do you love the colour cycle, or did it survive because the lab produced it? Acceptable to make it static, or finite?
12. Should OS dark mode win on first load? (Reviewers unanimously say yes.)
13. Is the illustrated avatar deliberate (privacy / persona) or a placeholder? Which single photograph of yours would you put on this page — is there a 3:2 print-quality crop?
14. Do employer logos matter to you or your audience, or are names enough?

**Unblocks Phase 3**
15. Comfortable describing `home-stack` publicly? Any writing, talks, or design docs that already exist and could be adapted?
16. Do `wtr-3b` / `wtr-4a` (public work-term reports) contain employer details that should be private?
17. Was the Cloudflare AI-crawler block deliberate? Cloudflare Pages or Workers static assets? Is GA4 worth its cost versus Cloudflare Web Analytics?

---

## 7. What was verified as fine (no action)

CLS ≈ 0 with explicit dimensions everywhere; TBT 0; HTML 8.7 KB Brotli; H2 + H3 live; GA deferred with dns-prefetch only; rAF-gated read-only scroll handlers; responsive WebP logos with lazy loading; `lang`, single `h1`, correct heading order, landmarks, working skip link, logical tab order; all `target="_blank"` links carry `noopener noreferrer`; `set:html` uses trusted build-time data; no secrets in the repo; all twelve hero cycle hues clear 4.5:1 (the brief's worry about `#207A50` was unfounded); reflow at 320px, 200% text zoom, and text-spacing overrides all pass; www → apex and http → https 301s in place; self-hosted Fraunces retains the full `opsz 9–144` axis so `font-optical-sizing: auto` is doing real work on the site itself; icon regeneration is byte-stable.

---

## 8. Reports

| Lane | File | Notes |
|---|---|---|
| Performance | `reports/report-performance.md` | Lighthouse 13.4.1 mobile + desktop, Playwright/CDP paint-cost traces, live header probes |
| Accessibility | `reports/report-accessibility.md` | axe-core across 8 modes, computed contrast for every token pair, print + no-JS + forced-colors + reduced-motion runs |
| SEO / metadata | `reports/report-seo.md` | Head audit, JSON-LD, OG thumbnail measurements, DNS for all four domains, five web searches |
| Content strategy | `reports/report-content.md` | Positioning, five kicker/bio directions, full rewrite drafts for every entry, IA, voice guide |
| Visual design | `reports/report-design.md` | 60+ screenshots across 6 viewports × 2 themes, paused mid-wipe frames, opsz check via fontTools, comparables |
| Engineering | `reports/report-engineering.md` | Architecture, theme-layer forensics from git history, build/deploy, `npm outdated`/`audit`, CSP starter policy |
| Hiring manager | `reports/report-career.md` | 20-second test, credibility-evidence ranking, Work restructure, GitHub profile review, risks, comparables |

Screenshots and Lighthouse JSON were generated in the audit session's scratch space and are not committed (the repo already ships too many binaries). Re-run instructions are in each report's method section.
