import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import {
	TestingServiceHero,
	TestingServiceHowItWorks,
	TestingServiceFinalCta,
} from '@/components/testing-services/TestingServiceTemplate';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { getMetadataForPath } from '@/lib/metadata-config';
import HormonePackages from '@/components/testing-services/HormonePackages';

export const metadata = getMetadataForPath('/hormone-testing');

const pageKey = 'HormoneTestingPage';

export default async function HormoneTestingPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale });

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />
			<TestingServiceHowItWorks t={t} pageKey={pageKey} />
			<HormonePackages t={t} pageKey={pageKey} />
			<TestingServiceFinalCta
				title={t(`${pageKey}.cta.title`)}
				description={t(`${pageKey}.cta.description`)}
				buttonText={t(`${pageKey}.cta.buttonText`)}
			/>
		</main>
	);
}
