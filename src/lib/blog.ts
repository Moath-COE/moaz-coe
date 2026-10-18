import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '@types';

export const pageSize = 6;

export async function publishedPosts(locale?: Lang): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', ({ id, data }) =>
		!data.draft && (!locale || (data.locale === locale && id.startsWith(`${locale}/`))),
	);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function tagsFor(posts: CollectionEntry<'blog'>[]): string[] {
	return [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
}

export function readingMinutes(post: CollectionEntry<'blog'>): number {
	const words = (post.body ?? '').replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

export function groupByYear(posts: CollectionEntry<'blog'>[]): [number, CollectionEntry<'blog'>[]][] {
	const groups = new Map<number, CollectionEntry<'blog'>[]>();
	for (const post of posts) {
		const year = post.data.pubDate.getUTCFullYear();
		groups.set(year, [...(groups.get(year) ?? []), post]);
	}
	return [...groups];
}
