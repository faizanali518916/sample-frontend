import { cookies } from 'next/headers';
import TestingServicesPage from '@/components/testing-services/TestingServicesPage';
import { fetchProducts } from '@/lib/api';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { getMetadataForPath } from '@/lib/metadata-config';

export const metadata = getMetadataForPath('/testing-services');

export const dynamic = 'force-dynamic';

export default async function TestingServicesRoute() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);

	let products = [];

	try {
		products = await fetchProducts(locale);
	} catch {
		products = [];
	}

	return <TestingServicesPage products={products} locale={locale} />;
}
