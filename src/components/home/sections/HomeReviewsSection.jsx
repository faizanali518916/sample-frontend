import Image from 'next/image';
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function HomeReviewsSection({
	t,
	certificationMarqueeLogos,
	reviews,
	activeReview,
	nextReview,
	prevReview,
}) {
	return (
		<section data-reveal data-reveal-delay="150" className="scroll-reveal review-section bg-[#f8fbff] py-16 md:py-24">
			<div className="mx-auto w-full max-w-[1400px] px-4 lg:px-6">
				<div className="mx-auto w-full max-w-[1360px]">
					<div className="marquee-right border-b border-sky-100 pb-10">
						<div className="marquee-track-right-fast gap-6">
							<div className="marquee-group items-center gap-6">
								{certificationMarqueeLogos.map((logo, index) => (
									<div
										key={`primary-${logo}-${index}`}
										className="cert-logo-focus rounded-2xl border border-sky-100 bg-white px-6 py-4 shadow-sm"
									>
										<Image
											src={logo}
											alt={t('Reviews.certificationAlt')}
											width={160}
											height={70}
											className="h-[50px] w-auto"
										/>
									</div>
								))}
							</div>
							<div className="marquee-group items-center gap-6" aria-hidden="true">
								{certificationMarqueeLogos.map((logo, index) => (
									<div
										key={`duplicate-${logo}-${index}`}
										className="cert-logo-focus rounded-2xl border border-sky-100 bg-white px-6 py-4 shadow-sm"
									>
										<Image src={logo} alt="" width={160} height={70} className="h-[50px] w-auto" />
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="mt-12 text-center">
						<h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('Reviews.title')}</h2>
						<div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[var(--tl-primary)]" />
					</div>

					<div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
						<aside className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
							<div className="flex items-center gap-3">
								<Image
									src="/images/waiting-room.jpg"
									alt={t('Reviews.placeImageAlt')}
									width={70}
									height={70}
									className="h-16 w-16 rounded-xl object-cover"
								/>
								<div>
									<p className="text-sm font-bold text-slate-900">{t('Reviews.placeName')}</p>
									<div className="mt-1 flex items-center gap-1 text-amber-500">
										<Star className="h-4 w-4 fill-current" />
										<Star className="h-4 w-4 fill-current" />
										<Star className="h-4 w-4 fill-current" />
										<Star className="h-4 w-4 fill-current" />
										<Star className="h-4 w-4 fill-current" />
									</div>
									<p className="mt-1 text-xs text-slate-500">{t('Reviews.googleReviews')}</p>
								</div>
							</div>
							<button
								type="button"
								className="mt-5 w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
							>
								{t('Reviews.writeReview')}
							</button>
						</aside>

						<div className="min-w-0 space-y-4">
							<div className="marquee-right hidden min-w-0 md:block">
								<div className="marquee-track-left-to-right gap-4">
									<div className="marquee-group gap-4">
										{reviews.map((review) => (
											<article
												key={`primary-${review.name}`}
												className="w-[300px] shrink-0 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm lg:w-[340px]"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3">
														<div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-white">
															{review.avatar}
														</div>
														<div>
															<h3 className="text-sm font-bold text-slate-900">{review.name}</h3>
															<p className="text-xs text-slate-500">{review.date}</p>
														</div>
													</div>
													<BadgeCheck className="h-4 w-4 text-emerald-500" />
												</div>
												<div className="mt-4 flex items-center gap-1 text-amber-500">
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
												</div>
												<p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
											</article>
										))}
									</div>
									<div className="marquee-group gap-4" aria-hidden="true">
										{reviews.map((review) => (
											<article
												key={`duplicate-${review.name}`}
												className="w-[300px] shrink-0 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm lg:w-[340px]"
											>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3">
														<div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-sm font-bold text-white">
															{review.avatar}
														</div>
														<div>
															<h3 className="text-sm font-bold text-slate-900">{review.name}</h3>
															<p className="text-xs text-slate-500">{review.date}</p>
														</div>
													</div>
													<BadgeCheck className="h-4 w-4 text-emerald-500" />
												</div>
												<div className="mt-4 flex items-center gap-1 text-amber-500">
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
													<Star className="h-3.5 w-3.5 fill-current" />
												</div>
												<p className="mt-3 text-sm leading-relaxed text-slate-600">{review.text}</p>
											</article>
										))}
									</div>
								</div>
							</div>

							<div className="review-card rounded-3xl border border-sky-100 bg-white p-5 shadow-sm md:hidden">
								<div className="flex items-center justify-between">
									<button
										type="button"
										onClick={prevReview}
										aria-label={t('Reviews.previousAria')}
										className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600"
									>
										<ChevronLeft className="h-4 w-4" />
									</button>
									<div className="text-center">
										<h3 className="text-sm font-bold text-slate-900">{reviews[activeReview].name}</h3>
										<p className="text-xs text-slate-500">{reviews[activeReview].date}</p>
									</div>
									<button
										type="button"
										onClick={nextReview}
										aria-label={t('Reviews.nextAria')}
										className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-slate-600"
									>
										<ChevronRight className="h-4 w-4" />
									</button>
								</div>
								<div className="review-stars mt-4 flex justify-center gap-1 text-amber-500">
									<Star className="h-3.5 w-3.5 fill-current" />
									<Star className="h-3.5 w-3.5 fill-current" />
									<Star className="h-3.5 w-3.5 fill-current" />
									<Star className="h-3.5 w-3.5 fill-current" />
									<Star className="h-3.5 w-3.5 fill-current" />
								</div>
								<p className="mt-3 text-center text-sm text-slate-600">{reviews[activeReview].text}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
