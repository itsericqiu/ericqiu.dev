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

### 1a. `src/palette.ts` — normalize and expand accent tokens

The current interface has `accentDark` (a darker hover shade). The lab has `accentL` (the
alternate-mode shade — light mode's accent expressed for dark context). These are different
concepts with inconsistent names. This pass aligns both systems and adds the second accent.

New fields on `PaletteMode`:
```ts
accentLight:          string;   // lighter/accessible variant (= lab's current `accentL`)
accentSecondary:      string;   // editorial accent — kicker, dates
accentSecondaryDark:  string;   // hover variant of secondary accent
accentSecondaryLight: string;   // lighter/accessible variant of secondary accent
```

Values for the current amber export — all equal to existing `accent`/`accentDark` counterparts,
so zero downstream change:
- `light.accentLight = '#D4A574'` (the dark-mode amber value — already used implicitly)
- `light.accentSecondary = '#7E5F28'` (same as `accent`)
- `light.accentSecondaryDark = '#6A5020'` (same as `accentDark`)
- `light.accentSecondaryLight = '#D4A574'` (same as `accentLight`)
- Mirror pattern for `dark` export

### 1b. `src/layouts/Base.astro`

Add to all three CSS blocks (`:root`, `prefers-color-scheme: dark`, `[data-theme="dark"]`):
```css
--accent-light:    ${mode.accentLight};
--accent-2:        ${mode.accentSecondary};
--accent-2-dark:   ${mode.accentSecondaryDark};
--accent-2-light:  ${mode.accentSecondaryLight};
```

### 1c. Components — 3 surgical `var(--accent)` → `var(--accent-2)` swaps

| File | Line | Selector |
|---|---|---|
| `src/components/Hero.astro` | 65 | `.kicker-line { color }` |
| `src/pages/index.astro` | 335 | `.entry-dates { color }` |
| `src/components/EducationCard.astro` | 131 | date span `color` |

Everything else (section labels, hover stripes, links, focus rings) stays `--accent`.

### 1d. `src/components/Hero.astro` — derive letter-seg cycle from `palette.ts`

Currently the `COLORS` object is hardcoded inside a `<script>` block:
```js
var COLORS = {
  light: ['#7E5F28', '#2A6B5E', '#1B2D45', '#8B3A2A'],
  dark:  ['#D4A574', '#A3BC85', '#8A9FC2', '#C4896A', '#B89FD4', '#7DBFB0']
};
```

Add `accentCycleLight: string[]` and `accentCycleDark: string[]` exports to `palette.ts` (these
hold the existing hardcoded values — no change to the actual colors). Then replace the hardcoded
`COLORS` object in `Hero.astro` with a `<script define:vars>` injection derived from the palette:
```astro
<script define:vars={{ cycleLight: light.accentCycleLight, cycleDark: dark.accentCycleDark }}>
  var COLORS = { light: cycleLight, dark: cycleDark };
  /* rest of script unchanged */
</script>
```

### 1e. `src/pages/og-image.png.ts` — use `accentSecondary` for the kicker

Currently both the left stripe and the kicker/domain text use `light.accent`. Align with the
production semantic split: stripe and domain text stay `light.accent`; the kicker line switches to
`light.accentSecondary`. For the current amber palette these are the same value — zero visual change.

---

## Phase 2 — Lab data (`public/_lab-palettes.js`)

### 2a. Rename `accentL` → `accentLight` across all palette entries

The field name `accentL` was always ambiguous (light? lighter?). Rename to `accentLight` to match
the new production naming. Pure rename — no value changes.

### 2b. Add `accentDark` to every palette entry

Currently the lab has no `accentDark` equivalent (production's darker hover shade). Add it to each
entry. For standard and signature palettes, derive it by darkening `accent` ~10% (same relationship
that production amber has between `accent` and `accentDark`).

### 2c. Add `accent2`, `accent2Light`, `accent2Dark` to every palette entry

For all existing palettes (standard, signature, bold): set equal to `accent`/`accentLight`/
`accentDark` — still no visual change. The fields exist so consumers can always apply `--accent-2`
without conditional logic.

For the 14 editorial palettes: extract their implicit dual-accent pairs from the hardcoded CSS in
`palette-multicolour.html` into proper data entries here, with distinct `accent2` values.

Update the comment block at the top of `_lab-palettes.js` to document the full token shape:
```js
// bg, bg2, text, text2, muted,
// accent, accentLight, accentDark,
// accent2, accent2Light, accent2Dark,
// border, borderS, nav
```

---

## Phase 3 — Lab pages

### 3a. `public/palette-sections.html` — `applySection()` and scroll-morph

Add to the JS injection function:
```js
el.style.setProperty('--accent-light',   p.accentLight);
el.style.setProperty('--accent-dark',    p.accentDark);
el.style.setProperty('--accent-2',       p.accent2);
el.style.setProperty('--accent-2-light', p.accent2Light);
el.style.setProperty('--accent-2-dark',  p.accent2Dark);
```

Also apply in the scroll-morph block alongside `--accent`.

Switch `.sim-kicker` and `.sim-role span` within the page CSS from `var(--accent)` to
`var(--accent-2)` to match the production semantic split.

### 3b. `public/palette-preview.html`

Wherever the preview JS injects `--accent`, also inject `--accent-light`, `--accent-dark`,
`--accent-2`, `--accent-2-light`, `--accent-2-dark` from the palette data.

### 3c. `public/palette-multicolour.html` — CSS-var-driven palette classes

Currently the outlier: 28 hardcoded static CSS classes with per-element color overrides, no
connection to `_lab-palettes.js`. Refactor each palette class from many per-element rules to a
compact variable declaration block:

```css
/* Before — per-element overrides scattered across the class */
.p-ft-dark .sim-section-label { color: #90B4D8; }
.p-ft-dark .sim-kicker         { color: #CC4B37; }
.p-ft-dark .sim-role span      { color: #CC4B37; }
/* ... many more ... */

/* After — two-line variable declaration, elements use vars */
.p-ft-dark {
  --accent:   #90B4D8;
  --accent-2: #CC4B37;
}
/* Elements use var(--accent) / var(--accent-2) from shared base CSS */
```

This reduces 28 palette class bodies to 3–4 lines each and connects them to the same CSS var
system used by the rest of the lab.

---

## What this enables afterward

To adopt any palette — single-accent, dual-accent, or any editorial variant:

1. Edit `src/palette.ts` — set `accent`, `accentSecondary` (+ light/dark variants)
2. `npm run build` — all CSS vars, OG image, and cycle colors regenerate automatically
3. No component or CSS edits needed

To experiment in the lab: any palette in `_lab-palettes.js` with a distinct `accent2` value will
immediately show the kicker and dates in a different color than section labels and links.

---

## Summary of files touched

| File | Change |
|---|---|
| `src/palette.ts` | Add `accentLight`, `accentSecondary`, `accentSecondaryDark`, `accentSecondaryLight`, `accentCycleLight`, `accentCycleDark` |
| `src/layouts/Base.astro` | Emit `--accent-light`, `--accent-2`, `--accent-2-dark`, `--accent-2-light` |
| `src/components/Hero.astro` | 3 lines: kicker CSS + `define:vars` cycle injection |
| `src/pages/index.astro` | 1 line: `.entry-dates` color |
| `src/components/EducationCard.astro` | 1 line: date span color |
| `src/pages/og-image.png.ts` | Kicker line → `accentSecondary` |
| `public/_lab-palettes.js` | Rename `accentL` → `accentLight`; add `accentDark`, `accent2`, `accent2Light`, `accent2Dark` to all entries |
| `public/palette-sections.html` | Inject all new vars in `applySection()` + scroll-morph; switch sim kicker/dates to `--accent-2` |
| `public/palette-preview.html` | Inject new vars alongside existing `--accent` |
| `public/palette-multicolour.html` | Refactor 28 palette classes to CSS-var declarations |
