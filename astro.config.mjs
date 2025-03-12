// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },

  site: "https://nuexq.vercel.app",
  integrations: [mdx(), sitemap()],
});
