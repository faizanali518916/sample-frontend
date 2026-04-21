import { cookies } from 'next/headers';
import CheckoutPage from '@/components/checkout/CheckoutPage';
import { loadMessages } from '@/i18n/loadMessages';
import { getLocaleFromCookieStore } from '@/lib/locale';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.CheckoutPage?.metadata?.title,
		description: messages?.CheckoutPage?.metadata?.description,
	};
}

export default function CheckoutRoute() {
	return <CheckoutPage />;
}
