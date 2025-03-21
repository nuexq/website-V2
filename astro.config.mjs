import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkHint from "remark-hint";

import sitemap from "@astrojs/sitemap";
import { siteConfig } from "./src/config/site";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },

  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
    },
    remarkPlugins: [remarkHint],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: "subheading-anchor",
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },

  site: `${siteConfig.url}/`,
  integrations: [mdx(), sitemap()],
});
