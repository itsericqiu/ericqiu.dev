# Palette Exploration Notes — ericqiu.dev

## Status
Palette exploration in-progress / paused. No changes to `src/palette.ts` accent colours.
Current live palette: **Amber/Cream** — still the favourite for site content.
Icon/favicon: **Navy** `#1B2D45` bg / `#F0EBE0` text (changed from amber, Mar 2026).

## The Core Problem
Amber is a warm neutral — elegant for reading but not a distinctive signature colour for
the icon/brand mark. In a browser tab or bookmark, the EQ. icon in amber doesn't pop.
Navy was chosen as the icon colour — authoritative, editorial, high contrast.

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
| **Ink Navy** | `#1B2D45` | **Chosen for icon.** Authoritative, editorial |
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
- `palette-preview.html` — 6 standard + 8 bold + 16 additive variants
- `palette-multicolour.html` — 14 dual-accent systems × 2 (28 total)
- `palette-sections.html` — full simulated layout, per-section selects, all palette options
- `hero-anim.html` — hero name animation lab (Fade / Scan / Type)
- `font-preview.html` — body typeface comparison

## Decisions Made
- Amber/cream stays as site palette until a clear better option emerges
- Navy chosen for icon/favicon (overrides amber icon)
- All exploration stays in lab HTML files (never `palette.ts`) until decided
- Hero dark cycling colours calibrated to amber dark theme (warm, cohesive)

## Decisions Pending
- Which palette approach to adopt for the full site (additive, replace, section-by-section)?
- Whether to apply navy/verdigris to OG stripe, scroll bar, kicker (Approach 1)?
- Whether to implement scroll-colour-morph or other dynamic section effects?
