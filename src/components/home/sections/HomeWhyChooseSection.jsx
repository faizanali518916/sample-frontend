import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading, WhyChooseFeatureCard } from '@/components/home/HomePageShared';

export default function HomeWhyChooseSection({
	t,
	whyChooseFeatures,
	whyChooseLeftTape,
	whyChooseRightTape,
	activeWhyFeature,
}) {
	return (
		<section
			id="about"
			data-reveal
			data-reveal-delay="100"
			className="scroll-reveal why-choose-section relative overflow-hidden bg-[#f0f7ff] py-16 md:py-24"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(38,127,199,0.18),transparent_55%)]" />
			<div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
				<SectionHeading title={t('WhyChoose.title')} subtitle={t('WhyChoose.subtitle')} />

				<div className="mt-14 hidden items-center gap-10 xl:grid xl:grid-cols-[1fr_340px_1fr]">
					<div className="marquee-vertical h-[430px]">
						<div className="marquee-vertical-track-down">
							<div className="marquee-vertical-group gap-7">
								{whyChooseLeftTape.map((feature, index) => (
									<WhyChooseFeatureCard
										key={`why-left-${feature.title}-${index}`}
										feature={feature}
										iconAlt={t('WhyChoose.featureIconAlt')}
									/>
								))}
							</div>
							<div className="marquee-vertical-group gap-7" aria-hidden="true">
								{whyChooseLeftTape.map((feature, index) => (
									<WhyChooseFeatureCard
										key={`why-left-dup-${feature.title}-${index}`}
										feature={feature}
										iconAlt={t('WhyChoose.featureIconAlt')}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="relative mx-auto h-[420px] w-full max-w-[320px]">
						<div className="absolute inset-0 rounded-full bg-gradient-to-b from-[var(--tl-primary)]/25 to-transparent blur-3xl" />
						<Image
							src="/images/img-03.png"
							alt={t('WhyChoose.microscopeAlt')}
							fill
							sizes="320px"
							className="object-contain drop-shadow-[0_24px_35px_rgba(18,67,112,0.28)]"
						/>
					</div>

					<div className="marquee-vertical h-[430px]">
						<div className="marquee-vertical-track-up">
							<div className="marquee-vertical-group gap-7">
								{whyChooseRightTape.map((feature, index) => (
									<WhyChooseFeatureCard
										key={`why-right-${feature.title}-${index}`}
										feature={feature}
										iconLeft
										iconAlt={t('WhyChoose.featureIconAlt')}
									/>
								))}
							</div>
							<div className="marquee-vertical-group gap-7" aria-hidden="true">
								{whyChooseRightTape.map((feature, index) => (
									<WhyChooseFeatureCard
										key={`why-right-dup-${feature.title}-${index}`}
										feature={feature}
										iconLeft
										iconAlt={t('WhyChoose.featureIconAlt')}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 flex flex-col items-center gap-4 sm:grid sm:grid-cols-2 xl:hidden">
					{whyChooseFeatures.map((feature, index) => {
						const isActive = index === activeWhyFeature;

						return (
							<article
								key={feature.title}
								data-mobile-why-card
								className={`feature-card mx-auto w-full self-center overflow-hidden rounded-2xl border shadow-sm transition-[padding,box-shadow,border-color,background-color] duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
									isActive
										? 'border-sky-300 bg-[#f7fbff] px-4 pt-4 pb-6 shadow-[0_16px_38px_-24px_rgba(3,86,197,0.45)]'
										: 'border-sky-100 bg-white px-4 pt-4 pb-4'
								}`}
							>
								<div className="flex items-start gap-4">
									<Image
										src={feature.icon}
										alt={t('WhyChoose.featureIconAlt')}
										width={46}
										height={46}
										className="h-11 w-11 shrink-0"
									/>
									<div className="min-w-0 pr-1">
										<h3 className="font-display text-base leading-tight font-extrabold text-slate-900">
											{feature.title}
										</h3>
										<p
											className={`overflow-hidden text-sm text-slate-600 transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
												isActive ? 'mt-2 max-h-24 opacity-100 delay-[160ms]' : 'mt-0 max-h-0 opacity-0 delay-0'
											}`}
										>
											{feature.description}
										</p>
									</div>
								</div>
							</article>
						);
					})}
				</div>

				<div className="mt-10 text-center">
					<Link
						href="#appointment"
						className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-7 py-3 text-sm font-bold tracking-wider text-white uppercase transition hover:bg-[var(--tl-primary-strong)]"
					>
						{t('WhyChoose.bookTestButton')}
						<ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
