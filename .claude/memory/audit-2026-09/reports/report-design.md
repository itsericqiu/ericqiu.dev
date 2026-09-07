# Design review — ericqiu.dev (visual / interaction / editorial typography)

Reviewer role: senior visual & interaction designer, editorial-typography background.
Method: served `dist/` locally, captured 60+ screenshots with headless Chromium at 1440×900, 1920×1080, 1024×768, 390×844, 360 and 320 wide, light + dark + OS-dark, hero at t=0.2/1.0/4.5/8.5/12.5s plus paused mid-wipe frames, hover/focus/tap states, all lab pages, OG image, favicon, avatar. Measurements are from `getComputedStyle`/`getBoundingClientRect` in that build (`shots/measurements.json`). Repo untouched.

## Verdict in four sentences

The type system is genuinely good — Fraunces 800 roman/italic against Instrument Sans and Space Mono is a confident, editorial pairing, the cream/amber palette is calm, and the page is clean and fast. But the page is a well-set résumé, not yet a person: the only image is a 77px illustrated (anime-style) avatar of a man who describes himself as a Fujifilm photographer, the six-hue colour-cycling "Eric" is the one signature gesture and it reads as decoration rather than meaning, and below the hero the layout falls back to two different logo systems, bulleted course lists and keyword rows that any Astro portfolio template would produce. The highest-leverage moves are not palette tweaks: put one real photograph on the page, commit to one signature colour and use it in exactly three places, and fix the handful of real defects found below (fold dead-zone, 360px nav collision, wipe that renders as a mud-coloured crossfade, OG/favicon set in the wrong optical size).

---

## 1. Hierarchy & rhythm

### 1.1 The fold ends with an orphaned "01 WORK" label and nothing under it — High / S
Evidence: at 1440×900, 1024×768 and 390×844 no `.reveal-entry` has `.visible` at load (`shots/measurements.json` → `reveal-*`; `d1440-light-hero-t12.5.png` still shows blank space under "01 WORK" 12 s after load). First entry top = 829px, height 265px; observer root bottom = 900 − 60 (rootMargin) = 840 → 11px intersect = 4.1%, under the 5% threshold in `Base.astro` `initReveal`. Only 1920×1080 clears it (`d1920-light-hero.png`).
Why it matters: the first screen on a MacBook Air is kicker → name → bio → CTA → 210px of air → a lone section label. The first thing a recruiter should see (Bloomberg, Senior SWE) is invisible until they scroll. It also makes the hero look like it ran out of ideas.
Fix: `threshold: 0` with `rootMargin: '0px 0px -40px 0px'`, or reveal the first entry unconditionally (`visible` class server-side on `i === 0`). Also consider trimming hero `padding-bottom` 80 → 48px and `.section-title` margin 3rem → 2rem so the first company name lands inside a 900px viewport.

### 1.2 Three different left edges, no spine — Medium / S
Evidence: nav logo x=32 (padding 2rem, full-bleed), content column x=270 (900px), footer x=195 (1100px) — `d1440-light-footer.png` shows the avatar hanging 75px left of every other left edge on the page; `d1440-light-hero-t1.0.png` shows the wordmark 238px left of the hero name.
Why: editorial layouts get their authority from one relentless margin. Here the eye has to re-find the left edge three times.
Fix: put `.nav-inner` and `.footer-inner` on the same `--max-width: 900px` container (drop `--footer-width`). If the wider nav is wanted for balance, at least align the wordmark to the 900px column and let only the toggle sit at the viewport edge.

### 1.3 Section padding is uniform, so nothing is emphasised — Low / S
Measured: hero 120/80, all four sections 60/60, callout 56/56, footer 32. Section title margin-bottom is 3rem everywhere except Education (1.5rem, `#education .section-title` override) — so Education visibly sits tighter than Work for no reason (`d1440-light-education.png`).
Fix: one scale, e.g. 96px between major sections, 48px inside, and remove the Education-only override. Consider a thin rule or numbered running head between sections — the numbers "01–04" are already there but carry no structure.

