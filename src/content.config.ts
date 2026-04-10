import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writingCollection = defineCollection({
 loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  writing: writingCollection,
};
