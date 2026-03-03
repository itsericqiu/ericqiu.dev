/**
 * Generates 512×512 EQ lettermark icons for every palette variant
 * from the palette preview page. Output: public/icon-palette/
 *
 * Run: npx tsx scripts/gen-icon-palette.ts
 */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const outDir = path.join(root, "public/icon-palette");
fs.mkdirSync(outDir, { recursive: true });

const frauncesData = fs.readFileSync(path.join(root, "src/assets/fraunces-800.ttf"));
const frauncesItalic = fs.readFileSync(path.join(root, "src/assets/fraunces-800-italic.ttf"));

const fonts = [
  { name: "Fraunces", data: frauncesData, weight: 800 as const, style: "normal" as const },
  { name: "Fraunces", data: frauncesItalic, weight: 800 as const, style: "italic" as const },
];

const palettes: Array<{ name: string; bg: string; text: string }> = [
  // ── Standard palettes ──
  { name: "amber-light", bg: "#7E5F28", text: "#F0EBE0" },  // current favicon
  { name: "amber-dark", bg: "#0D0D0B", text: "#D4A574" },
  { name: "forest-light", bg: "#2D5A27", text: "#E8EDE6" },
  { name: "forest-dark", bg: "#0A110A", text: "#6AAE5A" },
  { name: "ink-light", bg: "#1B4080", text: "#E8EDF5" },
  { name: "ink-dark", bg: "#080E18", text: "#5B8DB5" },
  { name: "clay-light", bg: "#8B3A2A", text: "#F0E6E0" },
  { name: "clay-dark", bg: "#110806", text: "#C4664A" },
  { name: "slate-light", bg: "#4A5568", text: "#EEEEF2" },
  { name: "slate-dark", bg: "#0E0E12", text: "#8A9AB8" },
  { name: "burgundy-light", bg: "#7A1E30", text: "#F0E8EA" },
  { name: "burgundy-dark", bg: "#0E0608", text: "#C45A6E" },

  // ── Bold: color-as-background ──
  { name: "bottle-dark", bg: "#1C3A24", text: "#E4EDE6" },
  { name: "bottle-light", bg: "#ECFAEE", text: "#2D6B35" },
  { name: "ultra-dark", bg: "#0F1E6A", text: "#E8ECF8" },
  { name: "ultra-light", bg: "#EDF0FC", text: "#1E3FA8" },
  { name: "teal-dark", bg: "#082830", text: "#DCF0F4" },
  { name: "teal-light", bg: "#E6F8FB", text: "#0A5A6E" },
  { name: "amber-wash-dark", bg: "#5A3E14", text: "#F5EAD8" },
  { name: "amber-wash-light", bg: "#FBF4E8", text: "#8B5E20" },
  { name: "terra-dark", bg: "#5A1E10", text: "#F5E4DE" },
  { name: "terra-light", bg: "#FAF0EC", text: "#C4502A" },
  { name: "olive-dark", bg: "#2A3018", text: "#EAECD8" },
  { name: "olive-light", bg: "#F2F5E6", text: "#5A6A28" },
  { name: "burg-wash-dark", bg: "#3A0818", text: "#F5E0E4" },
  { name: "burg-wash-light", bg: "#F8EEF0", text: "#8B2A3A" },
  { name: "cobalt-dark", bg: "#001A80", text: "#E0E8FF" },
  { name: "cobalt-light", bg: "#EAF0FF", text: "#1E3FCC" },

  // ── New standard palettes (accent as bg, palette text as fg) ──
  { name: "newsprint-light", bg: "#5C4A1E", text: "#F2EDE4" },
  { name: "newsprint-dark",  bg: "#111009", text: "#F0EBE0" },
  { name: "lithograph-light",bg: "#4A6238", text: "#EEEAE2" },
  { name: "lithograph-dark", bg: "#0E0D0B", text: "#F0EBE0" },
  { name: "celadon-light",   bg: "#2E5A50", text: "#EDF0EA" },
  { name: "celadon-dark",    bg: "#0C100E", text: "#F0EBE0" },
  { name: "folio-light",     bg: "#384870", text: "#ECEEF2" },
  { name: "folio-dark",      bg: "#0C0D10", text: "#F0EBE0" },
  { name: "duotone-light",   bg: "#6A3C50", text: "#EDE6DF" },
  { name: "duotone-dark",    bg: "#100D08", text: "#F0EBE0" },

  // ── New bold palettes ──
  { name: "onyx-dark",       bg: "#0A0A08", text: "#F0ECE4" },
  { name: "onyx-light",      bg: "#FBF8EA", text: "#1A1400" },
  { name: "newsprint-grey-dark",  bg: "#1A1A16", text: "#E8E4DC" },
  { name: "newsprint-grey-light", bg: "#E8E6E0", text: "#1A1A18" },

  // ── Signature (cream base + signature accent — accent as icon bg) ──
  { name: "sig-verdigris",   bg: "#2A6B5E", text: "#F5F0E8" },
  { name: "sig-forest",      bg: "#2D4A3E", text: "#F5F0E8" },
  { name: "sig-navy",        bg: "#1B2D45", text: "#F5F0E8" },
  { name: "sig-oxide",       bg: "#8B3A2A", text: "#F5F0E8" },
  { name: "sig-steel",       bg: "#4A6580", text: "#F5F0E8" },
  { name: "sig-prussian",    bg: "#0F3A5A", text: "#F5F0E8" },
  { name: "sig-slate-teal",  bg: "#2A5055", text: "#F5F0E8" },
  { name: "sig-plum",        bg: "#5A2A4A", text: "#F5F0E8" },
  { name: "sig-indigo",      bg: "#2A2870", text: "#F5F0E8" },
  { name: "sig-hunter",      bg: "#2B5235", text: "#F5F0E8" },
  { name: "sig-sage",        bg: "#4E6A55", text: "#F5F0E8" },
  { name: "sig-malachite",   bg: "#1A7A56", text: "#F5F0E8" },
  { name: "sig-cobalt",      bg: "#1C3A82", text: "#F5F0E8" },
  { name: "sig-mauve",       bg: "#7A4A68", text: "#F5F0E8" },
  { name: "sig-patina",      bg: "#2A5A50", text: "#F5F0E8" },
  { name: "sig-amaranth",    bg: "#822840", text: "#F5F0E8" },
  { name: "sig-dusk",        bg: "#5A4870", text: "#F5F0E8" },
  { name: "sig-vermilion",   bg: "#BE2A20", text: "#F5F0E8" },

  // ── Signature Dark (cream base + luminous accent — mirrors sig-light concept) ──
  { name: "sig-verdigris-dark",   bg: "#F5F0E8", text: "#5EC4A8" },
  { name: "sig-forest-dark",      bg: "#F5F0E8", text: "#58B87A" },
  { name: "sig-navy-dark",        bg: "#F5F0E8", text: "#6090C8" },
  { name: "sig-oxide-dark",       bg: "#F5F0E8", text: "#D07858" },
  { name: "sig-prussian-dark",    bg: "#F5F0E8", text: "#5898D0" },
  { name: "sig-slate-teal-dark",  bg: "#F5F0E8", text: "#5AB8C0" },
  { name: "sig-plum-dark",        bg: "#F5F0E8", text: "#C070A8" },
  { name: "sig-indigo-dark",      bg: "#F5F0E8", text: "#7878D8" },
  { name: "sig-hunter-dark",      bg: "#F5F0E8", text: "#4CA862" },
  { name: "sig-malachite-dark",   bg: "#F5F0E8", text: "#38B088" },
  { name: "sig-cobalt-dark",      bg: "#F5F0E8", text: "#6890E0" },
  { name: "sig-mauve-dark",       bg: "#F5F0E8", text: "#C888B4" },

  // ── Editorial palettes ──
  // Dark: dark bg + cream text
  { name: "ft-dark",          bg: "#0D1A2E", text: "#F0EDE8" },
  { name: "kinfolk-dark",     bg: "#141A14", text: "#EAE8E0" },
  { name: "terminal-dark",    bg: "#050D07", text: "#C8E8D0" },
  { name: "cereal-dark",      bg: "#0A1018", text: "#E4E8EE" },
  { name: "monocle-dark",     bg: "#08101E", text: "#EAECF4" },
  { name: "aesop-dark",       bg: "#0E100A", text: "#E8E4D8" },
  { name: "wall-dark",        bg: "#070C0C", text: "#D8F0EE" },
  { name: "natgeo-dark",      bg: "#050A14", text: "#D8E4F0" },
  { name: "orion-dark",       bg: "#071210", text: "#D0EAE2" },
  { name: "a24-dark",         bg: "#05080E", text: "#D0D8E8" },
  { name: "ny-dark",          bg: "#06091A", text: "#E8E8DC" },
  { name: "heritage-dark",    bg: "#080C08", text: "#E0E8DC" },
  { name: "nocturne-dark",    bg: "#080818", text: "#E4E4F0" },
  { name: "storm-dark",       bg: "#0A0C14", text: "#E4E8F2" },
  // Light: light bg + structural accent
  { name: "ft-light",         bg: "#FFF1E5", text: "#0F5499" },
  { name: "kinfolk-light",    bg: "#F4F0E8", text: "#5A7A5E" },
  { name: "terminal-light",   bg: "#F0F8F2", text: "#1A6B35" },
  { name: "cereal-light",     bg: "#F2F4F8", text: "#2E4A5E" },
  { name: "monocle-light",    bg: "#F0F2F8", text: "#1A2850" },
  { name: "aesop-light",      bg: "#F5F2E8", text: "#4A5A28" },
  { name: "wall-light",       bg: "#EEF7F6", text: "#1A5C54" },
  { name: "natgeo-light",     bg: "#EDF3FB", text: "#0E3A6E" },
  { name: "orion-light",      bg: "#EAF7F3", text: "#1A6250" },
  { name: "a24-light",        bg: "#EEF2FA", text: "#0E3460" },
  { name: "ny-light",         bg: "#F0EEE4", text: "#1B2D45" },
  { name: "heritage-light",   bg: "#F0EFE8", text: "#2D4A3E" },
  { name: "nocturne-light",   bg: "#F2EFE8", text: "#2A2870" },
  { name: "storm-light",      bg: "#F2F4F8", text: "#3A506A" },
];

