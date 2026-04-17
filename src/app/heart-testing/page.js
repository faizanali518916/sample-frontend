import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import {
	TestingServiceHero,
	TestingServiceHowItWorks,
	TestingServiceItems,
	TestingServiceFinalCta,
} from '@/components/testing-services/TestingServiceTemplate';
import { loadMessages } from '@/i18n/loadMessages';
import { getLocaleFromCookieStore } from '@/lib/locale';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.HeartTestingPage?.metadata?.title,
		description: messages?.HeartTestingPage?.metadata?.description,
	};
}

const pageKey = 'HeartTestingPage';

export default async function HeartTestingPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale });

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />
			<TestingServiceHowItWorks t={t} pageKey={pageKey} />
			<TestingServiceItems t={t} pageKey={pageKey} sectionKey="cardiacTests" itemsKey="tests" />
			<TestingServiceFinalCta
				title="Take Control of Your Heart Health"
				description="Get comprehensive cardiac testing with results in 1-3 days. Know your risk factors."
				buttonText="Schedule Heart Testing"
			/>
		</main>
	);
}
