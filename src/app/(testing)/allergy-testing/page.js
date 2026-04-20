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
		title: messages?.AllergyTestingPage?.metadata?.title,
		description: messages?.AllergyTestingPage?.metadata?.description,
	};
}

const pageKey = 'AllergyTestingPage';

export default async function AllergyTestingPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale });

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />
			<TestingServiceHowItWorks t={t} pageKey={pageKey} />
			<TestingServiceItems t={t} pageKey={pageKey} sectionKey="allergyPanels" itemsKey="panels" />
			<TestingServiceFinalCta
				title="Find Your Allergy Triggers"
				description="Get comprehensive allergy testing and start feeling better today."
				buttonText="Schedule Allergy Testing"
			/>
		</main>
	);
}
