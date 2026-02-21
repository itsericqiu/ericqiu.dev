import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ericqiu.dev",
  integrations: [sitemap()],
});
