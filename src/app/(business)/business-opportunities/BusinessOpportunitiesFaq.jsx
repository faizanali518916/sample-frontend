'use client';

import { useState } from 'react';

export default function BusinessOpportunitiesFaq({ title, faqs }) {
	const [expandedFaq, setExpandedFaq] = useState(null);

	return (
		<section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-12 text-center">
					<h2 className="font-display mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
				</div>

				<div className="space-y-3">
					{faqs.map((faq, index) => (
						<div
							key={index}
							className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white transition-all duration-300"
						>
							<button
								onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
								className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-slate-50 sm:p-7"
							>
								<h3 className="text-base font-semibold text-slate-900 sm:text-lg">{faq.question}</h3>
								<span
									className={`text-var-tl-primary flex-shrink-0 text-xl font-bold transition-transform duration-300 ${
										expandedFaq === index ? 'rotate-180' : ''
									}`}
								>
									+
								</span>
							</button>

							{expandedFaq === index && (
								<div className="border-t border-slate-200 bg-gradient-to-br from-slate-50 to-white px-6 py-5 sm:px-7 sm:py-6">
									<p className="text-base leading-relaxed text-slate-700">{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
