// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// GFM footnotes are labelled in English; translate the label and back-links in Arabic posts.
function localizeFootnotes() {
	return (tree, file) => {
		if (!/[\\/]blog[\\/]ar[\\/]/.test(String(file.path ?? file.history?.[0] ?? ''))) return;
		const walk = (node) => {
			if (node.type === 'element') {
				if (node.properties?.id === 'footnote-label') node.children = [{ type: 'text', value: 'الحواشي' }];
				const label = node.properties?.ariaLabel;
				if (typeof label === 'string' && label.startsWith('Back to reference')) {
					node.properties.ariaLabel = label.replace('Back to reference', 'العودة إلى الإشارة');
				}
			}
			node.children?.forEach(walk);
		};
		walk(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	// SITE_URL / SITE_BASE can override these, e.g. to preview a GitHub Pages project URL.
	site: process.env.SITE_URL || 'https://moaz-coe.com/',
	base: process.env.SITE_BASE || '/',

	integrations: [mdx(), sitemap()],

	markdown: {
		rehypePlugins: [localizeFootnotes],
		shikiConfig: {
			themes: { light: 'vitesse-light', dark: 'vitesse-dark' },
			defaultColor: false,
		},
	},

	i18n: {
		defaultLocale: 'ar',
		locales: ['ar', 'en'],
		routing: {
			prefixDefaultLocale: false,
		},
	}

});
