import { cookies } from 'next/headers';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { loadMessages } from '@/i18n/loadMessages';
import GenericFormPage from '@/components/forms/GenericFormPage';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.Forms?.prescriptionConsent?.metadata?.title,
		description: messages?.Forms?.prescriptionConsent?.metadata?.description,
	};
}

export default function PrescriptionConsentFormPage() {
	return <GenericFormPage formKey="prescriptionConsent" />;
}
