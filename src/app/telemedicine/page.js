import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { loadMessages } from '@/i18n/loadMessages';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.TelemedicineServicePage?.metadata?.title,
		description: messages?.TelemedicineServicePage?.metadata?.description,
	};
}

export default async function TelemedicineServicePage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale, namespace: 'TelemedicineServicePage' });

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-2xl text-center">
				<div className="mb-8">
					<h1 className="font-display mb-4 text-4xl font-bold text-slate-900 sm:text-5xl">{t('title')}</h1>
					<p className="text-var-tl-primary mb-6 text-xl font-semibold sm:text-2xl">{t('subtitle')}</p>
					<p className="mb-8 text-base text-slate-700 sm:text-lg">{t('description')}</p>
					<div className="bg-var-tl-primary inline-block rounded-lg px-6 py-3 font-semibold text-white">
						{t('comingSoon')}
					</div>
				</div>
			</div>
		</div>
	);
}
