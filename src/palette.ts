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
  accentDark:    string;
  borderSubtle:  string;
  cardShadow:    string;
  selection:     string; // rgba for ::selection background
  themeColor:    string; // <meta name="theme-color">
}

export const light: PaletteMode = {
  bgPrimary:     "#F5F0E8",
  bgSecondary:   "#EDE8DF",
  bgCard:        "#EDEBE3",
  bgNav:         "rgba(245, 240, 232, 0.72)",
  textPrimary:   "#111111",
  textSecondary: "#4A4642",
  textMuted:     "#828078",
  accent:        "#7E5F28",
  accentDark:    "#6A5020",
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
  accent:        "#D4A574",
  accentDark:    "#B8915A",
  borderSubtle:  "#5C5650",
  cardShadow:    "0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.5)",
  selection:     "rgba(212, 165, 116, 0.55)",
  themeColor:    "#0D0D0B",
};

/** Colors used for the favicon / PWA icon */
export const icon = {
  bg:   "#7E5F28",
  text: "#F0EBE0",
};
