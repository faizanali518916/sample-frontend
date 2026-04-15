export default function TestingServicesPagination({ t, safePage, totalPages, setCurrentPage }) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className="mt-8 flex flex-col items-center gap-3">
			<nav
				aria-label={t('paginationAria')}
				className="flex items-center gap-2 rounded-full border border-sky-100 bg-white/90 p-2 shadow-sm"
			>
				<button
					type="button"
					onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
					disabled={safePage === 1}
					className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
				>
					{t('previous')}
				</button>

				<span className="min-w-16 px-2 text-center text-sm font-semibold text-slate-700">
					{safePage} / {totalPages}
				</span>

				<button
					type="button"
					onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
					disabled={safePage === totalPages}
					className="inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
				>
					{t('next')}
				</button>
			</nav>
		</div>
	);
}
