import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./content" }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      thumbnail: image().optional(),
      thumbnailSource: z.string().nullable().optional(),
      tags: z.array(z.string()),
      createdAt: z.string(),
      updatedAt: z.string().nullable().optional(),
      featured: z.boolean().nullable().optional().default(false),
      locale: z.enum(["en"]).optional(),
    }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./portfolio" }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      thumbnail: image().optional(),
      createdAt: z.string(),
      updatedAt: z.string().nullable().optional(),
      featured: z.boolean().nullable().optional().default(false),
    }),
});

export const collections = { blog, portfolio };
