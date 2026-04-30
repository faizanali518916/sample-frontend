import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3, MapPin, PhoneCall, Wand2 } from 'lucide-react';

export default function HomeHeroSection({ t, heroSlides, activeSlide, setActiveSlide, setIsAiFinderOpen }) {
	return (
		<section
			id="home"
			data-reveal
			className="scroll-reveal relative overflow-hidden bg-[linear-gradient(140deg,#d8ebff_0%,#f3f9ff_40%,#c5e0fb_100%)] pt-10 pb-16 md:pt-12 md:pb-24"
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="animate-drift absolute top-12 -left-24 h-72 w-72 rounded-full bg-[var(--tl-primary)]/20 blur-3xl" />
				<div className="animate-drift absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
			</div>

			<div className="relative mx-auto grid w-full max-w-[1240px] gap-8 px-4 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-6">
				<div className="space-y-7">
					<span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[var(--tl-primary-strong)] uppercase">
						<Clock3 className="h-4 w-4" />
						{t('Hero.badge')}
					</span>

					<h1 className="font-display text-3xl leading-tight font-black tracking-tight text-slate-900 sm:text-4xl md:text-5xl xl:text-6xl">
						<span className="hero-line">{t('Hero.line1') + ' '}</span>
						<span className="hero-line mt-1 text-[var(--tl-primary)]">{t('Hero.line2')}</span>
					</h1>

					<p className="max-w-xl text-base leading-relaxed text-slate-700 md:text-lg">{t('Hero.body')}</p>

					<div className="grid max-w-xl gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-lg shadow-sky-100 sm:grid-cols-2">
						<div className="flex items-start gap-3">
							<CalendarDays className="mt-0.5 h-5 w-5 text-[var(--tl-primary)]" />
							<p className="text-sm text-slate-600">
								{t('Hero.hoursWeekdays')}
								<br />
								{t('Hero.hoursSaturday')}
							</p>
						</div>
						<div className="flex items-start gap-3">
							<MapPin className="mt-0.5 h-5 w-5 text-[var(--tl-primary)]" />
							<p className="text-sm text-slate-600">
								{t('Hero.locationLine1')}
								<br />
								{t('Hero.locationLine2')}
							</p>
						</div>
					</div>

					<p className="max-w-lg text-sm font-semibold text-slate-700 md:text-base">{t('Hero.subText')}</p>

					<div className="flex flex-wrap gap-3">
						<Link
							href="#appointment"
							className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:bg-[var(--tl-primary-strong)] sm:w-auto"
						>
							{t('Hero.scheduleButton')}
							<ArrowRight className="h-4 w-4" />
						</Link>
						<a
							href="tel:8139323741"
							className="phone-ring inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--tl-primary)]/50 bg-white/90 px-6 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:bg-white sm:w-auto"
						>
							<PhoneCall className="h-4 w-4" />
							{t('Hero.callButton')}
						</a>
						<Link
							href="/contact"
							className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-slate-50/80 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white sm:w-auto"
						>
							{t('Hero.locationsButton')}
						</Link>
					</div>
				</div>

				<div className="relative hidden lg:block">
					<div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-br from-[var(--tl-primary)]/30 via-cyan-200/20 to-transparent blur-2xl" />
					<div className="relative z-10 overflow-hidden rounded-[24px] border border-white/80 bg-white/70 p-3 shadow-[0_30px_80px_-40px_rgba(38,127,199,0.7)] backdrop-blur">
						<div className="relative aspect-[4/3] overflow-hidden rounded-[16px]">
							{heroSlides.map((slide, index) => (
								<Image
									key={slide.image}
									src={slide.image}
									alt={slide.alt}
									fill
									sizes="(max-width: 1024px) 100vw, 48vw"
									className={`object-cover transition-all duration-700 ${
										index === activeSlide ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
									}`}
									priority={index === 0}
								/>
							))}
						</div>

						<div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white/90 px-3 py-2.5 sm:mt-4 sm:px-4 sm:py-3">
							<p className="min-w-0 text-xs font-semibold text-slate-700 sm:text-sm">{t('Hero.trustedBy')}</p>
							<div className="flex items-center gap-2">
								{heroSlides.map((slide, index) => (
									<button
										key={slide.image}
										type="button"
										className={`h-2.5 rounded-full transition-all ${
											index === activeSlide ? 'w-8 bg-[var(--tl-primary)]' : 'w-2.5 bg-slate-300'
										}`}
										aria-label={t('Hero.slideAria', { index: index + 1 })}
										onClick={() => setActiveSlide(index)}
									/>
								))}
							</div>
						</div>
					</div>

					<button
						type="button"
						onClick={() => setIsAiFinderOpen(true)}
						className="group relative mx-auto mt-12 flex items-center justify-center rounded-full p-[1px] transition-all duration-300 hover:scale-105 active:scale-95"
					>
						<div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>

						<div className="relative flex items-center gap-4 rounded-full bg-white px-8 py-4 leading-none dark:bg-slate-950">
							<Wand2 className="h-8 w-8 text-purple-600 transition-transform duration-300 group-hover:rotate-12 dark:text-purple-400" />

							<span className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
								{t('Hero.aiFinderButton')}
							</span>
						</div>
					</button>
				</div>
			</div>
		</section>
	);
}
