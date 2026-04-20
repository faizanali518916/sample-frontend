'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
	TestingServiceHero,
	TestingServiceHowItWorks,
	TestingServiceFinalCta,
} from '@/components/testing-services/TestingServiceTemplate';

export default function HormoneTestingPage() {
	const t = useTranslations(pageKey);
	const [expandedPackage, setExpandedPackage] = useState(null);
	const packages = t.raw('hormonePackages.packages');

	return (
		<main className="bg-white">
			<TestingServiceHero t={t} pageKey={pageKey} />
			<TestingServiceHowItWorks t={t} pageKey={pageKey} />

			{/* Hormone Packages */}
			<section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
				<div className="mx-auto max-w-5xl">
					<div className="mb-12">
						<h2 className="font-display mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
							{t('hormonePackages.title')}
						</h2>
						<p className="text-base leading-relaxed text-slate-700 sm:text-lg">{t('hormonePackages.intro')}</p>
					</div>

					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{packages.map((pkg, index) => (
							<div
								key={index}
								className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition-shadow hover:shadow-lg"
							>
								<button
									onClick={() => setExpandedPackage(expandedPackage === index ? null : index)}
									className="w-full p-8 text-left transition-colors hover:bg-slate-50"
								>
									<h3 className="mb-2 text-xl font-semibold text-slate-900 sm:text-2xl">{pkg.name}</h3>
									<p className="text-base leading-relaxed text-slate-700">{pkg.description}</p>
									<div className="text-var-tl-primary mt-4 flex items-center">
										<span className="font-semibold">
											{expandedPackage === index ? t('hormonePackages.hideTests') : t('hormonePackages.showTests')}
										</span>
										<span className={`ml-2 transition-transform ${expandedPackage === index ? 'rotate-180' : ''}`}>
											▼
										</span>
									</div>
								</button>

								{expandedPackage === index && pkg.tests && (
									<div className="border-t border-slate-200 bg-slate-50 p-8">
										<p className="mb-4 text-sm font-semibold text-slate-900">{t('hormonePackages.includedTests')}</p>
										<ul className="space-y-3">
											{pkg.tests.map((test, idx) => (
												<li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
													<span className="text-var-tl-primary mt-0.5 flex-shrink-0">✓</span>
													{test}
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</section>

			<TestingServiceFinalCta
				title={t('cta.title')}
				description={t('cta.description')}
				buttonText={t('cta.buttonText')}
			/>
		</main>
	);
}
