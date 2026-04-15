import Link from 'next/link';

export default function TestingServicesEmptyState({ t, setSearch, setSelectedCategoryId }) {
	return (
		<div className="rounded-[2rem] border border-sky-100 bg-white p-10 text-center shadow-[0_20px_55px_-42px_rgba(2,6,14,0.75)]">
			<h2 className="font-display text-2xl font-black text-[var(--tl-metallic-black)]">{t('noResultsTitle')}</h2>
			<p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">{t('noResultsBody')}</p>
			<div className="mt-6 flex justify-center gap-3">
				<button
					type="button"
					onClick={() => {
						setSearch('');
						setSelectedCategoryId('all');
					}}
					className="rounded-full bg-[var(--tl-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
				>
					{t('clearFilters')}
				</button>
				<Link
					href="/contact"
					className="rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
				>
					{t('schedule')}
				</Link>
			</div>
		</div>
	);
}
