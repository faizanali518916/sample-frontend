import { cookies } from 'next/headers';
import TestingServicesPage from '@/components/testing-services/TestingServicesPage';
import { fetchProducts } from '@/lib/api';
import { getLocaleFromCookieStore } from '@/lib/locale';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = (await import(`../../../messages/${locale}.json`)).default;

	return {
		title: messages?.TestingServicesPage?.metadata?.title,
		description: messages?.TestingServicesPage?.metadata?.description,
	};
}

export const dynamic = 'force-dynamic';

export default async function TestingServicesRoute() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);

	let products = [];

	try {
		products = await fetchProducts();
	} catch {
		products = [];
	}

	return <TestingServicesPage products={products} locale={locale} />;
}
