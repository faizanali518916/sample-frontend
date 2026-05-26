import { fetchAllMetadata, SITE_URL } from '@/lib/seo';
import { fetchBlogs, fetchCategories, fetchProducts } from '@/lib/api';

function toSitemapEntry(path, updatedAt) {
	const pathname = path === '/' ? '' : path;

	return {
		url: `${SITE_URL}${pathname}`,
		lastModified: updatedAt ? new Date(updatedAt) : new Date(),
	};
}

export default async function sitemap() {
	const [seoRows, products, categories, blogs] = await Promise.all([
		fetchAllMetadata().catch(() => []),
		fetchProducts('en').catch(() => []),
		fetchCategories('en').catch(() => []),
		fetchBlogs('en').catch(() => []),
	]);

	const entries = new Map();

	for (const row of seoRows || []) {
		if (row?.path) {
			entries.set(row.path, toSitemapEntry(row.path, row.updated_at || row.created_at));
		}
	}

	for (const product of products || []) {
		entries.set(`/testing-services/${product.id}`, toSitemapEntry(`/testing-services/${product.id}`));
	}

	for (const category of categories || []) {
		entries.set(`/categories/${category.id}`, toSitemapEntry(`/categories/${category.id}`));
	}

	for (const blog of blogs || []) {
		if (blog?.slug) {
			entries.set(`/blogs/${blog.slug}`, toSitemapEntry(`/blogs/${blog.slug}`, blog.updated_at || blog.created_at));
		}
	}

	return Array.from(entries.values());
}
