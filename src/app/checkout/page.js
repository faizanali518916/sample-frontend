import { cookies } from 'next/headers';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { getMetadataForPath } from '@/lib/metadata-config';

export const metadata = getMetadataForPath('/checkout');

export default function CheckoutRoute() {
	return <CheckoutPage />;
}
