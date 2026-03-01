import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import type { APIRoute } from "astro";
import { dark } from "../palette";
import { site } from "../site";

export const GET: APIRoute = async () => {
  const frauncesData = fs.readFileSync(
    path.join(process.cwd(), "src/assets/fraunces-800.ttf")
  );
  const frauncesItalicData = fs.readFileSync(
    path.join(process.cwd(), "src/assets/fraunces-800-italic.ttf")
  );
  const spaceMonoData = fs.readFileSync(
    path.join(process.cwd(), "src/assets/space-mono-400.ttf")
  );

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "row",
          width: "1200px",
          height: "630px",
          background: dark.bgPrimary,
        },
        children: [
          // Amber accent stripe
          {
            type: "div",
            props: {
              style: {
                width: "12px",
                height: "630px",
                background: dark.accent,
                flexShrink: 0,
              },
            },
          },
          // Content column
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                padding: "80px 100px",
              },
              children: [
                // Kicker
                {
                  type: "span",
                  props: {
                    style: {
                      fontFamily: "Space Mono",
                      fontSize: "24px",
                      fontWeight: 400,
                      color: dark.accent,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "32px",
                    },
                    children: site.kicker,
                  },
                },
                // Name block
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "48px",
                    },
                    children: [
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Fraunces",
                            fontSize: "96px",
                            fontWeight: 800,
                            color: dark.textPrimary,
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                          },
                          children: site.nameFirst,
                        },
                      },
                      {
                        type: "span",
                        props: {
                          style: {
                            fontFamily: "Fraunces",
                            fontStyle: "italic",
                            fontSize: "96px",
                            fontWeight: 800,
                            color: dark.textPrimary,
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                          },
                          children: site.nameLast,
                        },
                      },
                    ],
                  },
                },
                // Domain
                {
                  type: "span",
                  props: {
                    style: {
                      fontFamily: "Space Mono",
                      fontSize: "22px",
                      fontWeight: 400,
                      color: dark.textMuted,
                      letterSpacing: "0.03em",
                    },
                    children: site.domain,
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
          name: "Fraunces",
          data: frauncesData,
          weight: 800,
          style: "normal",
        },
        {
          name: "Fraunces",
          data: frauncesItalicData,
          weight: 800,
          style: "italic",
        },
        {
          name: "Space Mono",
          data: spaceMonoData,
          weight: 400,
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

  return new Response(pngBuffer as any, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
