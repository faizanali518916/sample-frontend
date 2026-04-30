import Image from 'next/image';
import Link from 'next/link';
import {
	Facebook,
	FlaskConical,
	Info,
	Instagram,
	Microscope,
	Linkedin,
	Mail,
	MapPin,
	PhoneCall,
	ShieldCheck,
	Twitter,
	Youtube,
} from 'lucide-react';

const trustFooterItems = [
	{
		label: 'CLIA Certified',
		href: '/trust-standards#clia',
		icon: FlaskConical,
	},
	{
		label: 'CAP Accredited',
		href: '/trust-standards#cap',
		icon: Microscope,
	},
	{
		label: 'HIPAA Compliant',
		href: '/trust-standards#hipaa',
		icon: ShieldCheck,
	},
];

const footerTranslations = {
	en: {
		trustItems: ['CLIA Certified', 'CAP Accredited', 'HIPAA Compliant'],
		about:
			'24-7Labs is the first of a new line of innovative health care services from 24-7laboratories. Our mission is to give people the power to control their health with convenient, affordable, and easy-to-understand options.',
		productsTitle: 'Products',
		products: [
			{
				label: 'At-Home Chlamydia Testing Kit',
				href: 'https://247labkit.com/product/basic-kit-chlamydia-gonorrhea/',
			},
			{
				label: 'At-Home Herpes Testing Kit',
				href: 'https://247labkit.com/product/hsv-kit-herpes-at-home-test/',
			},
			{
				label: 'At-Home HIV Testing Kit',
				href: 'https://247labkit.com/product/comprehensive-kit-chlamydia-gonorrhea-trich-syphilis-hsv-hiv-hep-c/',
			},
			{
				label: 'At-Home COVID Testing Kit',
				href: 'https://247labkit.com/product/covid-kit-covid-19-at-home-test/',
			},
		],
		resourcesTitle: 'Resources',
		resources: [
			{ label: 'Trust & Standards', href: '/trust-standards' },
			{ label: 'Business Opportunities', href: '/business-opportunities' },
			{ label: 'Business Solutions', href: '/business-solutions' },
			{ label: 'Telemedicine Service', href: '/telemedicine' },
			{ label: 'Schedule Appointment', href: '/schedule-appointment' },
			{ label: 'Testing Locations', href: '/contact' },
			{ label: 'Privacy Policy', href: '/privacy-policy' },
			{ label: 'Contact', href: '/contact' },
		],
		testingTitle: 'Testing Pages',
		testing: [
			{ label: 'Testing Services', href: '/testing-services' },
			{ label: 'DNA Testing', href: '/dna-testing' },
			{ label: 'STD Testing', href: '/std-testing' },
			{ label: 'Drug Testing', href: '/drug-testing' },
			{ label: 'Allergy Testing', href: '/allergy-testing' },
			{ label: 'Heart Testing', href: '/heart-testing' },
			{ label: 'Hormone Testing', href: '/hormone-testing' },
			{ label: 'Routine Health Testing', href: '/routine-health-testing' },
		],
		contactTitle: 'Contact',
		socialAria: {
			facebook: 'Facebook',
			twitter: 'Twitter',
			youtube: 'YouTube',
			instagram: 'Instagram',
			linkedin: 'LinkedIn',
		},
		brandAlt: '24-7 Labs',
		contactAddress: '6107 Memorial Hwy, Suite F Tampa, Florida',
		contactEmail: 'anytimelab@24-7labs.com',
		contactPhone: '+1 (813) 932-3741',
		copyrightPrefix: 'Copyright',
		copyright: 'All rights reserved.',
	},
	es: {
		trustItems: ['Certificacion CLIA', 'Acreditacion CAP', 'Cumplimiento HIPAA'],
		about:
			'24-7Labs es la primera de una nueva linea de servicios innovadores de salud de 24-7laboratories. Nuestra mision es dar a las personas el poder de controlar su salud con opciones convenientes, accesibles y faciles de entender.',
		productsTitle: 'Productos',
		products: [
			{
				label: 'Kit de prueba en casa para clamidia',
				href: 'https://247labkit.com/product/basic-kit-chlamydia-gonorrhea/',
			},
			{
				label: 'Kit de prueba en casa para herpes',
				href: 'https://247labkit.com/product/hsv-kit-herpes-at-home-test/',
			},
			{
				label: 'Kit de prueba en casa para VIH',
				href: 'https://247labkit.com/product/comprehensive-kit-chlamydia-gonorrhea-trich-syphilis-hsv-hiv-hep-c/',
			},
			{
				label: 'Kit de prueba en casa para COVID',
				href: 'https://247labkit.com/product/covid-kit-covid-19-at-home-test/',
			},
		],
		resourcesTitle: 'Recursos',
		resources: [
			{ label: 'Confianza y Estandares', href: '/trust-standards' },
			{ label: 'Oportunidades de negocio', href: '/business-opportunities' },
			{ label: 'Soluciones para negocios', href: '/business-solutions' },
			{ label: 'Servicio de telemedicina', href: '/telemedicine' },
			{ label: 'Agendar cita', href: '/schedule-appointment' },
			{ label: 'Ubicaciones de pruebas', href: '/contact' },
			{ label: 'Politica de privacidad', href: '/privacy-policy' },
			{ label: 'Contacto', href: '/contact' },
		],
		testingTitle: 'Paginas de Pruebas',
		testing: [
			{ label: 'Servicios de Pruebas', href: '/testing-services' },
			{ label: 'Pruebas de ADN', href: '/dna-testing' },
			{ label: 'Pruebas de ETS', href: '/std-testing' },
			{ label: 'Pruebas de Drogas', href: '/drug-testing' },
			{ label: 'Pruebas de Alergias', href: '/allergy-testing' },
			{ label: 'Pruebas Cardiacas', href: '/heart-testing' },
			{ label: 'Pruebas Hormonales', href: '/hormone-testing' },
			{ label: 'Pruebas de Salud General', href: '/routine-health-testing' },
		],
		contactTitle: 'Contacto',
		socialAria: {
			facebook: 'Facebook',
			twitter: 'Twitter',
			youtube: 'YouTube',
			instagram: 'Instagram',
			linkedin: 'LinkedIn',
		},
		brandAlt: '24-7 Labs',
		contactAddress: '6107 Memorial Hwy, Suite F Tampa, Florida',
		contactEmail: 'anytimelab@24-7labs.com',
		contactPhone: '+1 (813) 932-3741',
		copyrightPrefix: 'Copyright',
		copyright: 'Todos los derechos reservados.',
	},
};

