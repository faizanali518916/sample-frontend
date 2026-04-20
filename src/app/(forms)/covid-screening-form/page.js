import { cookies } from 'next/headers';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { loadMessages } from '@/i18n/loadMessages';
import GenericFormPage from '@/components/forms/GenericFormPage';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.Forms?.covidScreening?.metadata?.title,
		description: messages?.Forms?.covidScreening?.metadata?.description,
	};
}

export default function CovidScreeningFormPage() {
	return <GenericFormPage formKey="covidScreening" />;
}
