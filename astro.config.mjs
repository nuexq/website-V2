import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkHint from "remark-hint";

import sitemap from "@astrojs/sitemap";
import { siteConfig } from "./src/config/site";

import alpinejs from "@astrojs/alpinejs";

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
      langs: ["js", "ts", "html", "css", "rust"],
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerNotationHighlight(),
      ],
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
  integrations: [
    mdx(),
    sitemap(),
    alpinejs({ entrypoint: "./alpine.config.ts" }),
  ],
});
