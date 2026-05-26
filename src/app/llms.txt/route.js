import { fetchAllMetadata, SITE_URL } from '@/lib/seo';

function formatPath(path) {
	return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
}

export async function GET() {
	const rows = (await fetchAllMetadata().catch(() => [])) || [];
	const pages = rows
		.filter((row) => row?.path && row?.title)
		.map((row) => `- [${row.title}](${formatPath(row.path)}): ${row.description || '24-7 Labs page.'}`)
		.join('\n');

	const body = `# 24-7 Labs

> 24-7 Labs provides diagnostic and testing services in Tampa, including DNA, STD, drug, routine blood, and walk-in lab testing.

## Website

- [Home](${SITE_URL})
- [Sitemap](${SITE_URL}/sitemap.xml)

## Pages

${pages || '- [24-7 Labs](' + SITE_URL + '): Diagnostic and testing services in Tampa.'}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
		},
	});
}
