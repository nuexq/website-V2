import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content", // For Markdown or MDX files
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
