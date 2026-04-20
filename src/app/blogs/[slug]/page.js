import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import BlogDetailPage from '@/components/blog/BlogDetailPage';
import { fetchBlogs, fetchCategories } from '@/lib/api';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { loadMessages } from '@/i18n/loadMessages';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);
	const resolvedParams = await params;
	const slug = resolvedParams?.slug;

	let blogTitle = messages?.BlogDetailPage?.fallbackTitle;
	try {
		const blogs = await fetchBlogs();
		const blog = blogs.find((entry) => entry.slug === slug);
		if (blog?.title) {
			blogTitle = blog.title;
		}
	} catch {
		blogTitle = messages?.BlogDetailPage?.fallbackTitle;
	}

	return {
		title: messages?.BlogDetailPage?.metadata?.title?.replace('{title}', blogTitle),
		description: messages?.BlogDetailPage?.metadata?.description,
	};
}

export default async function BlogDetailsRoute({ params }) {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const resolvedParams = await params;
	const slug = resolvedParams?.slug;

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

	const blog = blogs.find((entry) => entry.slug === slug);
	if (!blog) {
		notFound();
	}

	const relatedCategoryIds = new Set((blog.categories || []).map((item) => String(item.id)));
	const recentPosts = blogs
		.filter((entry) => String(entry.id) !== String(blog.id))
		.sort((left, right) => new Date(right.created_at || 0).valueOf() - new Date(left.created_at || 0).valueOf())
		.sort((left, right) => {
			const leftHasCommon = (left.categories || []).some((category) => relatedCategoryIds.has(String(category.id)));
			const rightHasCommon = (right.categories || []).some((category) => relatedCategoryIds.has(String(category.id)));
			return Number(rightHasCommon) - Number(leftHasCommon);
		})
		.slice(0, 4);

	return <BlogDetailPage blog={blog} categories={categories} recentPosts={recentPosts} locale={locale} />;
}
