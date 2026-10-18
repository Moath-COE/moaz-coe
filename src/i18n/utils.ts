import type { CollectionEntry } from 'astro:content';
import type { Lang } from '@types';
import { translatedPosts } from './routes';

export function localize(locale: Lang, path = ''): string {
	const part = path.replace(/^\/+|\/+$/g, '');
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return `${base}${locale === 'en' ? '/en' : ''}/${part}${part && part !== 'rss.xml' ? '/' : ''}`;
}

export function publicAsset(path: string): string {
	return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function postSlug(post: CollectionEntry<'blog'>): string {
	return post.id.split('/').slice(1).join('/');
}

export function postUrl(post: CollectionEntry<'blog'>): string {
	return localize(post.data.locale, `blog/${postSlug(post).split('/').map(encodeURIComponent).join('/')}`);
}

export function alternateUrl(
	pathname: string,
	from: Lang,
	to: Lang,
	posts: CollectionEntry<'blog'>[],
): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const withoutBase = base && (pathname === base || pathname.startsWith(`${base}/`))
		? pathname.slice(base.length)
		: pathname;
	const path = withoutBase.replace(/^\/en(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
	if (!path) return localize(to);
	if (path === 'about') return localize(to, 'about');
	if (path === 'blog' || path.startsWith('blog/page/')) return localize(to, 'blog');
	if (path.startsWith('tags/')) {
		const tag = decodeURIComponent(path.split('/')[1] ?? '');
		return posts.some((post) => post.data.locale === to && post.data.tags.includes(tag))
			? localize(to, `tags/${encodeURIComponent(tag)}`)
			: localize(to, 'blog');
	}
	if (path.startsWith('blog/')) {
		const slug = decodeURIComponent(path.slice('blog/'.length));
		const translated = translatedPosts.find((pair) => pair[from] === slug)?.[to] ?? slug;
		const counterpart = posts.find((post) => post.data.locale === to && postSlug(post) === translated);
		return counterpart ? postUrl(counterpart) : localize(to, 'blog');
	}
	return localize(to);
}
