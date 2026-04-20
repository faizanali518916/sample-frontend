import { cookies } from 'next/headers';
import { fetchBlogs, fetchCategories } from '@/lib/api';
import { loadMessages } from '@/i18n/loadMessages';
import { getLocaleFromCookieStore } from '@/lib/locale';
import BlogListPage from '@/components/blog/BlogListPage';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.BlogListPage?.metadata?.title,
		description: messages?.BlogListPage?.metadata?.description,
	};
}

export default async function BlogsRoute({ searchParams }) {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const resolvedSearchParams = (await searchParams) || {};
	const initialCategory = String(resolvedSearchParams?.category || 'all');

	let blogs = [];
	let categories = [];

	try {
		blogs = await fetchBlogs();
	} catch {
		blogs = [];
	}

	try {
		categories = await fetchCategories();
	} catch {
		categories = [];
	}

	return <BlogListPage blogs={blogs} categories={categories} locale={locale} initialCategory={initialCategory} />;
}
