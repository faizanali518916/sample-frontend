import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/home/HomePageShared';

export default function HomeServicesSection({ t, serviceCards, activeServiceCard }) {
	return (
		<section
			id="services"
			data-reveal
			data-reveal-delay="70"
			className="scroll-reveal services-section relative bg-white py-16 md:py-24"
		>
			<div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
				<SectionHeading title={t('Services.title')} subtitle={t('Services.subtitle')} />

				<div className="mt-12 flex flex-col items-center gap-6 sm:grid sm:auto-rows-fr sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{serviceCards.map((service, index) => {
						const isActive = index === activeServiceCard;

						return (
							<Link
								key={service.title}
								href={service.href}
								data-mobile-service-card
								className={`service-card group relative mx-auto h-full w-full self-center overflow-hidden rounded-3xl border bg-gradient-to-b from-[#1f6db2] to-[#0d4f87] px-4 pt-4 pb-5 text-white shadow-lg transition-[padding,box-shadow,border-color] duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(16,90,151,0.85)] sm:min-h-[300px] lg:min-h-[320px] ${
									isActive
										? 'border-sky-100/65 shadow-sky-100 max-[639px]:border-sky-200/70 max-[639px]:pb-6 max-[639px]:shadow-[0_22px_52px_-34px_rgba(16,90,151,0.85)]'
										: 'border-sky-100/65 shadow-sky-100 xl:border-sky-100'
								}`}
							>
								<span className="pointer-events-none absolute -top-14 -right-16 h-36 w-36 rounded-full bg-cyan-300/20 blur-xl transition group-hover:scale-125" />
								<span className="pointer-events-none absolute -bottom-14 -left-12 h-32 w-32 rounded-full bg-blue-900/20 blur-xl" />

								<div className="relative">
									<div
										className={`flex items-center gap-3 transition-[margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
											isActive ? 'mb-0 max-[639px]:mb-5' : 'mb-0'
										}`}
									>
										<div
											className={`inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
												isActive ? 'h-12 w-12 max-[639px]:h-16 max-[639px]:w-16' : 'h-12 w-12'
											}`}
										>
											<Image
												src={service.icon}
												alt={service.title}
												width={38}
												height={38}
												className={`transition-[width,height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
													isActive ? 'h-7 w-7 max-[639px]:h-9 max-[639px]:w-9' : 'h-7 w-7'
												}`}
											/>
										</div>
										<h3 className={`font-display min-w-0 text-[1.04rem] leading-tight font-bold sm:text-lg`}>
											{service.title}
										</h3>
									</div>
									<p
										className={`overflow-hidden text-sm leading-relaxed text-blue-50/90 transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
											isActive
												? 'mt-3 max-h-44 opacity-100 delay-[160ms]'
												: 'mt-0 max-h-0 opacity-0 delay-0 sm:mt-3 sm:max-h-36 sm:opacity-100'
										}`}
									>
										{service.description}
									</p>
									<span
										className={`overflow-hidden text-xs font-semibold tracking-wider text-cyan-100 uppercase transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
											isActive
												? 'mt-5 inline-flex max-h-8 items-center gap-2 opacity-100 delay-[220ms]'
												: 'mt-0 inline-flex max-h-0 items-center gap-2 opacity-0 delay-0 sm:mt-5 sm:max-h-8 sm:opacity-100'
										}`}
									>
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
