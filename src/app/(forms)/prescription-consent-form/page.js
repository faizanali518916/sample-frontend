import { cookies } from 'next/headers';
import { getLocaleFromCookieStore } from '@/lib/locale';
import GenericFormPage from '@/components/forms/GenericFormPage';
import { getMetadataForPath } from '@/lib/metadata-config';

export const metadata = getMetadataForPath('/prescription-consent-form');

export default function PrescriptionConsentFormPage() {
	return <GenericFormPage formKey="prescriptionConsent" />;
}
