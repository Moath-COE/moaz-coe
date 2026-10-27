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

// The page path without the base, the /en prefix or surrounding slashes, e.g. "blog/my-post".
function pagePath(pathname: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const withoutBase = base && (pathname === base || pathname.startsWith(`${base}/`))
		? pathname.slice(base.length)
		: pathname;
	return withoutBase.replace(/^\/en(?=\/|$)/, '').replace(/^\/+|\/+$/g, '');
}

function counterpart(path: string, from: Lang, to: Lang, posts: CollectionEntry<'blog'>[]): string | undefined {
	if (!path) return localize(to);
	if (path === 'about' || path === 'blog') return localize(to, path);
	if (/^tags\/[^/]+$/.test(path)) {
		const tag = decodeURIComponent(path.slice('tags/'.length));
		return posts.some((post) => post.data.locale === to && post.data.tags.includes(tag))
			? localize(to, `tags/${encodeURIComponent(tag)}`)
			: undefined;
	}
	if (path.startsWith('blog/') && !path.startsWith('blog/page/')) {
		const slug = decodeURIComponent(path.slice('blog/'.length));
		const translated = translatedPosts.find((pair) => pair[from] === slug)?.[to] ?? slug;
		const post = posts.find((post) => post.data.locale === to && postSlug(post) === translated);
		return post && postUrl(post);
	}
}

// The same page in the other language, or undefined when there is no exact equivalent (used for hreflang).
export function counterpartUrl(pathname: string, from: Lang, to: Lang, posts: CollectionEntry<'blog'>[]): string | undefined {
	return counterpart(pagePath(pathname), from, to, posts);
}

// Where the language switch goes: the counterpart (a paginated listing's is the other language's
// first page), otherwise the other blog index for posts and listings, or the other home page.
export function alternateUrl(
	pathname: string,
	from: Lang,
	to: Lang,
	posts: CollectionEntry<'blog'>[],
): string {
	const path = pagePath(pathname);
	const firstPage = path.replace(/^blog\/page\/\d+$/, 'blog').replace(/^(tags\/[^/]+)\/\d+$/, '$1');
	const listing = path.startsWith('blog/') || path.startsWith('tags/');
	return counterpart(firstPage, from, to, posts) ?? localize(to, listing ? 'blog' : '');
}
