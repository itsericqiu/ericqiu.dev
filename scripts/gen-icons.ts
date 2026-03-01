/**
 * Generates favicon.png (256×256) and icon-512.png (512×512)
 * Colors driven by src/palette.ts — change the palette there, re-run this script.
 *
 * Run: npm run gen:icons
 */

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { icon } from "../src/palette";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const frauncesData = fs.readFileSync(path.join(root, "src/assets/fraunces-800.ttf"));
const frauncesItalicData = fs.readFileSync(path.join(root, "src/assets/fraunces-800-italic.ttf"));

const fonts = [
  { name: "Fraunces", data: frauncesData, weight: 800 as const, style: "normal" as const },
  { name: "Fraunces", data: frauncesItalicData, weight: 800 as const, style: "italic" as const },
];

const SIZE = 512;
const FONT_SIZE = 252;

const tree = {
  type: "div",
  props: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: `${SIZE}px`,
      height: `${SIZE}px`,
      background: icon.bg,
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
            color: icon.text,
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
            color: icon.text,
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
            color: icon.text,
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

const svg = await satori(tree, { width: SIZE, height: SIZE, fonts });

const resvg512 = new Resvg(svg, { fitTo: { mode: "width", value: 512 } });
fs.writeFileSync(path.join(root, "public/icon-512.png"), resvg512.render().asPng());
console.log("✓ public/icon-512.png");

const resvg256 = new Resvg(svg, { fitTo: { mode: "width", value: 256 } });
fs.writeFileSync(path.join(root, "public/favicon.png"), resvg256.render().asPng());
console.log("✓ public/favicon.png");

// iOS Safari requests these paths directly (ignores <link> tags; probes legacy names too)
const resvg180 = new Resvg(svg, { fitTo: { mode: "width", value: 180 } });
const png180 = resvg180.render().asPng();
fs.writeFileSync(path.join(root, "public/apple-touch-icon.png"), png180);
console.log("✓ public/apple-touch-icon.png");
fs.writeFileSync(path.join(root, "public/apple-touch-icon-precomposed.png"), png180);
console.log("✓ public/apple-touch-icon-precomposed.png");

const resvg120 = new Resvg(svg, { fitTo: { mode: "width", value: 120 } });
const png120 = resvg120.render().asPng();
fs.writeFileSync(path.join(root, "public/apple-touch-icon-120x120.png"), png120);
console.log("✓ public/apple-touch-icon-120x120.png");
fs.writeFileSync(path.join(root, "public/apple-touch-icon-120x120-precomposed.png"), png120);
console.log("✓ public/apple-touch-icon-120x120-precomposed.png");

// Android Chrome / PWA manifest
const resvg192 = new Resvg(svg, { fitTo: { mode: "width", value: 192 } });
fs.writeFileSync(path.join(root, "public/icon-192.png"), resvg192.render().asPng());
console.log("✓ public/icon-192.png");
