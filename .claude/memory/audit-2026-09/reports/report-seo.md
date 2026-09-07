# SEO / metadata / social-sharing audit — ericqiu.dev

Reviewer role: technical SEO, structured data, Open Graph / link previews, indexing, domain strategy.
Method: read `src/layouts/Base.astro`, `src/site.ts`, `src/pages/index.astro`, `src/pages/og-image.png.ts`, `public/_headers`, `public/robots.txt`, `dist/index.html`, `dist/sitemap-*.xml`; curled the live site, `ericqiu.io`, `photos.ericqiu.io`; resolved DNS for all four domains; looked at the served OG image; ran five web searches. `validator.schema.org`, `x.com`, `keybase.io`, `ericqiu.me` and `*.pages.dev` are blocked by the sandbox egress proxy, so those were validated manually / via search results and DNS — noted where that applies.

Overall: the fundamentals are in place (canonical, sitemap, one `<h1>`, self-hosted fonts, JSON-LD Person, OG + Twitter cards, `rel="me"` on socials, www→apex and http→https 301s). The problems are (a) a whole-domain soft-404 that turns every bad URL into a 200 copy of the homepage, (b) a Cloudflare-managed robots.txt that silently blocks every major AI crawler from a personal-brand site, (c) split identity across `ericqiu.dev` / `ericqiu.io` / `ericqiu.me` with the stale 2018 page still indexed and still the "Chat with me" destination, and (d) a handful of metadata/schema inaccuracies that are cheap to fix.

---

## 1. Findings

