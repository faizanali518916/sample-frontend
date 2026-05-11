import { cookies } from 'next/headers';
import { getLocaleFromCookieStore } from '@/lib/locale';
import GenericFormPage from '@/components/forms/GenericFormPage';
import { getMetadataForPath } from '@/lib/metadata-config';

export const metadata = getMetadataForPath('/contact');

export default async function ContactPage({ searchParams }) {
	const resolvedSearchParams = (await searchParams) || {};
	const prefilledMessage = typeof resolvedSearchParams.message === 'string' ? resolvedSearchParams.message.trim() : '';

	return <GenericFormPage formKey="contact" initialValues={prefilledMessage ? { message: prefilledMessage } : {}} />;
}
