import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import {
	TestingServiceHero,
	TestingServiceHowItWorks,
	TestingServiceItems,
	TestingServiceFinalCta,
} from '@/components/testing-services/TestingServiceTemplate';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { generateMetadataFor } from '@/lib/seo';

export const generateMetadata = generateMetadataFor('/dna-testing');

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
				title={t(`${pageKey}.cta.title`)}
				description={t(`${pageKey}.cta.description`)}
				buttonText={t(`${pageKey}.cta.buttonText`)}
			/>
		</main>
	);
}
