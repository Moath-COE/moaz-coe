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

// An image alone in its paragraph with a title, ![alt](path "Caption"), becomes a wide figure with that caption.
function imageFigures() {
	return (tree) => {
		const walk = (node) => {
			node.children?.forEach((child, i) => {
				if (child.type !== 'element' || child.tagName !== 'p') return walk(child);
				const content = child.children.filter((n) => !(n.type === 'text' && !n.value.trim()));
				const [img] = content;
				if (content.length !== 1 || img.type !== 'element' || img.tagName !== 'img' || !img.properties?.title) return;
				const caption = String(img.properties.title);
				delete img.properties.title;
				node.children[i] = {
					type: 'element',
					tagName: 'figure',
					properties: {},
					children: [img, { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] }],
				};
			});
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
		rehypePlugins: [localizeFootnotes, imageFigures],
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
