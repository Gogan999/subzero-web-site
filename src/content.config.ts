import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// News posts: one Markdown file per post in src/content/news/.
// File names start with the date (2026-03-28-my-post.md); the URL drops it (/news/my-post/).
const news = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/news',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

// Photo albums: one YAML file per album in src/content/albums/.
// Photos live in src/assets/gallery/<album-file-name>/.
const albums = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    cover: z.string().optional(),
    captions: z.record(z.string(), z.string()).default({}),
  }),
});

const event = z.object({
  name: z.string(),
  location: z.string().optional(),
  rank: z.string().optional(),
  record: z.string().optional(),
  result: z.string().optional(),
});

const seasons = defineCollection({
  loader: file('./src/data/seasons.yaml'),
  schema: z.object({
    game: z.string(),
    robot: z.string().optional(),
    summary: z.string().optional(),
    highlight: z.boolean().default(false),
    album: z.string().optional(),
    events: z.array(event).default([]),
    awards: z.array(z.object({ name: z.string(), event: z.string() })).default([]),
  }),
});

const robots = defineCollection({
  loader: file('./src/data/robots.yaml'),
  schema: z.object({
    name: z.string().optional(),
    game: z.string(),
    photo: z.string().optional(),
    summary: z.string().optional(),
    specs: z.array(z.string()).default([]),
    binder: z.string().optional(),
    video: z.url().optional(),
    onshape: z.url().optional(),
  }),
});

// Sponsors: show a name, a logo, or both, sized by tier (or an explicit size).
const sponsors = defineCollection({
  loader: file('./src/data/sponsors.yaml'),
  schema: z.object({
    name: z.string(),
    status: z.enum(['current', 'past']),
    url: z.url().optional(),
    logo: z.string().optional(),
    display: z.enum(['logo', 'name', 'both']).optional(),
    tier: z.enum(['dynasty', 'diamond', 'platinum', 'gold', 'silver']).optional(),
    size: z.enum(['xl', 'lg', 'md', 'sm']).optional(),
  }),
});

const people = defineCollection({
  loader: file('./src/data/people.yaml'),
  schema: z.object({
    name: z.string(),
    group: z.enum(['coach', 'mentor', 'consultant']),
    focus: z.string().optional(),
    job: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { news, albums, seasons, robots, sponsors, people };
