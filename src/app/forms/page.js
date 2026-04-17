import Link from 'next/link';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { getLocaleFromCookieStore } from '@/lib/locale';

export const dynamic = 'force-dynamic';

export default async function FormsPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale, namespace: 'Forms' });

	const forms = [
		{ href: '/contact', title: t('contact.title'), description: t('contact.subtitle') },
		{
			href: '/schedule-appointment',
			title: t('scheduleAppointment.title'),
			description: t('scheduleAppointment.subtitle'),
		},
		{ href: '/patient-intake-form', title: t('patientIntake.title'), description: t('patientIntake.subtitle') },
		{ href: '/covid-screening-form', title: t('covidScreening.title'), description: t('covidScreening.subtitle') },
		{
			href: '/prescription-consent-form',
			title: t('prescriptionConsent.title'),
			description: t('prescriptionConsent.subtitle'),
		},
	];

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#f4faff_0%,#ffffff_45%)] px-4 py-12 lg:px-6">
			<div className="mx-auto w-full max-w-[1220px]">
				<h1 className="font-display text-3xl font-black text-slate-900 sm:text-4xl">Forms</h1>
				<div className="mt-6 grid gap-4 md:grid-cols-2">
					{forms.map((form) => (
						<Link
							key={form.href}
							href={form.href}
							className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
						>
							<h2 className="font-display text-xl font-extrabold text-slate-900">{form.title}</h2>
							<p className="mt-2 text-sm text-slate-600">{form.description}</p>
						</Link>
					))}
				</div>
			</div>
		</main>
	);
}
