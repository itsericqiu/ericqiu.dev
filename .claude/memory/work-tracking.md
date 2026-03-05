# Work Tracking — ericqiu.dev

## Completed

### Editorial Redesign (Feb–Mar 2026)
- [x] Replace Quicksand/Libre Caslon/Inter with Fraunces + Instrument Sans + Space Mono
- [x] New amber/cream palette in `src/palette.ts` with `light`/`dark`/`icon` exports
- [x] `src/site.ts` — single source of truth for all identity/copy/meta
- [x] Hero rewrite: Space Mono kicker, Fraunces 800 name (Roman "Eric" + Italic "Qiu."), bio, CTA
- [x] Experience section: inline list with flex-row layout (company, roles, description, logo)
- [x] Skills section: prose statement + mono tech stack rows
- [x] CTA section: LinkedIn + "Chat with me" links; tagline: "…specialty coffee, or photography."
- [x] Photography callout strip before footer; copy "There's a photo side too." (avoids repeating hero)
- [x] Footer: profile photo, bio, social links (rel="me"), obfuscated email
- [x] OG image: light mode — cream bg `#F5F0E8`, dark text, amber stripe; Fraunces name + Space Mono kicker/domain
- [x] Favicon/icons: EQ lettermark, **amber** `#5A3E14` bg / `#F0EBE0` cream text (changed to navy, then back to amber)
  - Sizes: favicon.svg (vector, served first), favicon.png (256px fallback), icon-1024.png, icon-512.png, icon-192.png, apple-touch-icon.png (180)
  - Legacy iOS paths: apple-touch-icon-precomposed.png, apple-touch-icon-120x120.png, apple-touch-icon-120x120-precomposed.png
  - `favicon.svg` added (crisp vector for modern browsers); PNG fallbacks with `?v=2` cache-bust
  - `_headers`: icon TTL reduced 86400→3600s; all icon variants + SVG covered
- [x] PWA manifest from palette + site tokens; 1024×1024 entry added; maskable promoted
- [x] JSON-LD Person schema with description + image
- [x] Scroll progress bar (forced reflow fixed — rAF-deferred, cached docHeight)
- [x] Scroll reveal on experience entries + tech stack groups
- [x] Hero padding: `120px` desktop / `115px` mobile, `min-height: auto`, `align-items: flex-start`
- [x] Logo sizing: 180px column desktop, opacity hover; logo srcset widths added
- [x] Logo assets converted to `.webp`, glob-imported in `index.astro`
- [x] GA4 deferred, Google Fonts `display=optional` non-blocking; GTM → dns-prefetch only
- [x] `public/_headers` — 1-day Cache-Control on icon paths
- [x] Nav: "Eric Qiu." (Fraunces italic) desktop, "EQ." compact on mobile ≤480px; Instrument Sans nav links
- [x] `EducationCard.astro` — `secondProgram`/`secondDates` props; UWaterloo shows BCS + BSE
- [x] `gen:icons` runs as part of `npm run build` — Cloudflare regenerates icons on every deploy

### Hero Animation (Mar 2026)
- [x] JS state machine cycles "Eric" through accent hues every 4s via diagonal scan wipe
  - `@property --scan-pos` (`<percentage>`) + `@keyframes scan-wipe` at 55°, `background-clip: text`
  - Animation driven via `el.style.animation` inline — NOT CSS class (prevents `line-reveal` cascade replay)
  - `line-reveal` frozen via `animationend` listener after page-load entry
  - Light: `['#7E5F28', '#2A6B5E', '#1B2D45', '#8B3A2A']` (4 hues)
  - Dark: `['#D4A574', '#A3BC85', '#8A9FC2', '#C4896A', '#B89FD4', '#7DBFB0']` (6 warm hues)
  - Cycle length dynamic: `palette().length`; theme-switch clamps index
- [x] Kicker pulse animation removed; kicker static after entry

### Dual-Accent Structural Refactor (Mar 2026)
- [x] `src/palette.ts`: expanded `PaletteMode` with `accentLight`, `accentSecondary`, `accentSecondaryLight`, `accentSecondaryDark`; added `CycleColors` interface and `accentCycle` export (no value changes)
- [x] `src/layouts/Base.astro`: emit `--accent-light`, `--accent-2`, `--accent-2-light`, `--accent-2-dark` in all 3 CSS blocks (`:root`, `prefers-color-scheme: dark`, `[data-theme="dark"]`)
- [x] Hero kicker (`.kicker-line`), index entry dates (`.entry-dates`), EducationCard dates (`.dates`): switched from `var(--accent)` to `var(--accent-2)` — semantic split: structural vs editorial
- [x] `Hero.astro`: cycle colors derived from `accentCycle` export via `define:vars` — no more hardcoded COLORS array
- [x] `og-image.png.ts`: kicker uses `light.accentSecondary` instead of `light.accent`
- [x] `public/_lab-palettes.js`: renamed `accentL`→`accentLight`; added `accentDark`, `accent2`, `accent2Light`, `accent2Dark` to all 34 original entries; added 28 new editorial palette entries (14 palettes × 2 variants: ft, kinfolk, terminal, cereal, monocle, aesop, wall, natgeo, orion, a24, ny, heritage, nocturne, storm); total 62 entries in `paletteOptions`
- [x] `public/palette-sections.html`: inject all new accent vars in `applySection()` + scroll-morph; `.sim-kicker` and `.sim-role span` use `var(--accent-2)`
- [x] `public/palette-preview.html`: added `--accent-2: var(--a)` default to `.palette` block
- [x] `public/palette-multicolour.html`: replaced ~350 per-element CSS overrides with 7 shared structural rules + compact 2-line per-palette variable declarations (28 palette classes refactored)