export default function SiteFooter({ locale = 'en' }) {
	const copy = footerTranslations[locale] || footerTranslations.en;

	return (
		<footer id="contact" className="relative overflow-hidden bg-[#082842] text-slate-100">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(38,127,199,0.35),transparent_45%)]" />
			<div className="relative mx-auto w-full max-w-[1240px] px-4 pt-10 lg:px-6">
				<div className="rounded-[30px] border border-sky-300/25 bg-[linear-gradient(135deg,#0d3761_0%,#0b3156_50%,#082842_100%)] p-5 shadow-[0_28px_60px_-45px_rgba(6,12,20,0.9)] md:p-6">
					<div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-6 text-center lg:gap-x-20">
						{trustFooterItems.map((item, index) => {
							const Icon = item.icon;
							const itemLabel = copy.trustItems[index] || item.label;

							return (
								<Link
									key={item.label}
									href={item.href}
									className="group inline-flex items-center gap-2.5 px-1 text-[12px] font-extrabold tracking-[0.13em] text-sky-100 uppercase transition hover:text-white"
								>
									<Icon className="h-4 w-4 text-cyan-300 transition group-hover:text-cyan-200" />
									<span>{itemLabel}</span>
									<Info className="h-3.5 w-3.5 text-cyan-300/85 transition group-hover:text-cyan-200" />
								</Link>
							);
						})}
					</div>
				</div>
			</div>
			<div className="relative mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-8 md:grid-cols-2 lg:grid-cols-5 lg:px-6">
				<div className="flex flex-col items-center">
					<Image
						src="/images/logo-light.png"
						alt={copy.brandAlt}
						width={400}
						height={100}
						className="h-24 w-auto drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]"
					/>
					<p className="text-sm leading-relaxed text-sky-100/90">{copy.about}</p>
					<div className="mt-5 flex items-center justify-center gap-2 text-sky-200">
						<a
							href="https://www.facebook.com/247Tampa/"
							target="_blank"
							rel="noreferrer"
							className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
							aria-label={copy.socialAria.facebook}
						>
							<Facebook className="h-4 w-4" />
						</a>
						<a
							href="https://twitter.com/anytimelab"
							target="_blank"
							rel="noreferrer"
							className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
							aria-label={copy.socialAria.twitter}
						>
							<Twitter className="h-4 w-4" />
						</a>
						<a
							href="https://www.youtube.com/channel/UCfBNya1FDOPMRJxUDCDusxw"
							target="_blank"
							rel="noreferrer"
							className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
							aria-label={copy.socialAria.youtube}
						>
							<Youtube className="h-4 w-4" />
						</a>
						<a
							href="https://www.instagram.com/twentyfoursevenlabs/"
							target="_blank"
							rel="noreferrer"
							className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
							aria-label={copy.socialAria.instagram}
						>
							<Instagram className="h-4 w-4" />
						</a>
						<a
							href="https://www.linkedin.com/company/24-7-labs/"
							target="_blank"
							rel="noreferrer"
							className="grid h-9 w-9 place-items-center rounded-full border border-sky-100/30 transition hover:border-sky-100 hover:text-white"
							aria-label={copy.socialAria.linkedin}
						>
							<Linkedin className="h-4 w-4" />
						</a>
					</div>
				</div>

				<div>
					<h3 className="font-display text-lg font-bold text-white">{copy.productsTitle}</h3>
					<ul className="mt-4 space-y-2 text-sm text-sky-100/90">
						{copy.products.map((item) => (
							<li key={item.href}>
								<a href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-white">
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="font-display text-lg font-bold text-white">{copy.resourcesTitle}</h3>
					<ul className="mt-4 space-y-2 text-sm text-sky-100/90">
						{copy.resources.map((item) => (
							<li key={item.label}>
								<Link href={item.href} className="transition hover:text-white">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="font-display text-lg font-bold text-white">{copy.testingTitle}</h3>
					<ul className="mt-4 space-y-2 text-sm text-sky-100/90">
						{copy.testing.map((item) => (
							<li key={item.href}>
								<Link href={item.href} className="transition hover:text-white">
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h3 className="font-display text-lg font-bold text-white">{copy.contactTitle}</h3>
					<ul className="mt-4 space-y-3 text-sm text-sky-100/90">
						<li className="flex items-start gap-2">
							<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
							{copy.contactAddress}
						</li>
						<li className="flex items-start gap-2">
							<Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
							{copy.contactEmail}
						</li>
						<li className="flex items-start gap-2">
							<PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
							{copy.contactPhone}
						</li>
					</ul>
				</div>
			</div>

			<div className="relative border-t border-white/10 bg-[var(--tl-primary)] py-4 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
				{copy.copyrightPrefix} {new Date().getFullYear()} 24-7 Labs. {copy.copyright}
			</div>
		</footer>
	);
}
