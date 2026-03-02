# Plan: Dual-Accent Structural Refactor

**Goal:** Add structural support for a second accent color token across the production site and all
lab pages — without changing any currently displayed colors. When done, switching to a dual-accent
palette (or any new palette type) is a data-only change with no CSS edits required.

---

## Semantic split — which elements belong to which accent

The editorial palettes in `palette-multicolour.html` already define the intent implicitly:

| Role | CSS element | Accent |
|---|---|---|
| Section labels, section numbers | `.section-title` | `--accent` (structural) |
| Hover stripe, focus rings | `::before`, `outline` | `--accent` (structural) |
| Links (CTA, photo callout, social) | `.link-underline`, `.cta-text-link` | `--accent` (structural) |
| Hero CTA link | `.hero-cta a` | `--accent` (structural) |
| **Kicker** | `.kicker-line` | `--accent-2` (editorial) |
| **Entry / role dates** | `.entry-dates` | `--accent-2` (editorial) |
| **Education dates** | `EducationCard` date spans | `--accent-2` (editorial) |

For the current amber palette `--accent-2 = --accent`, so zero visual change.

---

## Phase 1 — Production site (`src/`)

### 1a. `src/palette.ts`
Add two fields to `PaletteMode`:
```ts
accentSecondary:     string;   // editorial accent — kicker, dates
accentSecondaryDark: string;   // darker/hover variant
```
Set them to the same values as `accent`/`accentDark` in both `light` and `dark` exports.

### 1b. `src/layouts/Base.astro`
Add `--accent-2` and `--accent-2-dark` to all three CSS blocks (`:root`, the
`prefers-color-scheme` block, and `[data-theme="dark"]`), generated from the new palette tokens.
Follows the same pattern as `--accent` / `--accent-dark`.

### 1c. Components — 3 surgical `var(--accent)` → `var(--accent-2)` swaps

| File | Line | Selector |
|---|---|---|
| `src/components/Hero.astro` | 65 | `.kicker-line { color }` |
| `src/pages/index.astro` | 335 | `.entry-dates { color }` |
| `src/components/EducationCard.astro` | 131 | date span `color` |

Everything else (section labels, hover stripes, links, focus rings) stays `--accent`.

---

## Phase 2 — Lab data (`public/_lab-palettes.js`)

Add `accent2` and `accentL2` fields to every palette entry. For all existing palettes (standard,
signature, bold), set them equal to `accent`/`accentL` — still no visual change. The fields exist
so any consumer can set `--accent-2` without conditional logic.

For the 14 editorial palettes (currently only in `palette-multicolour.html` as static CSS), extract
their implicit dual-accent pairs into `_lab-palettes.js` as proper data entries with `accent2`
populated with the distinct secondary color. This is the only place where `accent2 ≠ accent`.

---

## Phase 3 — Lab pages

### 3a. `public/palette-sections.html` — `applySection()` function
Add two lines to the JS injection function:
```js
el.style.setProperty('--accent-2',      p.accent2);
el.style.setProperty('--accent-2-dark', p.accentL2);
```
Also add `--accent-2` update in the scroll-morph block (line ~727) alongside `--accent`.

Switch the simulated kicker/dates CSS within the page from `var(--accent)` to `var(--accent-2)` to
match the production semantic split.

### 3b. `public/palette-preview.html`
Wherever the preview JS injects `--accent`, also inject `--accent-2` from the palette data.

### 3c. `public/palette-multicolour.html` — align with data-driven approach
Currently the outlier: 28 hardcoded static CSS classes, no connection to `_lab-palettes.js`.

**Approach:** Add `--accent-2` CSS variable declarations inside each palette class, then switch all
per-element color assignments from hardcoded hex values to `var(--accent)` and `var(--accent-2)`.
This makes each palette class a two-line variable declaration rather than per-element overrides.

Full JS-driven refactor (like `palette-sections.html`) would be cleaner long-term but is out of
scope for this structural pass.

---

## What this enables afterward

To adopt any new palette — single-accent, dual-accent, or any of the 14 editorial variants:

1. Edit `src/palette.ts` — set `accent`, `accentSecondary` (and dark variants)
2. `npm run build` — CSS vars regenerate automatically
3. No component or CSS edits needed

To experiment in the lab: pick a palette with a real `accent2` value in `palette-sections.html`
and the kicker/dates will immediately render in the second color.

---

## Out of scope for this pass

- Renaming `accentDark` (production) vs `accentL` (lab) — existing naming mismatch, separate cleanup
- The letter-seg color cycling array in `Hero.astro` (hardcoded hex values, separate concern)
- Adding `--accent-2` to the OG image / `og-image.png.ts`
- Any visual design change
