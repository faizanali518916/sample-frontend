import Link from 'next/link';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import { ArrowRight, Clock3, Mail, MapPin, PhoneCall } from 'lucide-react';
import { getLocaleFromCookieStore } from '@/lib/locale';
import { loadMessages } from '@/i18n/loadMessages';

export async function generateMetadata() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return {
		title: messages?.ContactPage?.metadata?.title,
		description: messages?.ContactPage?.metadata?.description,
	};
}

export default async function ContactPage() {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const t = await getTranslations({ locale, namespace: 'ContactPage' });

	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,#f4faff_0%,#ffffff_45%)] text-slate-900">
			<main>
				<section className="mx-auto w-full max-w-[1220px] px-4 pt-12 pb-10 sm:pt-16 lg:px-6">
					<p className="text-sm font-bold tracking-[0.16em] text-[var(--tl-primary)] uppercase">{t('eyebrow')}</p>
					<h1 className="font-display mt-3 text-3xl leading-tight font-black sm:text-4xl md:text-5xl">{t('title')}</h1>
					<p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{t('body')}</p>
				</section>

				<section className="mx-auto grid w-full max-w-[1220px] gap-6 px-4 pb-16 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
					<aside className="space-y-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
						<div className="rounded-2xl bg-[#f2f9ff] p-4">
							<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">
								{t('locationTitle')}
							</p>
							<p className="mt-2 flex items-start gap-2 text-sm font-semibold text-slate-700">
								<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
								{t('contact.address')}
							</p>
						</div>

						<div className="rounded-2xl border border-sky-100 p-4">
							<p className="flex items-start gap-2 text-sm font-semibold text-slate-700">
								<PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
								{t('contact.phone')}
							</p>
							<p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
								<Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
								{t('contact.email')}
							</p>
							<p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
								<Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
								{t('supportHours')}
							</p>
						</div>

						<a
							href="tel:8139323741"
							className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
						>
							<PhoneCall className="h-4 w-4" />
							{t('callNow')}
						</a>
					</aside>

					<form className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
						<h2 className="font-display text-2xl font-extrabold text-slate-900">{t('formTitle')}</h2>
						<p className="mt-2 text-sm text-slate-600">{t('formSubtitle')}</p>

						<div className="mt-5 grid gap-4 md:grid-cols-2">
							<label className="text-sm font-semibold text-slate-700">
								{t('firstName')}
								<input
									type="text"
									placeholder={t('firstNamePlaceholder')}
									className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
								/>
							</label>
							<label className="text-sm font-semibold text-slate-700">
								{t('lastName')}
								<input
									type="text"
									placeholder={t('lastNamePlaceholder')}
									className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
								/>
							</label>
							<label className="text-sm font-semibold text-slate-700 md:col-span-2">
								{t('email')}
								<input
									type="email"
									placeholder={t('emailPlaceholder')}
									className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
								/>
							</label>
							<label className="text-sm font-semibold text-slate-700 md:col-span-2">
								{t('message')}
								<textarea
									rows={6}
									placeholder={t('messagePlaceholder')}
									className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15"
								/>
							</label>
						</div>

						<button
							type="submit"
							className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)] sm:w-auto"
						>
							{t('submit')}
							<ArrowRight className="h-4 w-4" />
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}
