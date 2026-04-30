import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/home/HomePageShared';

export default function HomeServicesSection({ t, serviceCards }) {
	return (
		<section
			id="services"
			data-reveal
			data-reveal-delay="70"
			className="scroll-reveal services-section relative bg-white py-16 md:py-24"
		>
			<div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
				<SectionHeading title={t('Services.title')} subtitle={t('Services.subtitle')} />

				<div className="mt-12 flex flex-wrap items-stretch justify-center gap-6">
					{serviceCards.map((service, index) => {
						return (
							<Link
								key={service.title}
								href={service.href}
								data-mobile-service-card
								className="service-card group relative h-auto min-h-[280px] w-full flex-shrink-0 flex-grow-0 basis-full overflow-hidden rounded-3xl border border-sky-100/65 bg-gradient-to-b from-[#1f6db2] to-[#0d4f87] px-4 pt-4 pb-5 text-white shadow-lg transition-[padding,box-shadow,border-color,transform] duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(16,90,151,0.85)] sm:min-h-[300px] sm:basis-[calc(50%-1.5rem)] lg:min-h-[320px] lg:basis-[calc(33.333%-1.5rem)] xl:basis-[calc(25%-1.5rem)]"
							>
								{/* Decorative Background Elements */}
								<span className="pointer-events-none absolute -top-14 -right-16 h-36 w-36 rounded-full bg-cyan-300/20 blur-xl transition group-hover:scale-125" />
								<span className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-blue-900/20 blur-xl" />

								<div className="relative">
									<div className="mb-3 flex items-center gap-3">
										<div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
											<Image src={service.icon} alt={service.title} width={38} height={38} className="h-7 w-7" />
										</div>
										<h3 className="font-display min-w-0 text-[1.04rem] leading-tight font-bold sm:text-lg">
											{service.title}
										</h3>
									</div>

									<p className="mt-3 text-sm leading-relaxed text-blue-50/90">{service.description}</p>

									<span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-cyan-100 uppercase">
										{t('Services.learnMore')}
										<ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
									</span>
								</div>

								<span className="absolute top-3 right-4 text-xs font-bold text-white/45">0{index + 1}</span>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