### F1 — Every unknown URL returns the homepage with HTTP 200 (site-wide soft 404) — **High**, effort S
**Evidence**
```
https://ericqiu.dev/does-not-exist-xyz       -> 200 text/html 35130B (identical to /)
https://ericqiu.dev/foo/bar                  -> 200
https://ericqiu.dev/og-image                 -> 200 (homepage, not the PNG)
https://ericqiu.dev/icon-palette/            -> 200
https://ericqiu.dev/.well-known/security.txt -> 200 text/html
https://ericqiu.dev/humans.txt               -> 200 text/html
```
Each body carries `<link rel="canonical" href="https://ericqiu.dev/">`. `src/pages/` has only `index.astro`, `manifest.json.ts`, `og-image.png.ts` — no `404.astro`, so `dist/404.html` does not exist. Cloudflare Pages treats a deployment without a top-level `404.html` as a single-page app and serves `index.html` (200) for every miss.
**Why it matters** Search Console will report "Soft 404"s and can start distrusting the canonical. Any old inbound link (typos, the legacy site's `/img/...`, scanners probing `/.well-known/`) gets a 200. Security/humans scanners receive HTML. It also makes the lab-page problem (F9) worse: any URL variant looks like real content.
**Fix** Add `src/pages/404.astro` (tiny page on `Base` with `<meta name="robots" content="noindex">` and a link home). Astro emits `dist/404.html`; Pages then returns real 404s. If the project is actually a Worker with static assets, also set `"assets": { "not_found_handling": "404-page" }` in `wrangler.json`.

### F2 — Live robots.txt is Cloudflare-managed and blocks all major AI crawlers — **High** (if unintentional), effort S
**Evidence** Repo `public/robots.txt` is `User-agent: * / Allow: / / Sitemap: …`. The live file is prefixed with a "BEGIN Cloudflare Managed content" block:
```
User-agent: *
Content-Signal: search=yes,ai-train=no,use=reference
Allow: /
User-agent: Amazonbot                         Disallow: /
User-agent: Applebot-Extended                 Disallow: /
User-agent: Bytespider                        Disallow: /
User-agent: CCBot                             Disallow: /
User-agent: ClaudeBot                         Disallow: /
User-agent: CloudflareBrowserRenderingCrawler Disallow: /
User-agent: Google-Extended                   Disallow: /
User-agent: GPTBot                            Disallow: /
User-agent: meta-externalagent                Disallow: /
```
This comes from the Cloudflare dashboard ("Manage AI bots" / Content Signals managed robots.txt), not the repo, so it is invisible to anyone reading the codebase. `Content-Signal: ai-train=no` is a reservation; the per-bot `Disallow: /` lines are hard blocks.
**Why it matters** The site exists so that recruiters and peers can find out who Eric Qiu is — increasingly by asking ChatGPT / Claude / Perplexity / Apple Intelligence "who is Eric Qiu at Bloomberg". With ClaudeBot, GPTBot, Applebot-Extended, meta-externalagent, CCBot blocked, those assistants cannot read or cite ericqiu.dev and will cite LinkedIn or the stale ericqiu.io (Netlify, open robots) instead. Given the many other Eric Qius (Chicago Booth MBA `linkedin.com/in/ericqiu`, a CTO, a Blockworks speaker), this is exactly the disambiguation surface the site should own.
**Fix** Decide deliberately. For discoverability: Cloudflare → Security → Bots, turn off the managed robots.txt / AI-bot block, or at least allow ClaudeBot, GPTBot, OAI-SearchBot, PerplexityBot, Applebot-Extended. To keep a training opt-out, keep `Content-Signal: ai-train=no` (and optionally `Google-Extended`, which only affects Gemini training, not Search) but drop the hard `Disallow` for retrieval/search bots. Also dedupe the second `User-agent: *` block.

### F3 — Split identity across three domains; the stale 2018 site is still indexed, still the "Chat with me" target and the email domain — **High**, effort M
**Evidence**
- `src/pages/index.astro:210`: `Chat with me → https://ericqiu.io`.
- `ericqiu.io` (Netlify) serves a 3.5 KB page whose `<body>` is literally `<div class="messages"></div>` + `js/bundle.min.js`; title "Eric Qiu - Software Engineer", description "…Software Engineering Student…at the University of Waterloo", `twitter:creator @eqiu1998`, dead Universal Analytics `UA-134755247-1`, `<link rel="canonical" href="https://ericqiu.io">`, `<link rel="alternate" href="https://ericqiu.me">`, no `noindex`. Its JSON-LD `sameAs` does include `https://ericqiu.dev`, `https://twitter.com/itsericqiu`, `https://about.me/ericqiu`.
- Search: `"Eric Qiu" Bloomberg` → #1 LinkedIn, #4 `https://www.ericqiu.dev/`, #6 `https://ericqiu.io/`. `site:ericqiu.io` returns the page with the "Software Engineering Student" snippet. Both domains rank for the name; the old one contradicts the new one.
- DNS: `ericqiu.io` MX → iCloud (`mx01/02.mail.icloud.com`), SPF `include:icloud.com`, DMARC `p=none`. **`ericqiu.dev` already has the same iCloud MX + SPF + `apple-domain` TXT** — mail on `@ericqiu.dev` is already provisioned or one toggle away. `ericqiu.me` is Cloudflare-proxied with ImprovMX MX and a Keybase TXT (HTTPS content unreachable from the sandbox). `photos.ericqiu.io` is GitHub Pages (`CNAME itsericqiu.github.io`) and links back to `https://ericqiu.dev`.
- Footer email `hello[at]ericqiu[dot]io` (`src/components/Footer.astro:49`).
**Why it matters** Link equity, mentions and Google's entity understanding are split three ways, with the weakest, oldest page carrying a self-canonical and the memorable `.io`. A recruiter clicking "Chat with me" lands on a blank black page with a 2018 chat bot — the worst moment in the funnel. Two competing self-canonical pages for the same person invite Google to pick the wrong one.
**Fix (recommended consolidation)**
1. Make `ericqiu.dev` the canonical identity. On Netlify (or after moving DNS to Cloudflare) replace ericqiu.io with `301 /* https://ericqiu.dev/:splat` (keep `photos.ericqiu.io`). Same for `ericqiu.me` via a Cloudflare Bulk Redirect. Redirects carry over `.io`'s rankings and let Google merge the entries within weeks.
2. Keep receiving on `hello@ericqiu.io`, but publish `hello@ericqiu.dev` as primary (MX already on iCloud); add DMARC for `ericqiu.dev` (none today).
3. Point "Chat with me" at something real: Cal.com / Calendly, or drop it and make email the CTA. If a chat widget is wanted, host it on the new site.
4. Add `https://ericqiu.io`, `https://ericqiu.me`, `https://photos.ericqiu.io`, `https://x.com/itsericqiu` to `sameAs` (F7) so Google reconciles the historical URLs to the same entity even before redirects.
5. `@itsericqiu` is confirmed to exist (search result "Eric Qiu (@itsericqiu) on X"); nothing on the new site references `@eqiu1998`, which is correct — retire it with the old site.

### F4 — `public/og-image.png` is the *old Typedream design* and silently conflicts with the dynamic route — **Medium**, effort S
**Evidence** `public/og-image.png` = 55,714 B, md5 `e78fccda…`: black card, spilling 3D coffee mug, "Hi, I'm Eric 👋", "Cloud Storage Infrastructure at Bloomberg", "Chat with me →". `dist/og-image.png` = 21,620 B, md5 `ebba90ed…` = byte-identical to live `https://ericqiu.dev/og-image.png` (etag `19735f59…`, 21620 B). The route output is written after the `public/` copy (dist mtime 20:54 vs 20:52), so the dynamic route wins today. The live image is the current design: cream `#F5F0E8`, amber stripe, Fraunces "Eric / *Qiu.*", Space Mono kicker, "ericqiu.dev" (`scratchpad/live-og.png`).
**Why it matters** Correct by accident of ordering. Rename/disable the route or change copy order and the 2025 mug image with a "Chat with me" button reappears on every LinkedIn share. `git log -- public/og-image.png` shows it last changed 2026-02-28, before the light-mode OG commit `d733742`.
**Fix** `git rm public/og-image.png`.

### F5 — How the OG card actually reads in previews — **Medium**, effort S–M
**Evidence** (measured from `live-og.png`, 1200×630): content bbox x 114–930, y 148–486; the dark name occupies only x 116–306. Scaled type sizes:
| Surface | width | kicker (24px) | domain (22px) | name (96px) |
|---|---|---|---|---|
| LinkedIn feed | ~552px | 11.0px | 10.1px | 44px |
| X large card | ~504px | 10.1px | 9.2px | 40px |
| Slack unfurl | ~360px | 7.2px | 6.6px | 29px |
| iMessage rich link | ~300px | 6.0px | 5.5px | 24px |
Square/centre-cropping clients (WhatsApp small thumbnail, X `summary` fallback, some Discover slots) crop to x 285–915, which **cuts off the entire name** and the stripe.
**Assessment** The name is superbly legible everywhere; 1.91:1 and 2:1 crops are safe (15px top/bottom lost on 2:1). But kicker and `ericqiu.dev` fall below ~8px on Slack/iMessage and become texture, and ~55% of the canvas (right side) is empty cream. The card is tasteful but under-informative: no "Bloomberg", no "Senior", no photo.
**Fix** (a) In `og-image.png.ts` raise kicker to ~32–34px and domain to ~28px, or set the kicker on two lines; (b) keep all text inside x 285–915 so square crops still show "Eric Qiu."; (c) optionally use the right half for the profile photo or "Senior Software Engineer · Bloomberg LP · NYC"; (d) add `og:image:alt` (F6).

### F6 — Head metadata gaps and inconsistencies (`Base.astro:96–125`) — **Medium**, effort S
**Evidence** (from `dist/index.html`, identical live)
- `<title>Eric Qiu — Senior Software Engineer</title>` (35 chars) vs `og:title`/`twitter:title` `Eric Qiu — Software Engineer | New York City` (44). Hero kicker and legacy site say "Software Engineer"; description, JSON-LD `jobTitle`, manifest say "Senior Software Engineer". A LinkedIn share shows a different title than a Google result for the same URL.
- `meta description` is exactly 160 chars — at the desktop cutoff, truncated on mobile.
- `og:image` lacks `og:image:width/height/type/alt`; no `og:site_name`. Facebook/LinkedIn scrape the image asynchronously when dimensions are absent, so the first share of a URL can render imageless. The legacy site had these.
- `og:type=website`; for a one-person page `profile` is more accurate (`profile:first_name/last_name/username`).
- `twitter:site=@itsericqiu`; for a person page add `twitter:creator` too.
- `<meta name="generator" content="Astro v5.17.3">` explicitly emitted at `Base.astro:100` — remove.
- `<meta name="robots" content="index, follow">` is the default; replace with `index, follow, max-image-preview:large`, which actually does something.
- `pageTitle`/`ogTitle`/`description` live in `src/site.ts:24–26` **and** are re-typed as props in `src/pages/index.astro:129–131`. `Base.astro` already defaults to `site.*`, so the props are pure drift risk — delete them.
- No `<link rel="me">` in `<head>`; footer anchors do carry `rel="me"` (LinkedIn, Instagram, GitHub), which is enough for IndieAuth/Mastodon-style verification. A head `<link rel="me">` lets you add X/Keybase without a visible link.
**Fix** Pick one title string (suggest `Eric Qiu — Senior Software Engineer, Bloomberg` for both `<title>` and `og:title`; keep "Software Engineer // Coffee Addict // NYC" as hero kicker only). Add:
```html
<meta property="og:site_name" content="Eric Qiu" />
<meta property="og:type" content="profile" />
<meta property="profile:first_name" content="Eric" />
<meta property="profile:last_name" content="Qiu" />
<meta property="profile:username" content="itsericqiu" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:alt" content="Eric Qiu — Software Engineer, New York City — ericqiu.dev" />
<meta name="twitter:creator" content="@itsericqiu" />
<meta name="robots" content="index, follow, max-image-preview:large" />
```
Remove the `generator` meta and the duplicated props. Version the OG URL (`/og-image.png?v=3`) whenever the design changes — LinkedIn caches scraped images ~7 days.

### F7 — JSON-LD Person: one invalid property, no `@id`, thin `sameAs`, no `ProfilePage`/`WebSite` — **Medium**, effort S
**Evidence** (`Base.astro:139–164`; `scratchpad/jsonld.json`). validator.schema.org and the Rich Results Test are unreachable from the sandbox; manual check against the schema.org vocabulary:
- `"logo": "https://ericqiu.dev/favicon.png"` — `logo` is defined on `Brand`, `Organization`, `Place`, `Product`, `Service`, `Certification`, **not `Person`**. Google's validator flags it every run. `image: profile.jpg` already does the job (384 KB JPEG — perf cross-note).
- No `@id` (e.g. `https://ericqiu.dev/#person`), so nothing (photos site, ProfilePage, WebSite) can reference the same entity; no `givenName`/`familyName`.
- `address: PostalAddress` is valid; for a private individual `homeLocation: {Place "New York, NY"}` says the same without asserting a postal address. `nationality: CA` and `birthPlace: Hamilton, Ontario` are on-brand and already in the footer copy.
- `sameAs` = GitHub, LinkedIn, Instagram. Missing `https://x.com/itsericqiu`, `https://photos.ericqiu.io`, and — for reconciliation — `https://ericqiu.io`, `https://ericqiu.me` (the old site already lists ericqiu.dev; make it reciprocal). `keybase.io/ericqiu` shows up in search for "ericqiu.dev" and both `.io`/`.me` carry `keybase-site-verification` TXT — add if still maintained.
- `knowsAbout` "Full-Stack Development", "Human-Computer Interaction" are weaker than the copy; align with "Distributed Systems", "Cloud Infrastructure", "Multi-tenant Services", "Kubernetes".
- `email` deliberately omitted — keep it that way (would undo the anti-scraping stance).
- No `ProfilePage` wrapper (Google-supported for person pages since Dec 2023) and no `WebSite` node (what Google reads to pick the **site name** shown in results — "Eric Qiu" vs "ericqiu.dev"). Results currently list the page as `https://www.ericqiu.dev/` (F8), suggesting the entity picture is still fuzzy.
**Fix** Emit a `@graph`:
```json
{ "@context": "https://schema.org", "@graph": [
  { "@type": "WebSite", "@id": "https://ericqiu.dev/#website", "url": "https://ericqiu.dev/", "name": "Eric Qiu", "publisher": { "@id": "https://ericqiu.dev/#person" } },
  { "@type": "ProfilePage", "@id": "https://ericqiu.dev/#profilepage", "url": "https://ericqiu.dev/", "isPartOf": { "@id": "https://ericqiu.dev/#website" }, "mainEntity": { "@id": "https://ericqiu.dev/#person" }, "dateModified": "<build date>" },
  { "@type": "Person", "@id": "https://ericqiu.dev/#person", "name": "Eric Qiu", "givenName": "Eric", "familyName": "Qiu", "url": "https://ericqiu.dev/", "image": { "@type": "ImageObject", "url": "https://ericqiu.dev/profile.jpg" }, "jobTitle": "Senior Software Engineer", "worksFor": {…}, "alumniOf": […], "homeLocation": { "@type": "Place", "name": "New York, NY" }, "nationality": "CA", "knowsAbout": […], "sameAs": [ github, linkedin, instagram, x, photos.ericqiu.io, ericqiu.io, ericqiu.me ] }
]}
```
Drop `logo`. Validate with the Rich Results Test once you have network access (I could not).

### F8 — Google currently lists the page as `https://www.ericqiu.dev/` — **Low**, effort S (verify only)
**Evidence** All name searches show the result URL as `https://www.ericqiu.dev/`. Live: `www` → 301 → apex; canonical and sitemap are apex; `google-site-verification` TXT exists on `ericqiu.dev`.
**Why it matters** Probably a display artefact, but if Google selected `www` as canonical before the redirect existed, F1/F3 changes will trigger a recrawl and it's worth confirming.
**Fix** Search Console → URL Inspection for `https://ericqiu.dev/`: confirm "Google-selected canonical" = apex. No repo change.

### F9 — Design-lab pages are deployed, indexable and served under clean URLs — **Medium**, effort S
**Evidence** `public/_lab.html`, `palette-preview.html`, `palette-multicolour.html`, `palette-sections.html`, `hero-anim.html`, `font-preview.html` all ship. Live: `/palette-preview.html` → 308 → `/palette-preview` (200, 114 KB, `<title>Palette Preview — ericqiu.dev</title>`, loads `fonts.googleapis.com`); `/_lab` 200. None has a robots meta; no `X-Robots-Tag`. They are **not** in the sitemap and `site:ericqiu.dev palette OR lab` finds nothing yet — undiscovered, not protected. `public/icon-palette/` (1.4 MB, 100 PNGs) is also deployed and committed despite `.gitignore`/CLAUDE.md saying it's ignored.
**Why it matters** One shared link makes them crawlable; then six thin, keyword-stuffed pages titled "Palette Preview — ericqiu.dev" compete with the homepage for the brand query and a recruiter's "ericqiu.dev" search may surface an internal tool. They also leak third-party font requests.
**Fix** Preferred: move the lab out of `public/` (repo-root `lab/`, opened via `file://` or `npx serve lab`). Minimal: `<meta name="robots" content="noindex, nofollow">` in each lab HTML **and** `X-Robots-Tag: noindex` rules in `public/_headers` for `/_lab*`, `/palette-*`, `/hero-anim*`, `/font-preview*`. `_headers` *is* honoured live (favicon responses carry the file's `stale-while-revalidate=86400`, though `max-age` is rewritten to 14400 by a Cloudflare Browser-TTL setting). Do not rely on robots.txt `Disallow` — disallowed URLs can still be indexed from links.

### F10 — Sitemap has no `lastmod`; single URL — **Low**, effort S
**Evidence** `dist/sitemap-0.xml` = one `<url><loc>https://ericqiu.dev/</loc></url>`.
**Fix** `sitemap({ lastmod: new Date() })` in `astro.config.mjs`; add `filter` to exclude `/404` once it exists.

### F11 — Single indexable page; no long-tail surface — **Idea / Medium (strategic)**, effort M–L
**Evidence** One `<h1>` ("Eric Qiu."), four `<h2>`s ("01 Work", "02 Education", "03 What I Do", "04 Get in touch"), six `<h3>` employer names. The `<h2>`s carry no keywords; the rankable text ("Senior Software Engineer … Bloomberg … distributed systems") is body copy. No résumé page, projects, or writing.
**Why it matters** For the bare name query the page ranks #4 behind LinkedIn — roughly the ceiling for a one-pager. To beat the *other* Eric Qius for "Eric Qiu software engineer" / "Eric Qiu Bloomberg" you need entity consolidation (F3, F7) plus a little more crawlable text with the disambiguators (Bloomberg, Waterloo, New York, distributed systems) in headings and ideally more than one URL.
**Fix (low-friction)** Descriptive `<h2>`s (`Experience`, `Education`, `Skills`, `Contact` — note the backlog already proposes #9/#10 renames), promote the footer bio's disambiguating facts to an "About" paragraph in the main flow, and add RSS only when a second page exists. `humans.txt`/`security.txt` are nice-to-haves only after F1 gives them real 404s.

### F12 — Analytics: GA4 with no consent; consider Cloudflare Web Analytics — **Low**, effort S
**Evidence** `Base.astro:167–199`: GA4 `G-40921B4C5L` loads on first `pointerdown/touchstart/scroll/keydown` or idle after `load` — effectively every real visit; sets `_ga` cookies; no consent banner.
**Why it matters** Fine for US visitors; EU/UK visitors technically need consent for GA cookies. More practically, Bloomberg/Waterloo-type visitors block GTM at high rates (uBlock, Brave, Safari ITP), so GA under-counts the audience that matters. Cloudflare Web Analytics is cookieless, consent-free, rarely blocked, and one toggle in the dashboard the site already deploys through.
**Fix** Enable Cloudflare Web Analytics as a complement; keep GA4 for events if wanted. If GA4 stays alone, set `gtag('consent','default',{analytics_storage:'denied'})` for EU regions or accept the small risk.

### F13 — Email deliverability on the published domains — **Low**, effort S
**Evidence** `ericqiu.io`: SPF `include:icloud.com ~all`, DMARC `p=none`. `ericqiu.dev`: same SPF/MX, **no DMARC**. `ericqiu.me`: ImprovMX forwarder.
**Fix** `_dmarc.ericqiu.dev TXT "v=DMARC1; p=quarantine; rua=mailto:<cloudflare-report>"`; move `.io` to `p=quarantine` after clean reports; confirm iCloud DKIM (`sig1._domainkey`) on both.

---

## 2. Quick wins (≤ 1 hour each) vs bigger bets

**Quick wins**
1. `src/pages/404.astro` → real 404s (F1).
2. Review Cloudflare's AI-bot / managed robots.txt; allow retrieval crawlers (ClaudeBot, GPTBot, OAI-SearchBot, PerplexityBot, Applebot-Extended) while keeping `ai-train=no` (F2).
3. `git rm public/og-image.png` (F4).
4. Head metadata patch: unify title/og:title, add `og:site_name`, `og:image:width/height/type/alt`, `twitter:creator`, `profile` type, `max-image-preview:large`; drop `generator` meta and the duplicated `<Base>` props (F6).
5. JSON-LD: remove `logo`, add `@id`, `givenName/familyName`, `homeLocation`, richer `sameAs`; wrap in `WebSite` + `ProfilePage` graph (F7).
6. `noindex` meta + `X-Robots-Tag` on lab pages, or move them out of `public/` (F9).
7. `sitemap({ lastmod: new Date() })` (F10).
8. Bump OG kicker/domain sizes so they survive Slack/iMessage scaling (F5a).
9. DMARC on `ericqiu.dev` (F13).

**Bigger bets**
1. **Domain consolidation** (F3): 301 `ericqiu.io` and `ericqiu.me` → `ericqiu.dev`, publish `hello@ericqiu.dev`, replace "Chat with me" with a real scheduling link or the email. Highest-leverage change for the name-collision problem: merges two ranking pages and removes the contradictory 2018 snippet from the SERP.
2. **OG card redesign** (F5b–c): keep the typography, add the disambiguators ("Senior Software Engineer · Bloomberg LP · NYC", maybe the photo), keep text within the square-safe centre.
3. **A second crawlable surface** (F11): an About/Now page or an HTML résumé with descriptive headings, cross-linked with `photos.ericqiu.io`.
4. Cloudflare Web Analytics alongside/in place of GA4 (F12).

---

## 3. Open questions only Eric can answer

1. Was the Cloudflare AI-crawler block (ClaudeBot, GPTBot, Applebot-Extended, meta-externalagent…) deliberate, or a dashboard default you never saw?
2. What should "Chat with me" actually do — email, Cal.com/Calendly, a chat widget, or nothing? (Today it lands on an empty 2018 page.)
3. Should `ericqiu.io` survive as a brand (email domain, shorter, bookmarked) or become a pure redirect? If it survives it needs at least `rel=canonical` → `https://ericqiu.dev/` and current copy; a 301 is simpler and better for search.
4. Is `ericqiu.me` still used for anything (Keybase proof, ImprovMX forwarding)? It could not be fetched from the sandbox.
5. Is `@itsericqiu` on X active enough to advertise via `twitter:creator`/`sameAs`, or drop Twitter references entirely?
6. Are `keybase.io/ericqiu` and `about.me/ericqiu` (in the old site's `sameAs`) still yours and current?
7. Is the deployment a Cloudflare **Pages** project or a **Worker with static assets**? Observed behaviour (`.html` → 308 clean URL, SPA fallback without `404.html`, `_headers` honoured) matches Pages; `wrangler.json` says Workers. The 404 fix differs slightly.
8. Do you want the lab pages reachable on the production domain at all, or is local-only fine?

---

## Cross-cutting notes for the synthesizer
- `public/_headers` **is** applied live (favicon responses include `stale-while-revalidate=86400`), but `max-age` arrives as `14400`, not the file's `3600` — a Cloudflare Browser Cache TTL setting rewrites it. Relevant to perf/caching recommendations.
- `profile.jpg` (384 KB) is also the JSON-LD `image`, i.e. what Google would use in an entity panel — optimising it serves perf and SEO.
- The whole-domain soft-404 (F1) means any reviewer's curl of a non-existent path looks like a 200 success — don't misread it.
- `public/icon-palette/` is committed and deployed despite docs saying gitignored (verified via `git ls-files`).
- `ericqiu.dev` already has iCloud MX/SPF — moving the published email off `.io` is a DNS-free change.