const SIZE = 512;
const FONT_SIZE = 252;

function makeTree(bg: string, text: string) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        background: bg,
      },
      children: [
        {
          type: "span",
          props: {
            style: {
              fontFamily: "Fraunces",
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: `${FONT_SIZE}px`,
              color: text,
              lineHeight: 1,
              letterSpacing: "-0.03em",
            },
            children: "E",
          },
        },
        {
          type: "span",
          props: {
            style: {
              fontFamily: "Fraunces",
              fontWeight: 800,
              fontStyle: "italic",
              fontSize: `${FONT_SIZE}px`,
              color: text,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginLeft: "-0.02em",
            },
            children: "Q",
          },
        },
        {
          type: "span",
          props: {
            style: {
              fontFamily: "Fraunces",
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: `${FONT_SIZE}px`,
              color: text,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginLeft: "-0.09em",
            },
            children: ".",
          },
        },
      ],
    },
  };
}

console.log(`Generating ${palettes.length} icons → public/icon-palette/\n`);

for (const p of palettes) {
  const svg = await satori(makeTree(p.bg, p.text), { width: SIZE, height: SIZE, fonts });
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 512 } });
  const outPath = path.join(outDir, `eq-${p.name}.png`);
  fs.writeFileSync(outPath, resvg.render().asPng());
  console.log(`  ✓  eq-${p.name}.png  (bg: ${p.bg}  text: ${p.text})`);
}

console.log(`\nDone. Files in public/icon-palette/`);
