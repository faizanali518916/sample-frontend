import { cookies } from 'next/headers';
import TestingServicesPage from '@/components/testing-services/TestingServicesPage';
import { fetchProducts } from '@/lib/api';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { generateMetadataFor } from '@/lib/seo';

export const generateMetadata = generateMetadataFor('/testing-services');

export const dynamic = 'force-dynamic';

export default async function TestingServicesRoute({ searchParams }) {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const resolvedSearchParams = (await searchParams) || {};
	const initialSearch = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';

	let products = [];

	try {
		products = await fetchProducts(locale);
	} catch {
		products = [];
	}

	return (
		<TestingServicesPage
			key={`${locale}:${initialSearch}`}
			products={products}
			locale={locale}
			initialSearch={initialSearch}
		/>
	);
}
