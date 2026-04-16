export default function HomeBreadcrumbs({ t, breadcrumbItems, activeSection }) {
	return (
		<div className="fixed bottom-6 left-6 z-40 hidden gap-2 sm:flex">
			{breadcrumbItems.map((section) => (
				<button
					key={section.id}
					type="button"
					onClick={() => {
						const element = document.getElementById(section.id);
						if (element) {
							element.scrollIntoView({ behavior: 'smooth' });
						}
					}}
					aria-label={t('Breadcrumb.goTo', { label: section.label })}
					className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
						activeSection === section.id ? 'w-8 bg-[var(--tl-primary)]' : 'bg-slate-300 hover:bg-slate-400'
					}`}
					title={section.label}
				/>
			))}
		</div>
	);
}
