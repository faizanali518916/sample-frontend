import { cookies } from 'next/headers';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { generateMetadataFor } from '@/lib/seo';

export const generateMetadata = generateMetadataFor('/checkout');

export default function CheckoutRoute() {
	return <CheckoutPage />;
}
