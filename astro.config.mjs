import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://allprocleaning.com",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [sitemap()],
  // The /api/quote endpoint is a public lead form with no authenticated state
  // to attack. We rely on honeypot + consent + rate-limit + CSP form-action
  // 'self' instead of Astro's same-origin check, which would also reject
  // legitimate form-encoded POSTs from the noscript fallback in some setups.
  security: {
    checkOrigin: false,
  },
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
