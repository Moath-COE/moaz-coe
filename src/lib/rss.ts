import rss from '@astrojs/rss';
import type { Lang } from '@types';
import { publishedPosts } from './blog';
import { site } from '@i18n/sections';
import { localize, postUrl } from '@i18n/utils';

export async function feed(locale: Lang, siteUrl: URL) {
	const posts = await publishedPosts(locale);
	return rss({
		title: site.title[locale],
		description: site.description[locale],
		site: new URL(localize(locale), siteUrl),
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: postUrl(post),
		})),
	});
}