### 1.4 Work entries: logos at 180px right-aligned are a "logo wall" in an editorial layout — Medium / M
Evidence: `crop-work-logos.png`. Rendered sizes: Bloomberg 180×72 (twice), Addepar 180×34, Postmates 180×137, BMO 180×125, LCBO 180×60. Aspect ratios 5.2:1 to 1.3:1 all pinned to 180px width and vertically centred, so Addepar is a thin sliver and Postmates is a tall block; the Bloomberg lockup includes a boxed "Engineering" chip that reads like UI, and it appears twice.
Why: this is the one place the page stops being typographic and becomes a recruiter slide. It also contradicts a stated convention — CLAUDE.md insists on "Bloomberg LP", but the artwork literally says "Bloomberg Engineering".
Fix (pick one): (a) drop logos entirely and let the Fraunces 600 company name be the mark — the FT/Monocle move; (b) keep them but normalise by optical area, not width: `max-height: 44px; max-width: 140px`, greyscale, opacity 0.55 → 1 on hover, so all six read as small quiet marks; (c) collapse the two Bloomberg entries (backlog #7) so the logo appears once. If keeping the Bloomberg mark, source the plain "Bloomberg" wordmark, not the Engineering lockup.

### 1.5 Education uses a completely different layout system — Medium / M
Evidence: `d1440-light-education.png` — 33% logo column (≈297px) with a 120px-tall crest centred in it, text starting at x=597; Work has text at x=270 and logos right. On mobile the crest is centred at 80px above left-aligned text (`m390-light-education.png`), which looks like a Word CV. Bulleted `disc` course lists (`.courses`) are the only bullets on the page.
Fix: make Education a Work-style row: school name in Fraunces 600, department + programme/dates in the mono role-line style, courses as a single mono line separated by " · " (the tech-stack pattern already in use). Crests, if kept, go small and right like the work marks.

### 1.6 Two body measures under the hero — Low / S
Hero bio 520px ≈ 66 characters per line; description 680px ≈ 92 CPL (measured on the Bloomberg description line). 92 is past comfortable reading length for 16px sans.
Fix: description `max-width: 600px` (≈80 CPL) or bump to 17px/1.7. Alternatively give descriptions the same 520–560px measure as the hero for a consistent text column with logos in the remaining 300px.

---

## 2. Typography

### 2.1 Fraunces optical sizing: works on the site, broken on the brand marks — High / S
Site: `fraunces-latin-300-900.woff2` retains `opsz 9–144` and `wght 100–900` (checked with fontTools); `font-optical-sizing: auto` gives the 96px hero opsz≈96 — the hairline serifs visible in `d1440-light-hero-t1.0.png` confirm the display cut.
Brand marks: `src/assets/fraunces-800.ttf` name table says **"Fraunces 9pt Black"** — it was instanced at opsz = 9, the *text* optical size. Satori uses it for the OG image (`asset-og-dist.png`) and `gen-icons.ts` for every favicon/PWA icon (`asset-favicon-256.png`). So the name on the OG card and the EQ. mark are a chunkier, low-contrast cut than the hero. Side by side the "Eric" on the OG has fatter hairlines and blunter serifs than the one on the page.
Fix: re-instance with `fonttools varLib.instancer Fraunces[opsz,wght].ttf opsz=144 wght=800` (and italic) and rebuild OG + icons. S effort, immediately visible.

### 2.2 Five Fraunces weights, two of them near-duplicates — Medium / S
Measured: hero 800, company/school/nav/footer-name 600, CTA italic 400, photo callout 350, skills statement 300 — and the last two are bumped to 400 in dark mode (`index.astro` bottom), which is the code admitting 300/350 are too thin on `#0D0D0B`.
Why: weight is meaning. 800/600/400 is a system; 800/600/400/350/300 is a mood board.
Fix: three weights — 800 (name), 600 (all headings), 400 (all display statements, roman and italic). Delete the dark-mode weight override.

### 2.3 Space Mono uppercase tracking is right on desktop, tight on mobile — Low / S
Kicker 13px/0.12em wraps on 390px to two lines with `// NEW YORK CITY` orphaned and the second line starting with `//` (`m390-light-hero-t1.2.png`). Nav links 12px/0.04em at 360px collide with the mark (see 5.1).
Fix: kicker on mobile — either shorten (`SOFTWARE ENGINEER · NYC`) or allow a deliberate two-line stack with the separator at line end via a `nowrap` span. Kicker at 400 on amber sits at 5.2:1 contrast; at 13px uppercase that is acceptable, not generous.

### 2.4 Instrument Sans body — fine
16px/1.75 on a 520px measure reads well; 0.9375rem aside in `--text-muted` (#828078, 3.49:1) is under AA for body text — bump to `--text-secondary` or darken muted to ≈#6F6D66.

---

## 3. Colour

### 3.1 The cycling "Eric" is a gimmick rendered as a crossfade, not a signature — High / M
Evidence: paused frames `scanpause-contact.png` (top row light, bottom row dark; 15/35/50/65/85% of the 1 s animation). At 35% the whole word is a uniform khaki/olive — the midpoint of amber→verdigris — and at no point is a diagonal edge visible across the letters. Reason: `.hero-line` is `display:block` at the full 900px container width, so the 24%-wide soft band of the 55° gradient is ≈250px wide, wider than the ≈165px word; the gradient box does not hug the glyphs. The hero-anim lab page (`lab-hero-anim.png`) says "Fade is live in production" — the production code is scan, but visually it *is* the fade, with a muddy intermediate colour added.
Then the aesthetics: over 24 s a cream page with amber accents shows a verdigris, prussian, plum, oxide and malachite "Eric" (`d1440-light-hero-t4.5/8.5/12.5.png`). None of those hues appear anywhere else on the page, so the name reads as a screensaver; the plum frame in particular clashes with the amber kicker directly above it. It runs forever, ignores `prefers-reduced-motion` (the `.hero-line` keyframes are disabled but `setInterval(advance, 4000)` and the inline `el.style.animation` are not), and in dark mode the pastel teal/periwinkle look like a different brand from the amber UI around them.
Verdict: gimmick. The idea underneath — "the name is the one coloured thing" — is right; the execution (six unrelated hues on a timer) undermines it.
Options, best first:
1. **One colour, no cycle.** "Eric" in the signature colour, "Qiu." in ink. Static. Combine with 3.3. Effort S.
2. **Two states, event-driven.** Rest = signature colour; on hover/pointer-move over the name, or once per section reached while scrolling, wipe to amber and back. Motion becomes a response, not a loop. Effort M.
3. **Tie hues to sections.** If a cycle stays, drive it from scroll position (hero=signature, work=amber, photo callout=verdigris) so colour means "where you are". This is Approach 3 done properly. Effort M.
If the wipe is kept in any form: `.hero-line:first-child { display:inline-block; width:max-content }`, narrow the band to ±4%, and guard everything behind `matchMedia('(prefers-reduced-motion: no-preference)')`.

### 3.2 Dark mode is a palette swap without a room — Medium / S
`#0D0D0B` with `#F0EBE0` text (16.4:1) and `#5C5650` rules is correct but flat (`d1440-dark-work-hover.png`). The memory note calls it "lacking depth/character" — agreed. The light mode has a paper; the dark mode has a void. The warm-calibrated dark cycle hues make it worse by introducing pastels that sit on nothing.
Fix: a tinted near-black that carries the same warmth as the cream — e.g. `#14110D`/`#1A1612` body with `#0F0D0A` nav — and a slightly warmer secondary text (`#A69C8F`). If a signature colour is adopted (3.3), tint the dark ground toward it very slightly (the lab's `sig-*-dark` structure already does this). Also: OS dark is currently unreachable without clicking — `<html data-theme="light">` is hard-coded (`osDark` measurement: `prefersDark:true`, body bg still cream, `d1440-osdark-default-hero.png`). Cross-cutting, but it means nobody sees dark mode by default.

### 3.3 Palette decision: recommend Approach 1 with verdigris, applied in exactly three places — recommendation
Amber `#7E5F28` on cream is a warm neutral (5.2:1) — good for text accents, invisible as identity, which is why the icon flip-flopped and why 6 hues were bolted onto the hero. The lab explored 96 palettes; the answer was already in the notes.
Recommendation: keep amber/cream for all content accents (labels, dates, links, hover stripe). Introduce **one** signature colour — verdigris `#2A6B5E` light / `#5AB4A0` dark is the best of the candidates: it has a real relationship to the photography (Fujifilm classic-chrome greens, the Iceland/Seville images on photos.ericqiu.io's own OG card `asset-photos-og.png`) and it is the one hue that looked intentional in the light-mode cycle (`d1440-light-hero-t4.5.png`). Use it in precisely: (1) the word "Eric", static; (2) the favicon/icon background; (3) the OG left stripe and scroll-progress bar. Nowhere else. That is the FT model the notes cite — the brand colour is scarce, the editorial accents are not. Approach 2 (whole new palette) throws away the best thing on the site; Approach 3 (section colour moments) is fun in the lab (`lab-palette-sections.png`) but on a single 4,400px page it will read as four templates stitched together.

### 3.4 Minor colour notes
- `--text-muted` #828078 on cream = 3.49:1; used for the hero aside, "6+ years", copyright. Fine for labels, under AA for the aside sentence.
- Scroll progress bar (3px amber, z-index 200) draws over the nav's top edge; together with the 1px nav border it makes the nav look double-bordered (`d1440-light-work-hover.png`). Either drop the bar (it adds nothing on a 4-section page) or make it the nav's bottom border.

---

## 4. Motion & interaction

### 4.1 Hover stripe — fine on desktop, sticky and edge-flush on touch — Low / S
Desktop: 3px amber bar at x=246, 24px left of text (`d1440-light-work-hover.png`) — a nice quiet affordance. Mobile: `left:-25px` lands exactly at x=0 (section padding is 25px), and after a tap the `:hover` state sticks (`m390-light-tap-entry.png`, `mobileStripe.hoverMatches:true`) so a 3px amber line hugs the screen edge until the next tap.
Fix: wrap `:hover` rules in `@media (hover:hover)`; on touch, no stripe.

### 4.2 Focus styles are inconsistent — Medium / S
Nav links, theme toggle and footer social links have a custom amber `focus-visible` ring; company links, the hero photo link, both CTA links and the photo-callout link fall back to the UA ring (`d1440-light-focus-company.png` — black rectangle around "Bloomberg LP"). Add the same `:focus-visible` rule to `.link-underline`.

### 4.3 Entry reveal — acceptable, but the 30ms stagger is imperceptible
12px/0.6s with the expo-out curve is tasteful. Stagger of 30ms × 6 = 150ms total reads as simultaneous; either 80ms or none. `.reveal` (tech rows) uses a different easing (`ease`) from `.reveal-entry` — unify.

### 4.4 Theme toggle 20° rotate on hover, nav underline grow — fine, if slightly 2019
Not offensive. The bigger issue is 3.2 (dark never triggers from OS).

### 4.5 Nav backdrop blur ghosting — Low
At 0.72 alpha the mono tech-stack rows show through the nav as smeared text (`d1440-light-footer.png`, `d1440-dark-footer.png` top edge). Bump `--bg-nav` alpha to 0.85 or reduce blur to 8px.

### 4.6 Missing: any interaction that rewards attention
No hover on the name, no hover on logos beyond opacity, no link previews, nothing "currently". The one ambient motion (colour cycle) is the least earned. See section 6.

---

## 5. Mobile (390 / 360 / 320)

### 5.1 Nav breaks below 390px — High / S
At 360px (the most common Android width) "EQ." right edge = 57 = "Work" left edge: zero gap (`m360-light-nav.png`). At 320px the toggle is at x=332–348, off-canvas (`m320-light-nav.png`). `.nav-links` gap 1rem + four 12px mono links + 16px toggle simply do not fit in 360 − 40.
Fix: below 480px drop "Skills" and "Education" from the nav (Work and Contact are the only jumps anyone uses), or collapse to `Work · Contact` + toggle, or make `.nav-links` `overflow-x:auto` with `flex-shrink:0` on the mark.

### 5.2 Hero at 390 — good
`clamp(2.75rem,16vw,4rem)` → 62.4px, two lines, "EQ." mark at 22px/800 reads as a mark. Best screen on mobile (`m390-light-hero-t1.2.png`). Kicker wrap per 2.3.

### 5.3 Work entries stack sensibly; logos under the text are the weakest moment
Each entry is 384–465px tall on 390 (`entries` measurement) — six entries = 2,650px, 44% of the page. The logo moving below the paragraph at 140px wide (`m390-light-work.png`, Bloomberg + Engineering chip at bottom-left) looks like an afterthought. On mobile hide logos, or place a 24px-tall mark inline right of the company name.

### 5.4 Education on mobile — centred crest above left text, see 1.5.

### 5.5 Tech-stack rows and footer stack fine. Total page 6,077px tall on 390 — long for a six-item résumé; 1.5, 5.3 and backlog #7/#11 would cut ≈1,500px.

---

## 6. Distinctiveness — does this look like Eric or like a nice template?

Honest answer: it looks like a very well-executed template in the current "editorial serif + mono kicker + cream" genre. Nothing on the page could only be Eric's except the words.

What comparable sites do that this doesn't:
- **rauno.me / paco.me** — one idea executed obsessively (Rauno's interaction craft is the content; Paco's restraint is). Here the "one idea" (colour-cycling name) is the weakest element.
- **brianlovin.com / leerob.com** — a living surface: "now", writing, things shipped, a stack that changes. This page has no timestamp of life after 2021 except a job title.
- **linusrogge.com / fabianschultz.com** — photography as structure, not as a link; the person's eye is visible in the first viewport.
- **henry.codes** — voice. The bio here is a LinkedIn summary in a nicer font.

Three moves that would make it unmistakably his (in priority order):

1. **One photograph, large, his own.** He owns 47 photographs across Iceland, Seville, Tokyo (`asset-photos-og.png`) and the only image on the site is an illustrated anime-style avatar (`asset-profile-512.png`) — which for a photographer is the single most off-brand element on the page. Put one X100VI frame in the right half of the hero (currently 900px of empty cream at 1440, `d1440-light-hero-t1.0.png`), full-bleed on mobile between hero and Work, or as a 3:2 strip in place of the "There's a photo side too." callout. Replace the avatar with a real photo or remove it. Effort M; this is the highest-leverage change on the list.
2. **A "Currently" line in mono under the bio.** `NOW — Bloomberg Software Infrastructure · reading ___ · last roll: Seville`. Three fragments, dated. It is the cheapest way to make the site feel inhabited and it solves the "no life after 2021" problem. Effort S (content) — give it a `site.ts` field.
3. **One signature colour and one mark, used with discipline** (3.3 + 7). A verdigris "Eric" that never changes, a verdigris EQ. favicon, a verdigris stripe on the OG. People remember one colour; nobody remembers six.

Also: kill the two-mention photography indecision (hero link *and* callout) — with a real photo on the page, one mono link "Photographs →" is enough.

---

## 7. OG image and icon as brand marks

### 7.1 OG image — Medium / S
`asset-og-dist.png` is the dynamic route output and *is* what is served (21,620 bytes, matches live). The 690×431 `public/og-image.png` (`asset-og-static-public.png`) is the 2023 Typedream card — black, 3D coffee mug, "Hi, I'm Eric 👋", Quicksand — and should be deleted before a route change ever exposes it.
- Set in the opsz=9 text cut (2.1) — the name is visibly chunkier than the site's.
- 60% of the canvas is empty cream; at LinkedIn/iMessage thumbnail size (≈500px wide) the 96px name becomes ≈40px and the 24px kicker ≈10px, illegible; the 12px stripe becomes 5px. In a feed this card is a beige rectangle.
- No photograph, no colour beyond a brown stripe. Docs disagree with reality: CLAUDE.md says "dark card `#0D0D0B`", work-tracking says light — actual is light.
Fix: name at 160–180px filling the left 60%, kicker 32px, and either a verdigris field on the right third or (better) a photograph bleeding off the right edge. Rebuild with the opsz=144 instance.

### 7.2 Favicon / icon (`asset-favicon-256.png`, `asset-favicon-32-zoomed.png`) — Medium / S
At 256px the EQ. lettermark is handsome. At 32px (the size it actually lives at) the E's serifs and the italic Q's tail merge, the period disappears, and it reads as a light smudge on brown; at 16px it will be a brown square. The brown `#5A3E14` is the memory note's own diagnosis: it does not pop in a tab.
Fix: a size-specific favicon — drop the period below 64px, set the two letters larger (cap height ≈70% of the box), consider the italic Q alone as the small-size mark (it is the most distinctive glyph on the site), and use the signature colour for the ground. Keep the full EQ. for 180px+.

---

## Quick wins (≤ 1 hour each)

| # | Fix | Ref |
|---|-----|-----|
| Q1 | Reveal threshold → 0 / first entry visible by default | 1.1 |
| Q2 | Nav: hide two links below 480px or allow wrap; fixes 360/320 collision | 5.1 |
| Q3 | Re-instance `fraunces-800(-italic).ttf` at opsz=144; rebuild OG + icons | 2.1 |
| Q4 | `@media (hover:hover)` around stripe + logo-opacity hovers | 4.1 |
| Q5 | `:focus-visible` ring on `.link-underline` | 4.2 |
| Q6 | Guard hero cycle with `prefers-reduced-motion`; `display:inline-block` on the "Eric" span so the wipe is a wipe | 3.1 |
| Q7 | Delete `public/og-image.png` (stale Typedream card) | 7.1 |
| Q8 | Unify `.section-title` margin (remove Education override); one padding scale | 1.3 |
| Q9 | Description `max-width` 680 → 600px | 1.6 |
| Q10 | Consolidate Fraunces to 800/600/400; delete dark-mode weight bump | 2.2 |
| Q11 | Drop `--footer-width`; footer on the 900px column | 1.2 |
| Q12 | `--bg-nav` alpha 0.72 → 0.85 | 4.5 |

## Bigger bets

| # | Bet | Effort | Payoff |
|---|-----|--------|--------|
| B1 | A real photograph in the hero (right column desktop / full-bleed mobile); replace or remove the illustrated avatar | M | Highest — the site becomes his |
| B2 | Adopt Approach 1: verdigris in exactly three places; "Eric" static; retire the cycle (or make it event-driven) | M | Identity + removes the gimmick |
| B3 | Rebuild Work/Education as one row system: Fraunces 600 name, mono meta line, 520–600px description, small normalised marks or no logos; collapse Bloomberg ×2 | M–L | Editorial coherence, −1,500px on mobile |
| B4 | "Currently" line + one dated artefact (last photo, last thing read/shipped) via `site.ts` | S–M | Signals a live person, not a 2021 résumé |
| B5 | Dark mode with a warm tinted ground; make OS dark actually apply | S–M | Dark mode people will actually see |
| B6 | OG card redesign with photograph + display-cut name; size-specific favicon | M | Every LinkedIn/iMessage share |

## Open questions only Eric can answer

1. Is the illustrated avatar a deliberate choice (privacy / persona), or a placeholder? Would you put a real photograph of yourself, or only your photographs, on the site?
2. Is the colour cycle something you love, or something that survived because the lab produced it? Would a single verdigris (or navy) "Eric" feel like a loss?
3. Do the employer logos matter to you (or to the recruiters you care about), or would company names in Fraunces be enough?
4. Which photograph would you pick if you could put exactly one on this page — and does photos.ericqiu.io have a print-quality 3:2 crop of it?
5. What is "currently" true — what you're building, reading, last shot? Would you keep a three-fragment "now" line updated every few months?
6. Should Education carry the same weight as Work five years out of school, or shrink to a single line?

## Cross-cutting notes for the synthesizer (not my lane, but seen)
- `<html data-theme="light">` hard-coded → OS dark never applies (`osDark` measurement).
- `public/og-image.png` (old Typedream design) shadows the dynamic route; dist currently serves the dynamic one.
- CLAUDE.md OG description ("dark card") is wrong; `hero-anim.html` says "Fade is live in production" (it is scan).
- Bloomberg artwork is the "Engineering" lockup while copy convention is "Bloomberg LP".
- Hero cycle ignores `prefers-reduced-motion`.
- `--text-muted` body copy at 3.49:1.

## Screenshot index (all under `/tmp/claude-0/-home-user-ericqiu-dev/a4e5624b-3cbb-5dc2-89fe-6c52ff481000/scratchpad/shots/`)

Desktop 1440×900 light: `d1440-light-hero-t0.2.png`, `d1440-light-hero-t1.0.png`, `d1440-light-hero-t4.5.png`, `d1440-light-hero-t4.9.png`, `d1440-light-hero-t8.5.png`, `d1440-light-hero-t12.5.png`, `d1440-light-full.png`, `d1440-light-work-hover.png`, `d1440-light-education.png`, `d1440-light-skills.png`, `d1440-light-footer.png`, `d1440-light-nav-hover.png`, `d1440-light-reveal-mid.png`, `d1440-light-focus-company.png`
Desktop 1440×900 dark: `d1440-dark-hero-t0.2.png` … `d1440-dark-hero-t12.5.png`, `d1440-dark-full.png`, `d1440-dark-work-hover.png`, `d1440-dark-education.png`, `d1440-dark-skills.png`, `d1440-dark-footer.png`, `d1440-dark-nav-hover.png`, `d1440-dark-reveal-mid.png`
OS dark: `d1440-osdark-default-hero.png`, `d1440-osdark-attr-removed-hero.png`
1920 / 1024: `d1920-light-hero.png`, `t1024-light-hero.png`, `t1024-light-full.png`
Scan wipe: `scan-light-00..06.png`, `scan-dark-00..06.png` (polled), `scanpause-light-{15,35,50,65,85}.png`, `scanpause-dark-{…}.png`, `scanpause-contact.png` (contact sheet)
Mobile 390: `m390-light-hero-t0.3.png`, `m390-light-hero-t1.2.png`, `m390-light-hero-t4.5.png`, `m390-light-full.png`, `m390-light-work.png`, `m390-light-work2.png`, `m390-light-education.png`, `m390-light-skills.png`, `m390-light-footer.png`, `m390-light-tap-entry.png`, and the same set as `m390-dark-*`
Mobile 360/320 nav: `m360-light-nav.png`, `m320-light-nav.png`
Lab: `lab-_lab.png`, `lab-palette-sections.png`, `lab-palette-sections-full.png`, `lab-hero-anim.png`, `lab-palette-preview.png`, `lab-palette-preview-full.png`, `lab-palette-multicolour.png`
Assets: `asset-og-dist.png` (served OG), `asset-og-static-public.png` (stale public/ OG), `asset-favicon-256.png`, `asset-favicon-32-zoomed.png`, `asset-profile-512.png`, `asset-photos-og.png` (photos.ericqiu.io card), `crop-footer-avatar.png`, `crop-work-logos.png`
Data: `measurements.json`
