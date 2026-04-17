import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { loadMessages } from '@/i18n/loadMessages';

const locales = ['en', 'es'];
const defaultLocale = 'en';

export default getRequestConfig(async () => {
	const cookieStore = await cookies();
	const requestedLocale = cookieStore.get('NEXT_LOCALE')?.value;
	const locale = hasLocale(locales, requestedLocale) ? requestedLocale : defaultLocale;

	return {
		locale,
		messages: await loadMessages(locale),
	};
});
