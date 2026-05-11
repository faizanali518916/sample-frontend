import { cookies } from 'next/headers';
import { getLocaleFromCookieStore } from '@/lib/locale';
import GenericFormPage from '@/components/forms/GenericFormPage';
import { getMetadataForPath } from '@/lib/metadata-config';

export const metadata = getMetadataForPath('/covid-screening-form');

export default function CovidScreeningFormPage() {
	return <GenericFormPage formKey="covidScreening" />;
}
