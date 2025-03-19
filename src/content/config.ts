import { defineCollection, z } from "astro:content";

const writingCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    edited: z.coerce.date().optional(),
  }),
});

export const collections = {
  writing: writingCollection,
};
