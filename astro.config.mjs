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
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 4321,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
