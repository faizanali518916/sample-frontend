import Image from 'next/image';
import { SectionHeading } from '@/components/home/HomePageShared';

export default function HomeProcessSection({ t, processSteps }) {
	return (
		<section data-reveal data-reveal-delay="130" className="scroll-reveal process-section bg-white py-16 md:py-24">
			<div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
				<SectionHeading title={t('Process.title')} subtitle={t('Process.subtitle')} />

				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{processSteps.map((step) => (
						<div
							key={step.title}
							className="how-it-works-gradient-border group rounded-[26px] p-[2.5px] shadow-[0_16px_40px_-30px_rgba(3,86,197,0.7)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_46px_-28px_rgba(3,86,197,0.75)]"
						>
							<article className="relative h-full rounded-[24px] border border-white/70 bg-white p-7 transition-colors duration-300 group-hover:bg-[#f8fbff]">
								<span className="absolute top-6 right-6 text-xs font-bold tracking-wider text-sky-200 uppercase">
									{t('Process.badge')}
								</span>
								<Image src={step.image} alt={step.title} width={70} height={70} className="h-[70px] w-[70px]" />
								<h3 className="font-display mt-6 text-xl font-extrabold text-[var(--tl-primary-strong)]">
									{step.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-slate-600">{step.description}</p>
							</article>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
