# ericqiu.dev — Claude Code Context

## Project Purpose
Astro-based personal portfolio site. Deploys to Cloudflare Pages via `wrangler.json`.
- Dev: `npm run dev`
- Build: `npm run build` → `dist/`
- Preview (local): `npm run preview`

## Current Design
**Editorial typographic concept** — Fraunces display serif, Instrument Sans body, Space Mono mono, amber/cream palette. Not the original Typedream replica; this is the redesigned version.

## Typography
- `--font-display`: Fraunces (variable, Google Fonts) — headings, company names, hero name, italic Qiu.
- `--font-sans`: Instrument Sans (Google Fonts) — body text, descriptions
- `--font-mono`: Space Mono (Google Fonts) — nav, section labels, kicker, dates, code
- Static TTFs in `src/assets/` — used **only** by satori for server-side image generation:
  - `fraunces-800.ttf`, `fraunces-800-italic.ttf` (generated from variable font via fonttools)
  - `space-mono-400.ttf`, `inter-bold.ttf` (inter-bold kept but unused in satori)
  - Satori does NOT support variable fonts — must use static weight TTFs

## Color System
Single source of truth: `src/palette.ts`
- Exports: `light`, `dark` (type `PaletteMode`), `icon` (`{ bg, text }`)
- CSS variables generated inline in `Base.astro` from palette tokens — change palette.ts, everything updates
- Current palette: **Amber** (light: cream `#F5F0E8` / dark: near-black `#0D0D0B`, accent: `#7E5F28` / `#D4A574`)

## Site Content (single source of truth)
`src/site.ts` — name, kicker, bio, bioAside, domain, SEO meta, footerBio
All hero text and OG image content pulls from here.

## Layout
- Fixed nav: 60px height, `backdrop-filter: blur(12px)`, `--bg-nav` (rgba with opacity)
- No nav-spacer div — hero `padding: 120px 25px 80px` (desktop) / `90px 25px 60px` (mobile) handles nav offset
- `--max-width: 900px` for content sections; `--footer-width: 1100px` for footer
- Sections: Hero → Work (01) → Education (02) → What I Do (03) → Get in Touch (04) → Photography callout → Footer

## Animations
- `.reveal-entry`: experience list entries — `opacity 0 → 1`, `translateY(12px) → 0`, triggered by IntersectionObserver
- `.reveal`: tech stack groups — same observer, slightly different easing
- Hero: CSS `line-reveal` keyframe animation on `.hero-line`, `.hero-kicker`, `.hero-bio`, `.hero-cta`
- Both `.reveal` and `.reveal-entry` handled by same IntersectionObserver in `Base.astro`
- **Letter-seg color cycling** (`Hero.astro`): JS state machine cycles "Eric" through 4 accent hues (amber → verdigris → navy → oxide) every 4s. Uses diagonal scan wipe: `@property --scan-pos` (`<percentage>`) animates gradient boundary in `@keyframes scan-wipe` at 55°, with `background-clip: text` on `.hero-line:first-child.is-scanning`. **Key detail**: scan animation driven via `el.style.animation` (inline style) — NOT from CSS class — to prevent the CSS cascade from replaying `line-reveal` when `.is-scanning` is removed. `line-reveal` is frozen via an `animationend` listener after page-load entry. Dark mode uses 6 warm-calibrated hues (`#D4A574`, `#A3BC85`, `#8A9FC2`, `#C4896A`, `#B89FD4`, `#7DBFB0`), snapped via MutationObserver on `data-theme`. Cycle length is `palette().length` (dynamic). First transition at 4s, then every 4s. No kicker pulse.

## Key Conventions
- **Email**: always `hello[at]ericqiu[dot]io` — never a mailto link (anti-scraping)
- **Theme toggle**: dark mode from OS preference; no persistence; `data-theme` attr on `<html>`; Nav.astro handles toggle
- **Logo inversion**: `.invert-on-dark` class + global CSS in `Base.astro`; `invertOnDark: true` prop on each entry
- **Company names**: "Bloomberg LP" (not "Bloomberg Engineering"), "BMO Capital Markets" (not "BMO")

