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
		title: messages?.DrugTestingPage?.metadata?.title,
		description: messages?.DrugTestingPage?.metadata?.description,
	};
}

const pageKey = 'DrugTestingPage';

export default async function DrugTestingPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale });

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />
			<TestingServiceHowItWorks t={t} pageKey={pageKey} />

			{/* Self-Drug Testing Section */}
			<section className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<div className="mx-auto max-w-5xl">
					<h2 className="font-display mb-6 text-3xl font-bold text-slate-900 sm:text-4xl">
						{t('DrugTestingPage.selfDrugTesting.title')}
					</h2>
					<p className="text-base leading-relaxed text-slate-700 sm:text-lg">
						{t('DrugTestingPage.selfDrugTesting.description')}
					</p>
				</div>
			</section>

			<TestingServiceItems t={t} pageKey={pageKey} sectionKey="drugTestTypes" itemsKey="tests" />
			<TestingServiceFinalCta
				title="Fast, Confidential Drug Testing"
				description="No wait times. Walk in anytime or schedule an appointment at any of our Tampa locations."
				buttonText="Schedule Your Test"
			/>
		</main>
	);
}
