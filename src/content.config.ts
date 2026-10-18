import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '{ar,en}/**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		locale: z.enum(['ar', 'en']),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// A path relative to the post, e.g. ../_assets/my-post/cover.jpg
		heroImage: image().optional(),
		kind: z.enum(['engineering', 'business', 'project']).optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
