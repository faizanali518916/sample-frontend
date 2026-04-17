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
		title: messages?.DnaTestingPage?.metadata?.title,
		description: messages?.DnaTestingPage?.metadata?.description,
	};
}

const pageKey = 'DnaTestingPage';

export default async function DnaTestingPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale });

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />
			<TestingServiceHowItWorks t={t} pageKey={pageKey} />
			<TestingServiceItems t={t} pageKey={pageKey} sectionKey="dnaTests" itemsKey="tests" />
			<TestingServiceFinalCta
				title="Ready to get tested?"
				description="Schedule your DNA test at 24-7 Labs today. No insurance or doctor referral required."
				buttonText="Schedule Your Test"
			/>
		</main>
	);
}
