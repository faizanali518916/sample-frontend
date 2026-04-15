import { Filter, Search } from 'lucide-react';

export default function TestingServicesFilters({
	t,
	search,
	setSearch,
	selectedCategoryId,
	setSelectedCategoryId,
	categoryOptions,
	filteredCount,
	safePage,
	totalPages,
	setCurrentPage,
}) {
	return (
		<section className="mx-auto w-full max-w-[1320px] px-4 pb-5 lg:px-6">
			<div className="rounded-[2rem] border border-sky-100 bg-white/90 p-5 shadow-[0_20px_55px_-42px_rgba(2,6,14,0.75)]">
				<div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
					<label className="block">
						<span className="mb-2 block text-sm font-bold text-slate-700">{t('searchLabel')}</span>
						<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[var(--tl-primary)] focus-within:bg-white">
							<Search className="h-4.5 w-4.5 shrink-0 text-slate-400" />
							<input
								value={search}
								onChange={(event) => {
									setSearch(event.target.value);
									setCurrentPage(1);
								}}
								placeholder={t('searchPlaceholder')}
								className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
							/>
						</div>
					</label>

					<label className="block">
						<span className="mb-2 block text-sm font-bold text-slate-700">{t('categoryLabel')}</span>
						<div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[var(--tl-primary)] focus-within:bg-white">
							<Filter className="h-4.5 w-4.5 shrink-0 text-slate-400" />
							<select
								value={selectedCategoryId}
								onChange={(event) => {
									setSelectedCategoryId(event.target.value);
									setCurrentPage(1);
								}}
								className="w-full bg-transparent text-sm text-slate-900 outline-none"
							>
								<option value="all">{t('allCategories')}</option>
								{categoryOptions.map((category) => (
									<option key={category.id} value={String(category.id)}>
										{category.name} ({category.count})
									</option>
								))}
							</select>
						</div>
					</label>
				</div>

				<div
					className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600"
					aria-live="polite"
				>
					<p>
						{t('resultsLabel')} {filteredCount} {t('resultsSuffix')}
					</p>
					<p>
						{t('pageLabel')} {safePage} / {totalPages}
					</p>
				</div>
			</div>
		</section>
	);
}
