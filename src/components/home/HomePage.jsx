'use client';
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import AITestFinderModal from '@/components/common/AITestFinderModal';
import HomeAppointmentSection from '@/components/home/sections/HomeAppointmentSection';
import HomeBreadcrumbs from '@/components/home/sections/HomeBreadcrumbs';
import HomeFaqSection from '@/components/home/sections/HomeFaqSection';
import HomeHeroSection from '@/components/home/sections/HomeHeroSection';
import HomeProcessSection from '@/components/home/sections/HomeProcessSection';
import HomeReviewsSection from '@/components/home/sections/HomeReviewsSection';
import HomeServicesSection from '@/components/home/sections/HomeServicesSection';
import HomeWhyChooseSection from '@/components/home/sections/HomeWhyChooseSection';
import useHomePageInteractions from '@/components/home/useHomePageInteractions';

function BootScreen({ t }) {
	return (
		<div className="fixed inset-0 z-[120] grid place-items-center bg-[radial-gradient(circle_at_20%_20%,#eff8ff,#dcecff_45%,#cde3f9_100%)]">
			<div className="surface-noise absolute inset-0 opacity-40" />
			<div className="relative flex flex-col items-center gap-5 px-6 text-center">
				<div className="relative grid h-28 w-28 place-items-center">
					<span className="absolute h-28 w-28 rounded-full border-2 border-[var(--tl-primary)]/20" />
					<span className="absolute h-28 w-28 animate-spin rounded-full border-2 border-transparent border-t-[var(--tl-primary)] border-r-[var(--tl-primary)]/45" />
					<span className="absolute h-20 w-20 animate-[spin_2.4s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-[var(--tl-primary)]/50 border-l-[var(--tl-primary)]/60" />
					<Image
						src="/images/24x7-logo.png"
						alt={t('Hero.logoAlt')}
						width={90}
						height={52}
						className="h-11 w-auto"
						priority
					/>
				</div>

				<div className="space-y-2">
					<p className="font-display text-sm font-extrabold tracking-[0.22em] text-[var(--tl-primary-strong)] uppercase">
						{t('Hero.loadingTitle')}
					</p>
					<p className="text-sm text-slate-600">{t('Hero.loadingSubtitle')}</p>
				</div>

				<div className="progress-shimmer h-1.5 w-56 rounded-full bg-slate-200/80" />
			</div>
		</div>
	);
}

export default function HomePage({ locale = 'en' }) {
	const t = useTranslations('HomePage');
	const isSpanish = locale?.toLowerCase().startsWith('es');
	const heroSlides = t.raw('Hero.slides');
	const serviceCards = t.raw('Services.items');
	const whyChooseFeatures = t.raw('WhyChoose.items');
	const whyChooseLeftTape = [...whyChooseFeatures, ...whyChooseFeatures];
	const whyChooseRightBase = [...whyChooseFeatures.slice(3), ...whyChooseFeatures.slice(0, 3)];
	const whyChooseRightTape = [...whyChooseRightBase, ...whyChooseRightBase];
	const processSteps = t.raw('Process.items');
	const certificationLogos = t.raw('Reviews.certificationLogos');
	const certificationMarqueeLogos = [...certificationLogos, ...certificationLogos];
	const reviews = t.raw('Reviews.items');
	const faqLeft = t.raw('FAQ.itemsLeft');
	const faqRight = t.raw('FAQ.itemsRight');
	const appointmentLocations = t.raw('Appointment.locations');
	const breadcrumbItems = t.raw('Breadcrumb.items');

	const {
		activeSlide,
		setActiveSlide,
		activeReview,
		nextReview,
		prevReview,
		isBooting,
		activeSection,
		activeServiceCard,
		activeWhyFeature,
		activeFaqId,
		setActiveFaqId,
		isAiFinderOpen,
		setIsAiFinderOpen,
	} = useHomePageInteractions({
		heroSlidesCount: heroSlides.length,
		reviewsCount: reviews.length,
	});

	return (
		<div className="relative isolate overflow-clip bg-white text-slate-900">
			{isBooting && <BootScreen t={t} />}

			<main>
				<HomeHeroSection
					t={t}
					heroSlides={heroSlides}
					activeSlide={activeSlide}
					setActiveSlide={setActiveSlide}
					isSpanish={isSpanish}
					setIsAiFinderOpen={setIsAiFinderOpen}
				/>
				<HomeServicesSection t={t} serviceCards={serviceCards} activeServiceCard={activeServiceCard} />
				<HomeWhyChooseSection
					t={t}
					whyChooseFeatures={whyChooseFeatures}
					whyChooseLeftTape={whyChooseLeftTape}
					whyChooseRightTape={whyChooseRightTape}
					activeWhyFeature={activeWhyFeature}
				/>
				<HomeProcessSection t={t} processSteps={processSteps} />
				<HomeReviewsSection
					t={t}
					certificationMarqueeLogos={certificationMarqueeLogos}
					reviews={reviews}
					activeReview={activeReview}
					nextReview={nextReview}
					prevReview={prevReview}
				/>
				<HomeAppointmentSection t={t} appointmentLocations={appointmentLocations} />
				<HomeFaqSection
					t={t}
					faqLeft={faqLeft}
					faqRight={faqRight}
					activeFaqId={activeFaqId}
					setActiveFaqId={setActiveFaqId}
				/>
			</main>

			<HomeBreadcrumbs t={t} breadcrumbItems={breadcrumbItems} activeSection={activeSection} />
			<AITestFinderModal isOpen={isAiFinderOpen} onClose={() => setIsAiFinderOpen(false)} locale={locale} />
		</div>
	);
}
