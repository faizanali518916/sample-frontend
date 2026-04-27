import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, CalendarDays, Clock3, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';

export default function TestingServicesHero({ t, productsCount, categoryCount, filteredCount }) {
	const summaryStats = [
		{ icon: Clock3, label: t('featuredLabel') },
		{ icon: ShieldCheck, label: t('privateLabel') },
		{ icon: BadgeCheck, label: t('insuranceLabel') },
	];

	return (
		<section className="relative mb-12 overflow-hidden">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-10 -left-28 h-72 w-72 rounded-full bg-[var(--tl-primary)]/10 blur-3xl" />
				<div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-cyan-300/15 blur-3xl" />
			</div>

			<div className="relative mx-auto grid w-full max-w-[1320px] gap-10 px-4 pt-12 pb-12 lg:grid-cols-[1.02fr_0.98fr] lg:px-6 lg:pt-16 lg:pb-16">
				<div className="space-y-7">
					<span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/85 px-4 py-2 text-xs font-extrabold tracking-[0.18em] text-[var(--tl-primary)] uppercase shadow-sm">
						<Sparkles className="h-4 w-4" />
						{t('eyebrow')}
					</span>

					<div className="space-y-4">
						<h1 className="font-display text-4xl leading-tight font-black tracking-tight text-[var(--tl-metallic-black)] sm:text-5xl xl:text-6xl">
							{t('title')}
						</h1>
						<p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{t('body')}</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<a
							href="tel:8139323741"
							className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_40px_-24px_rgba(3,86,197,0.9)] transition hover:bg-[var(--tl-primary-strong)]"
						>
							<PhoneCall className="h-4 w-4" />
							{t('callNow')}
						</a>
						<Link
							href="/contact"
							className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
						>
							<CalendarDays className="h-4 w-4" />
							{t('schedule')}
						</Link>
					</div>
				</div>

				<div className="relative hidden lg:block">
					<div className="absolute -inset-4 rounded-[2rem] bg-[linear-gradient(145deg,rgba(3,86,197,0.12),rgba(255,255,255,0.08))] blur-2xl" />
					<div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-[#eaf3ff] shadow-[0_36px_80px_-44px_rgba(8,18,36,0.95)]">
						<Image
							src="/images/24-7labs-business-oppurtunities-1536x1280.jpg"
							alt={t('heroImageAlt')}
							width={960}
							height={840}
							priority
							className="h-full w-full object-cover"
						/>

						<div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-3">
							<div className="rounded-2xl border border-white/60 bg-white/92 p-4 shadow-lg backdrop-blur-md">
								<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">24/7</p>
								<p className="mt-1 text-sm font-semibold text-slate-700">{t('heroCards.clock')}</p>
							</div>
							<div className="rounded-2xl border border-white/60 bg-white/92 p-4 shadow-lg backdrop-blur-md">
								<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">
									{t('heroCards.privacyTitle')}
								</p>
								<p className="mt-1 text-sm font-semibold text-slate-700">{t('heroCards.privacy')}</p>
							</div>
							<div className="rounded-2xl border border-white/60 bg-white/92 p-4 shadow-lg backdrop-blur-md">
								<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">
									{t('heroCards.resultsTitle')}
								</p>
								<p className="mt-1 text-sm font-semibold text-slate-700">{t('heroCards.results')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="relative mx-auto mt-4 w-full max-w-[1320px] px-4 lg:px-6">
				<div className="mx-auto grid w-full max-w-[980px] gap-3 sm:grid-cols-3">
					{summaryStats.map((item) => {
						const Icon = item.icon;

						return (
							<div
								key={item.label}
								className="rounded-2xl border-2 border-[var(--tl-primary)]/45 bg-white/95 p-4 shadow-[0_12px_30px_-24px_rgba(3,86,197,0.8)]"
							>
								<Icon className="h-5 w-5 text-[var(--tl-primary)]" />
								<p className="mt-2 text-sm font-semibold text-slate-700">{item.label}</p>
							</div>
						);
					})}
				</div>

				<div className="mx-auto mt-4 w-full max-w-[980px] rounded-[1.75rem] border-2 border-[var(--tl-primary)]/45 bg-white/90 p-5 shadow-[0_24px_60px_-42px_rgba(2,6,14,0.85)]">
					<div className="grid gap-4 sm:grid-cols-3">
						<div className="rounded-2xl border border-[var(--tl-primary)]/30 bg-[linear-gradient(165deg,#f7fbff_0%,#edf5ff_100%)] p-4">
							<p className="text-xs font-bold tracking-[0.16em] text-[var(--tl-primary)] uppercase">
								{t('totalLabel')}
							</p>
							<p className="font-display mt-2 text-3xl font-black text-[var(--tl-metallic-black)]">{productsCount}</p>
						</div>
						<div className="rounded-2xl border border-[var(--tl-primary)]/30 bg-[linear-gradient(165deg,#f7fbff_0%,#edf5ff_100%)] p-4">
							<p className="text-xs font-bold tracking-[0.16em] text-[var(--tl-primary)] uppercase">
								{t('categoryLabel')}
							</p>
							<p className="font-display mt-2 text-3xl font-black text-[var(--tl-metallic-black)]">{categoryCount}</p>
						</div>
						<div className="rounded-2xl border border-[var(--tl-primary)]/30 bg-[linear-gradient(165deg,#f7fbff_0%,#edf5ff_100%)] p-4">
							<p className="text-xs font-bold tracking-[0.16em] text-[var(--tl-primary)] uppercase">
								{t('resultsSuffix')}
							</p>
							<p className="font-display mt-2 text-3xl font-black text-[var(--tl-metallic-black)]">{filteredCount}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
