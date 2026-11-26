import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseWritingSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  legacyUrl: z.string().optional(),
});

const essays = defineCollection({
  loader: glob({ base: './src/content/writing/essays', pattern: '**/*.{md,mdx}' }),
  schema: baseWritingSchema.extend({
    type: z.literal('essay'),
  }),
});

const travel = defineCollection({
  loader: glob({ base: './src/content/writing/travel', pattern: '**/*.{md,mdx}' }),
  schema: baseWritingSchema.extend({
    type: z.literal('travel'),
    location: z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      country: z.string().min(1),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
    }),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    period: z.string(),
    role: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    links: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
  }),
});

const timeline = defineCollection({
  loader: glob({ base: './src/content/timeline', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    organisation: z.string().optional(),
    start: z.string(),
    end: z.string().optional(),
    side: z.enum(['academic', 'other']),
    category: z.string().min(1),
    showOnMobile: z.boolean().default(true),
    summary: z.string(),
    href: z.string().optional(),
    tags: z.array(z.string()).default([]),
    legacyId: z.string().optional(),
  }),
});

export const collections = { essays, travel, projects, timeline };
