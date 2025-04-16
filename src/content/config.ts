import { defineCollection, z } from "astro:content";

const writingCollection = defineCollection({
  type: "content",
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
