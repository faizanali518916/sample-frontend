import { cookies } from 'next/headers';
import { fetchBlogs, fetchCategories } from '@/lib/api';
import { getLocaleFromCookieStore } from '@/lib/locale';
import BlogListPage from '@/components/blog/BlogListPage';
import { getMetadataForPath } from '@/lib/metadata-config';

export const dynamic = 'force-dynamic';

export const metadata = getMetadataForPath('/blogs');

export default async function BlogsRoute({ searchParams }) {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const resolvedSearchParams = (await searchParams) || {};
	const initialCategory = String(resolvedSearchParams?.category || 'all');

	let blogs = [];
	let categories = [];

	try {
		blogs = await fetchBlogs(locale);
	} catch {
		blogs = [];
	}

	try {
		categories = await fetchCategories(locale);
	} catch {
		categories = [];
	}

	return <BlogListPage blogs={blogs} categories={categories} locale={locale} initialCategory={initialCategory} />;
}
