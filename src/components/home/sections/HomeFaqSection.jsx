export default function HomeFaqSection({ t, faqLeft, faqRight, activeFaqId, setActiveFaqId }) {
	return (
		<section id="forms" data-reveal data-reveal-delay="220" className="scroll-reveal bg-white py-16 md:py-24">
			<div className="mx-auto w-full max-w-[1240px] px-4 lg:px-6">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						{t('FAQ.title')}
					</h2>
					<p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t('FAQ.subtitle')}</p>
					<div className="mx-auto mt-6 h-1 w-20 rounded-full bg-[var(--tl-primary)]" />
				</div>

				<div className="mt-10 grid gap-4 lg:grid-cols-2">
					{[faqLeft, faqRight].map((list, columnIndex) => (
						<div key={columnIndex} className="space-y-3">
							{list.map((item, itemIndex) => {
								const faqId = `${columnIndex}-${itemIndex}`;
								const isActive = activeFaqId === faqId;

								return (
									<article
										key={item.question}
										onMouseEnter={() => setActiveFaqId(faqId)}
										onMouseLeave={() => setActiveFaqId((current) => (current === faqId ? null : current))}
										onClick={() => setActiveFaqId((current) => (current === faqId ? null : faqId))}
										className={`group overflow-hidden rounded-2xl border border-sky-100 transition-colors duration-300 ${
											isActive ? 'bg-white' : 'bg-[#e5f3ff]'
										}`}
									>
										<div className="faq-question flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-800">
											<span>{item.question}</span>
											<span
												className={`faq-question-icon grid h-6 w-6 shrink-0 place-items-center rounded-full border border-slate-300 bg-white leading-none text-slate-700 transition-transform duration-300 ${
													isActive ? 'rotate-45' : 'rotate-0'
												}`}
											>
												+
											</span>
										</div>
										<div
											className={`grid transition-[grid-template-rows,opacity] duration-300 ${
												isActive ? 'grid-rows-[1fr] border-t border-sky-100 opacity-100' : 'grid-rows-[0fr] opacity-0'
											}`}
										>
											<p className="overflow-hidden px-5 pt-4 pb-5 text-sm leading-relaxed text-slate-600">
												{item.answer}
											</p>
										</div>
									</article>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