### Palette & Animation Lab (Mar 2026)
- [x] `palette-preview.html` — 6 standard + 8 bold + 16 additive signature variants
- [x] `palette-multicolour.html` — 14 dual-accent systems × 2 (28 variants)
- [x] `palette-sections.html` — per-section palette selects, preset buttons, effect toggles; full palette coverage (light/dark/signature/greens/others/bold dark optgroups)
- [x] `hero-anim.html` — Fade / Diagonal Scan / Type-based prototype with speed + dark controls
- [x] `_lab.html` — internal editorial-styled directory
- [x] **Lab refactor**: extracted shared CSS/JS into `_lab.css`, `_lab.js`, `_lab-palettes.js`
  - `_lab-palettes.js` — single source of truth for all 36 palette tokens + `paletteOptions` + named presets
  - `_lab.css` — shared nav-strip, px-toggle, sim-* components, section divider, mobile rules
  - `_lab.js` — shared collapsible nav behaviour (`initLabNav`)
- [x] All lab pages: mobile layout fixed — fixed full-width bottom bar, overflow-x scrollable control bars, 2-column section palette grid on mobile

### Lab Curation Pass (Mar 2026)
- [x] `_lab-palettes.js`: added 5 new standard pairs (newsprint, lithograph, celadon, folio, duotone light+dark); added new sig variants (patina, amaranth, dusk, vermilion light; 12 sig-dark variants); removed sig-bronze and sig-fern; fixed ink-dark accent values; total ~80 entries
- [x] `palette-preview.html`: sig CSS/HTML (18 light + 12 dark cards) replaced with data-driven generation from `LAB.palettes` via inline IIFE — eliminates ~900 lines of static CSS+HTML; fixed dark-view toggle to include 5 new standard palette names; fixed Verdigris nav anchor
- [x] `palette-multicolour.html`: hex refinements across FT-light bg, Cereal/Aesop/Natgeo/A24/NY/Storm accent-2, Heritage-dark border, Nocturne-light bg; swatch updated for FT-light
- [x] `palette-sections.html`: replaced IntersectionObserver scroll-morph with `tickMorph()` scroll listener for full `applySection()` morph; CSS transition on sim-page; Paper + Patina preset buttons added

---

## Backlog / Ideas

### Content
- [ ] Rewrite BMO Capital Markets experience description (leads with "Prototyped POC" — weak)
- [ ] Rewrite Bloomberg 2018 experience description (two unrelated projects crammed together)
- [ ] Decide on photography integration: keep both hero mention + callout, or callout only?
- [ ] Skills section audit: remove "DR-1 Compliance" (regulatory classification), deduplicate HCI
- [ ] Add résumé PDF link to footer once available

### Design / UX
- [ ] Add EQ favicon icon to each section in `palette-preview.html`
- [ ] Consider whether to keep `ExperienceCard.astro` (currently unused)
- [ ] Open-source contributions / projects section (currently nothing)
- [ ] Decide on palette direction: amber/cream stays, or additive signature colour, or section-by-section moments?

### Design Review — Mar 2026 (deferred items)
Candidates from design review session. Implement once palette direction is decided.

**Colour / Dark Mode (pick one direction):**
- [ ] #1 — Replace dark mode bg with tinted dark (e.g. prussian `#071220`, verdigris `#091E1A`, plum `#180A14`) — keeps amber accent system
- [ ] #2 — Adopt a signature colour carrying through both modes: light keeps cream bg + signature on identity touchpoints; dark bg tints with that hue + luminous version (sig-* palette structure already built in lab)
- [ ] #3 — Replace amber entirely with a more distinctive base (Prussian, Verdigris, Nocturne, Plum as candidates)
- [ ] #4 — Keep amber light mode exactly; fix dark mode bg depth/character only

**Experience Section:**
- [ ] #7 — Collapse two Bloomberg LP entries into one (data model already supports `roles: []`)
- [ ] #8 — Visually differentiate co-op entries from full-time (lighter/smaller treatment)

**Section Labels:**
- [ ] #9 — Rename "What I Do" → "Skills" (section ID is already `#skills`)
- [ ] #10 — Rename "Get in touch" → "Contact"

**Skills Section:**
- [ ] #11 — Cut tech stack keyword rows; let the one-liner stand alone
- [ ] #12 — Or: expand with 2–3 sentences on approach/philosophy instead of keyword rows

**Copy:**
- [ ] #13 — Rewrite photo callout copy — replace "There's a photo side too." with something direct (e.g. "I also shoot." or "I shoot with a Fujifilm X100VI.")

### Technical
- [ ] Decide on nav active-state highlighting (currently no active link in nav)
- [ ] Consider image optimization for `profile.jpg` (currently unoptimized)
