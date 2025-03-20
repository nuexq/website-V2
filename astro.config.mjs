import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import mdx from "@astrojs/mdx";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkHint from "remark-hint";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";

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
    syntaxHighlight: false,
    remarkPlugins: [remarkHint],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "catppuccin-mocha",
          transformers: [
            transformerCopyButton({
              visibility: "always",
              feedbackDuration: 3000,
            }),
          ],
        },
      ],
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

  site: siteConfig.url,
  integrations: [mdx(), sitemap()],
});
