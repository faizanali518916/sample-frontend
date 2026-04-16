import Image from 'next/image';

export function SectionHeading({ title, subtitle }) {
	return (
		<div className="mx-auto max-w-3xl text-center">
			<h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
			<p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{subtitle}</p>
			<div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[var(--tl-primary)]" />
		</div>
	);
}

export function WhyChooseFeatureCard({ feature, iconLeft = false, iconAlt }) {
	return (
		<article className="group flex items-start justify-between gap-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm transition hover:shadow-lg">
			{iconLeft ? (
				<>
					<Image src={feature.icon} alt={iconAlt} width={54} height={54} className="h-12 w-12" />
					<div>
						<h3 className="font-display text-base font-extrabold text-slate-900">{feature.title}</h3>
						<p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
					</div>
				</>
			) : (
				<>
					<div>
						<h3 className="font-display text-base font-extrabold text-slate-900">{feature.title}</h3>
						<p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.description}</p>
					</div>
					<Image src={feature.icon} alt={iconAlt} width={54} height={54} className="h-12 w-12" />
				</>
			)}
		</article>
	);
}
