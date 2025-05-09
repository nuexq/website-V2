import fs from "node:fs";
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
import { fnRender } from "./src/OgRender.tsx";
import { siteConfig } from "./src/config/site";

import opengraphImages from "astro-opengraph-images";

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
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Crimson Pro",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-400-normal.woff",
            ),
          },
        ],
      },
      render: fnRender,
    }),
  ],
});
