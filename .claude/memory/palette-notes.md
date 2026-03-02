# Palette Exploration Notes — ericqiu.dev

## Status
Palette exploration in-progress / paused.
Current live palette: **Amber/Cream** — still the favourite for site content.
Icon/favicon: **Amber** `#5A3E14` bg / `#F0EBE0` text (was navy `#1B2D45` briefly, reverted Mar 2026).
Dual-accent token structure now wired in production — `--accent-2` live in CSS, ready for adoption.

## The Core Problem
Amber is a warm neutral — elegant for reading but not a distinctive signature colour for
the icon/brand mark. In a browser tab or bookmark, the EQ. icon in amber doesn't pop.
Navy was tried as the icon colour (authoritative, editorial, high contrast) then reverted to amber.

---

## Three Approaches Discussed

### Approach 1 — Additive Signature Colour (recommended by brand reviewer)
Keep amber/cream exactly as-is for the full site. Introduce ONE new colour ONLY at identity
touchpoints: icon bg, OG image left stripe, scroll progress bar, hero kicker text.
The new colour becomes the "brand mark" colour; amber stays as the "content accent" colour.
This is the FT model — salmon is the brand, but editorial accents use different tones.

**Candidates evaluated:**
| Name | Icon bg | Notes |
|------|---------|-------|
| Verdigris | `#2A6B5E` | Top pick — pops in tab, connects to coffee/photography/Fujifilm |
| Forest Green | `#2D4A3E` | More understated, same logic as verdigris |
| **Ink Navy** | `#1B2D45` | Tried for icon, then reverted. Authoritative, editorial |
| Warm Oxide Red | `#8B3A2A` | Analog/darkroom feel, warm but risks blending with amber |
| Muted Steel Blue | `#4A6580` | Engineering precision, warm-cool tension |

**Where signature colour could be used (not yet applied beyond icon):**
- OG image 12px left stripe (currently amber `#D4A574` — amber was kept for OG stripe)
- `#scroll-progress` bar (3px at top of page)
- Hero kicker text (currently `var(--accent)` amber)

### Approach 2 — All-New Multicolour Palettes (for exploration only)
Completely new palette systems using two distinct accent colours.
All explored in `palette-multicolour.html` (14 systems × 2, 28 variants total).
Not for adoption — purely for reference and visual exploration.

### Approach 3 — Section-by-Section Colour Moments
Keep amber/cream as primary palette. Give individual sections their own accent colour.
Concept: Hero in amber-dark (current), photography callout in verdigris, CTA in deep navy.
Prototyped in `palette-sections.html`.

---

## Hero Dark Mode Cycling Colours
These cycle on the "Eric" text in dark mode. Calibrated to be warm and cohesive on
near-black `#0D0D0B` bg rather than borrowed from unrelated palette systems.

Current set (6 hues):
- `#D4A574` — amber (the dark accent itself)
- `#A3BC85` — warm sage green
- `#8A9FC2` — dusty periwinkle
- `#C4896A` — warm sienna
- `#B89FD4` — soft dusty mauve
- `#7DBFB0` — muted warm teal

Light mode cycling (4 hues, same as before): `#7E5F28`, `#2A6B5E`, `#1B2D45`, `#8B3A2A`

---

## Lab Preview File Structure (Mar 2026)
All files in `public/`, open directly in browser (not Astro dev server).
Shared assets extracted: `_lab.css`, `_lab.js`, `_lab-palettes.js`

- `_lab.html` — internal directory
- `palette-preview.html` — 6 standard + 8 bold + 18 sig light + 12 sig dark variants; sig sections data-driven from `_lab-palettes.js` IIFE
- `palette-multicolour.html` — 14 dual-accent systems × 2 (28 total)
- `palette-sections.html` — full simulated layout, per-section selects, all palette options; scroll-morph uses `tickMorph()` for full `applySection()` per scroll event
- `hero-anim.html` — hero name animation lab (Fade / Scan / Type)
- `font-preview.html` — body typeface comparison

### `_lab-palettes.js` palette count (Mar 2026 after curation pass)
Standard light: amber, forest, ink, clay, slate, burgundy, newsprint, lithograph, celadon, folio, duotone (11)
Standard dark: same 11 names with -dark suffix (11)
Sig light: verdigris, forest, navy, oxide, steel, prussian, slate-teal, plum, indigo, hunter, sage, malachite, cobalt, mauve, patina, amaranth, dusk, vermilion (18)
Sig dark: verdigris, forest, navy, oxide, prussian, slate-teal, plum, indigo, hunter, malachite, cobalt, mauve (12 — no steel/sage/patina/amaranth/dusk/vermilion dark)
Bold: bottle, bottle-light, teal, teal-light, amber-wash, amber-wash-light, terra-wash, terra-wash-light, ultra, ultra-light, cobalt, cobalt-light, olive, olive-light, burg-wash, burg-wash-light (16)
Editorial: ft, kinfolk, terminal, cereal, monocle, aesop, wall, natgeo, orion, a24, ny, heritage, nocturne, storm × 2 (28)
Total: ~96 entries

---

## Dual-Accent Token Structure (added Mar 2026)
Production CSS vars now include both structural and editorial accent tokens.

**Semantic split:**
- `--accent` / `--accent-light` / `--accent-dark` — structural: section labels, hover stripes, links, focus rings
- `--accent-2` / `--accent-2-light` / `--accent-2-dark` — editorial: kicker, entry dates, education dates

**`src/palette.ts` fields:**
- `accentLight` — lighter/accessible variant (the dark-mode value of accent, e.g. `#D4A574` in light mode)
- `accentDark` — darker hover shade (e.g. `#6A5020`)
- `accentSecondary` / `accentSecondaryLight` / `accentSecondaryDark` — maps to `--accent-2` family
- `accentCycle: CycleColors` — `{ light: string[], dark: string[] }` — Hero letter-seg hues; light 4, dark 6

For current amber palette `accentSecondary === accent` — zero visual change. Ready for distinct value when adopting Approach 1.

**Lab data — `_lab-palettes.js`:**
- Renamed `accentL` → `accentLight` (was ambiguous)
- Added `accentDark`, `accent2`, `accent2Light`, `accent2Dark` to all 34 original entries
- Added 28 editorial palette entries (14 palettes × dark/light): ft, kinfolk, terminal, cereal, monocle, aesop, wall, natgeo, orion, a24, ny, heritage, nocturne, storm
- Total: 62 palette entries in `paletteOptions`

---

## Decisions Made
- Amber/cream stays as site palette until a clear better option emerges
- Icon/favicon: currently amber `#5A3E14` (navy `#1B2D45` was tried and reverted)
- All exploration stays in lab HTML files (never `palette.ts`) until decided
- Hero dark cycling colours calibrated to amber dark theme (warm, cohesive)
- Dual-accent structural wiring complete — `--accent-2` live, kicker/dates use it

## Decisions Pending
- Which palette approach to adopt for the full site (additive, replace, section-by-section)?
- Whether to apply navy/verdigris to OG stripe, scroll bar, or set distinct `accentSecondary` (Approach 1)?
- Whether to implement scroll-colour-morph or other dynamic section effects?
- Finalize icon/favicon color: stay amber `#5A3E14`, or revisit navy `#1B2D45`?
