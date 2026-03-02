/**
 * Single source of truth for all color tokens.
 * Imported by: Base.astro, og-image.png.ts, scripts/gen-icons.ts, src/pages/manifest.json.ts
 *
 * To change the site palette, edit the values here — everything updates automatically.
 */

export interface PaletteMode {
  bgPrimary:     string;
  bgSecondary:   string;
  bgCard:        string;
  bgNav:         string;
  textPrimary:   string;
  textSecondary: string;
  textMuted:     string;
  accent:        string;
  accentLight:   string; // lighter/accessible variant (used as accent in dark mode)
  accentDark:    string; // darker hover variant
  accentSecondary:      string; // editorial accent — kicker, dates
  accentSecondaryLight: string; // lighter/accessible variant of secondary accent
  accentSecondaryDark:  string; // darker hover variant of secondary accent
  borderSubtle:  string;
  cardShadow:    string;
  selection:     string; // rgba for ::selection background
  themeColor:    string; // <meta name="theme-color">
}

/** Cycle palette for the hero letter-seg name animation */
export interface CycleColors {
  light: string[];
  dark:  string[];
}

export const light: PaletteMode = {
  bgPrimary:     "#F5F0E8",
  bgSecondary:   "#EDE8DF",
  bgCard:        "#EDEBE3",
  bgNav:         "rgba(245, 240, 232, 0.72)",
  textPrimary:   "#111111",
  textSecondary: "#4A4642",
  textMuted:     "#828078",
  accent:              "#7E5F28",
  accentLight:         "#D4A574",
  accentDark:          "#6A5020",
  accentSecondary:      "#7E5F28",
  accentSecondaryLight: "#D4A574",
  accentSecondaryDark:  "#6A5020",
  borderSubtle:  "#D8D4CC",
  cardShadow:    "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
  selection:     "rgba(184, 145, 90, 0.25)",
  themeColor:    "#F5F0E8",
};

export const dark: PaletteMode = {
  bgPrimary:     "#0D0D0B",
  bgSecondary:   "#1E1D1A",
  bgCard:        "#1E1D1A",
  bgNav:         "rgba(13, 13, 11, 0.60)",
  textPrimary:   "#F0EBE0",
  textSecondary: "#9A9289",
  textMuted:     "#828078",
  accent:              "#D4A574",
  accentLight:         "#7E5F28",
  accentDark:          "#B8915A",
  accentSecondary:      "#D4A574",
  accentSecondaryLight: "#7E5F28",
  accentSecondaryDark:  "#B8915A",
  borderSubtle:  "#5C5650",
  cardShadow:    "0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.5)",
  selection:     "rgba(212, 165, 116, 0.55)",
  themeColor:    "#0D0D0B",
};

/** Colors used for the favicon / PWA icon */
export const icon = {
  bg:   "#5A3E14",
  text: "#F0EBE0",
};

/** Cycle palette for the hero letter-seg name animation */
export const accentCycle: CycleColors = {
  light: ["#7E5F28", "#2A6B5E", "#1B2D45", "#8B3A2A"],
  dark:  ["#D4A574", "#A3BC85", "#8A9FC2", "#C4896A", "#B89FD4", "#7DBFB0"],
};
