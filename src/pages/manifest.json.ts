import type { APIRoute } from "astro";
import { light } from "../palette";
import { site } from "../site";

export const GET: APIRoute = () => {
  const manifest = {
    name: site.pageTitle,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: light.bgPrimary,
    theme_color: light.themeColor,
    icons: [
      { src: "/favicon.png",  sizes: "256x256", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "any",     type: "image/png", purpose: "any maskable" },
    ],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { "Content-Type": "application/manifest+json" },
  });
};
