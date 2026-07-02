import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guideSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string().default('Privacy Toolkit'),
    image: z.string().optional()
});

const guide = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guide" }),
  schema: guideSchema
});

const guide_en = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guide-en" }),
  schema: guideSchema
});

export const collections = { guide, guide_en };
