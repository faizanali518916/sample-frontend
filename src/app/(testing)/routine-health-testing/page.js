import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import {
	TestingServiceHero,
	TestingServiceHowItWorks,
	TestingServiceList,
	TestingServiceItems,
	TestingServiceFinalCta,
} from '@/components/testing-services/TestingServiceTemplate';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { generateMetadataFor } from '@/lib/seo';

export const generateMetadata = generateMetadataFor('/routine-health-testing');

const pageKey = 'RoutineHealthTestingPage';

export default async function RoutineHealthTestingPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale });

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />

			{/* Services List */}
			<TestingServiceList t={t} pageKey={pageKey} sectionKey="servicesList" itemsKey="services" />

			<TestingServiceHowItWorks t={t} pageKey={pageKey} />

			<TestingServiceItems t={t} pageKey={pageKey} sectionKey="healthTests" itemsKey="tests" />
			<TestingServiceFinalCta
				title={t(`${pageKey}.cta.title`)}
				description={t(`${pageKey}.cta.description`)}
				buttonText={t(`${pageKey}.cta.buttonText`)}
			/>
		</main>
	);
}
