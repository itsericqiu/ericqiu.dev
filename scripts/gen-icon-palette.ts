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
