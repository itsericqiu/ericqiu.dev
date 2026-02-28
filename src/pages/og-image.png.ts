import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import type { APIRoute } from "astro";

// Convert emoji character(s) to Twemoji filename (e.g. 👋 → "1f44b")
function emojiToTwemojiFile(emoji: string): string {
  return [...emoji]
    .map((c) => c.codePointAt(0)!.toString(16))
    .filter((hex) => hex !== "fe0f") // strip variation selector
    .join("-");
}

export const GET: APIRoute = async () => {
  // Load bundled Inter Bold font (TTF — woff2 not supported by satori's opentype.js)
  const fontData = fs.readFileSync(
    path.join(process.cwd(), "src/assets/inter-bold.ttf")
  );

  // Load coffee illustration as base64 data URL
  const coffeeBuffer = fs.readFileSync(
    path.join(process.cwd(), "public/coffee-3d.png")
  );
  const coffeeDataUrl = `data:image/png;base64,${coffeeBuffer.toString("base64")}`;

  // Pre-fetch Twemoji SVG for 👋 so loadAdditionalAsset doesn't block per-call
  const waveFile = emojiToTwemojiFile("👋");
  const waveRes = await fetch(
    `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${waveFile}.svg`
  );
  const waveSvg = await waveRes.text();
  const waveDataUrl = `data:image/svg+xml;base64,${Buffer.from(waveSvg).toString("base64")}`;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          width: "1200px",
          height: "630px",
          background: "#000000",
          fontFamily: "Inter",
        },
        children: [
          // Left half — text
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                padding: "60px 50px 60px 72px",
              },
              children: [
                // Hi greeting — emoji rendered as inline img via loadAdditionalAsset
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "72px",
                      fontWeight: 700,
                      color: "#ffffff",
                      lineHeight: 1.1,
                      marginBottom: "16px",
                    },
                    children: [
                      { type: "span", props: { children: "Hi, I'm Eric" } },
                      {
                        type: "img",
                        props: {
                          src: waveDataUrl,
                          style: { width: "72px", height: "72px" },
                        },
                      },
                    ],
                  },
                },
                // Subtitle — water gradient (#2F80ED → #B2FFDA)
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "34px",
                      fontWeight: 700,
                      backgroundImage: "linear-gradient(90deg, #2F80ED 0%, #B2FFDA 100%)",
                      backgroundClip: "text",
                      color: "transparent",
                      lineHeight: 1.3,
                      marginBottom: "32px",
                    },
                    children: "Software Engineer & Coffee Addict",
                  },
                },
                // Domain label
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: "28px",
                      fontWeight: 400,
                      color: "#666666",
                      letterSpacing: "0.05em",
                    },
                    children: "ericqiu.dev",
                  },
                },
              ],
            },
          },
          // Right half — coffee illustration
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "480px",
                padding: "40px 40px 40px 0",
              },
              children: [
                {
                  type: "img",
                  props: {
                    src: coffeeDataUrl,
                    style: {
                      width: "380px",
                      height: "333px",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return new Response(pngBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
