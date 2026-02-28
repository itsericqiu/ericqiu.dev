import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site = process.env.CF_PAGES_BRANCH === "main"
  ? "https://ericqiu.dev"
  : (process.env.CF_PAGES_URL ?? "https://ericqiu.dev");

export default defineConfig({
  site,
  integrations: [sitemap()],
});
