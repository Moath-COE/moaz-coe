// Cloudflare Pages Function for the Arabic home page "/" only (the file name sets the route).
// It sends visitors who prefer English to /en/; every other page is served as a static file.

// An explicit choice from the language switch (the "lang" cookie) wins. Otherwise Arabic is chosen
// only when the browser lists it above English; a browser that lists neither gets English.
function prefersEnglish(request) {
	const chosen = request.headers.get('Cookie')?.match(/(?:^|;\s*)lang=(ar|en)(?:;|$)/)?.[1];
	if (chosen) return chosen === 'en';
	// Crawlers usually send no Accept-Language; they get the default Arabic page.
	const header = request.headers.get('Accept-Language');
	if (!header) return false;
	const ranked = header
		.split(',')
		.map((part) => {
			const [tag, ...params] = part.trim().toLowerCase().split(';');
			const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
			return { lang: tag.split('-')[0], q: q ? Number(q.slice(2)) || 0 : 1 };
		})
		.filter(({ q }) => q > 0)
		.sort((a, b) => b.q - a.q);
	return ranked.find(({ lang }) => lang === 'ar' || lang === 'en')?.lang !== 'ar';
}

export async function onRequest({ request, next }) {
	if (prefersEnglish(request)) {
		const url = new URL(request.url);
		url.pathname = '/en/';
		return new Response(null, {
			status: 302,
			headers: { Location: url.href, Vary: 'Accept-Language, Cookie', 'Cache-Control': 'private, no-store' },
		});
	}
	const asset = await next();
	// The home page depends on these headers, so caches must not hand one visitor's answer to another.
	const response = new Response(asset.body, asset);
	response.headers.append('Vary', 'Accept-Language, Cookie');
	return response;
}
