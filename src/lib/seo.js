// Server-side helper to fetch SEO metadata from backend API
export async function fetchMetadata(path) {
	const BE = process.env.BE_URL || process.env.NEXT_PUBLIC_BE_URL || 'http://localhost:3000';
	try {
		const res = await fetch(`${BE}/api/seo?path=${encodeURIComponent(path)}`, { cache: 'no-store' });
		if (!res.ok) return null;
		const json = await res.json();
		return json;
	} catch (err) {
		// swallow and return null so pages can fallback
		return null;
	}
}

// Returns an async `generateMetadata` function bound to `path` for easy reuse in pages
export function generateMetadataForPath(path) {
	return async function generateMetadata() {
		const meta = await fetchMetadata(path);
		return {
			title: meta?.title || '24-7 Labs',
			description: meta?.description || '',
		};
	};
}

// Generic factory: accepts either a static path string or a mapper function
// The mapper receives the same context object Next passes to `generateMetadata`, e.g. { params, searchParams }
export function generateMetadataFor(pathOrMapper) {
	if (typeof pathOrMapper === 'string') return generateMetadataForPath(pathOrMapper);
	return async function generateMetadata(ctx) {
		const resolved = typeof pathOrMapper === 'function' ? pathOrMapper(ctx) : pathOrMapper;
		const meta = await fetchMetadata(resolved);
		return {
			title: meta?.title || '24-7 Labs',
			description: meta?.description || '',
		};
	};
}
