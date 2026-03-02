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
- [x] Favicon/icons: EQ lettermark, **navy** `#1B2D45` bg / `#F0EBE0` cream text
  - Sizes: favicon.png (256), icon-512.png, apple-touch-icon.png (180), icon-192.png
  - Legacy iOS paths: apple-touch-icon-precomposed.png, apple-touch-icon-120x120.png, apple-touch-icon-120x120-precomposed.png
- [x] PWA manifest from palette + site tokens
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

### Technical
- [ ] Decide on nav active-state highlighting (currently no active link in nav)
- [ ] Consider image optimization for `profile.jpg` (currently unoptimized)
