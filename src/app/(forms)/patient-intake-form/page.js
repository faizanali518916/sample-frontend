import { cookies } from 'next/headers';
import { getLocaleFromCookieStore } from '@/lib/locale';
import GenericFormPage from '@/components/forms/GenericFormPage';
import { getMetadataForPath } from '@/lib/metadata-config';

export const metadata = getMetadataForPath('/patient-intake-form');

export default function PatientIntakeFormPage() {
	return <GenericFormPage formKey="patientIntake" />;
}
