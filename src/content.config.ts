import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().max(70, 'Keep titles under 70 characters so they are not cut off in search'),
    description: z.string().min(70).max(160),
    // Answer-first: the 2-3 sentence direct answer shown at the top of every article.
    summary: z.string().min(60, 'Write a 2-3 sentence direct answer'),
    category: z.enum(['freelancer-finance', 'money', 'tech-ai', 'remote-work', 'health', 'learn']),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    // 'no' shows a "not hands-on tested" label on list/overview posts.
    handsOn: z.enum(['yes', 'no', 'na']).default('na'),
    affiliate: z.boolean().default(false),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