## File Structure
```
src/
  site.ts                  — identity, hero copy, SEO meta (single source of truth)
  palette.ts               — all color tokens: light, dark, icon exports
  assets/
    logos/                 — *.webp employer/school logos (glob-imported in index.astro)
    fraunces-800.ttf       — static Fraunces weight 800 (for satori)
    fraunces-800-italic.ttf
    space-mono-400.ttf     — (for satori)
    inter-bold.ttf         — (kept, unused by satori currently)
  components/
    Nav.astro              — fixed nav, theme toggle
    Hero.astro             — editorial hero: kicker, Fraunces name, bio, photo CTA; letter-seg color cycling
    EducationCard.astro    — education rows; supports optional secondProgram/secondDates for dual degrees
    Footer.astro           — profile photo, bio, social links, email (obfuscated)
  layouts/
    Base.astro             — CSS vars from palette.ts, Google Fonts, scroll reveal JS,
                             JSON-LD, OG tags, GA4, scroll progress bar
  pages/
    index.astro            — main page: experience entries inline (no ExperienceCard)
    og-image.png.ts        — dynamic OG image via satori + @resvg/resvg-js
    manifest.json.ts       — PWA manifest from palette + site tokens
public/
  favicon.png              — 256×256 EQ lettermark (generated by scripts/gen-icons.ts)
  icon-512.png             — 512×512 EQ lettermark
  profile.jpg              — profile photo (footer)
  _lab.html                — internal design lab index (NOT part of Astro build)
  palette-preview.html     — palette explorer: 6 standard + 8 bold + 6 additive (green/other) palettes
  palette-multicolour.html — 14 dual-accent editorial palettes (FT, Kinfolk, Terminal, Cereal, Monocle,
                             Aesop, Wallpaper*, Nat Geo, Orion, A24, New Yorker, Heritage, Nocturne, Storm)
  palette-sections.html    — full simulated layout with per-section palette selects + effect toggles
  hero-anim.html           — hero name animation prototype: Fade / Diagonal Scan / Type-based
  icon-palette/            — gitignored; gen-icon-palette.ts output
scripts/
  gen-icons.ts             — generates favicon.png + icon-512.png from palette.ts icon colors
  gen-icon-palette.ts      — generates 28 EQ icons across all palette variants (for preview)
```

## Icon / Favicon Workflow
When changing the palette accent or icon colors:
1. Edit `src/palette.ts` → `icon.bg` / `icon.text`
2. Run `npm run gen:icons` → regenerates `public/favicon.png` and `public/icon-512.png`

## OG Image
`/og-image.png` served dynamically at build time:
- 1200×630, dark card (`#0D0D0B`), 12px amber left stripe (`#D4A574`)
- Fraunces 800 name (two lines: "Eric" / italic "Qiu."), Space Mono kicker + domain
- Content pulled from `src/site.ts` and `src/palette.ts`

## Design Lab Tooling
All lab pages open directly in browser (not via Astro dev server). Index at `public/_lab.html`.

**`palette-preview.html`** — palette explorer with design-element toggle (Flat/Letter-Seg/Scroll-Morph):
- 6 standard palettes (light + dark): Amber, Forest, Ink Blue, Clay, Slate, Burgundy
- 8 bold color-as-background palettes: Bottle, Ultra, Teal, Amber Wash, Terra, Olive, Burg, Cobalt
- 6 additive signature-color palettes (amber base + signature accent): Verdigris, Navy, Steel, Oxide, Indigo, Crimson + Hunter, Sage, Malachite, Fern, Cobalt, Mauve
- Icons for each variant in `public/icon-palette/` (run `npx tsx scripts/gen-icon-palette.ts` to regenerate)

**`palette-multicolour.html`** — 14 dual-accent editorial palettes, dark + light each (28 total):
FT, Kinfolk, Terminal, Cereal, Monocle, Aesop, Wallpaper*, Nat Geo, Orion, A24, New Yorker, Heritage, Nocturne, Storm

**`palette-sections.html`** — full simulated site layout with per-section palette selects:
- 7 section selectors (hero/work/edu/skills/cta/photo/footer), each independently set
- Preset buttons: Uniform / Signature / Gradient / Editorial
- Independent Letter-Seg and Scroll-Morph toggles

**`hero-anim.html`** — hero name animation prototype:
- Three modes: Fade (current production), Diagonal Scan (`@property --scan-pos` + `background-clip: text`), Type-based (per-letter stagger)
- Speed (4s/1.5s/Manual), Dark mode, Next button

## Google Analytics
GA4 property `G-40921B4C5L`, deferred via `window.load` event in `Base.astro`.

---

## Documentation Maintenance (for Claude)
**After any session where changes are made, update:**
1. **This file (`CLAUDE.md`)** — if file structure, conventions, or architectural decisions changed
2. **`~/.claude/projects/.../memory/MEMORY.md`** — if decisions, preferences, or project state changed
3. **`~/.claude/projects/.../memory/work-tracking.md`** — mark completed items, add new backlog items, update in-progress

Keep these in sync so future sessions start with accurate context rather than stale information.
