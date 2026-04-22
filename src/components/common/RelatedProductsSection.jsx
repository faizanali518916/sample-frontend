export default function RelatedProductsSection({ title, items = [], renderItem }) {
	if (!items.length) {
		return null;
	}

	return (
		<section className="mt-8 overflow-hidden">
			<h3 className="font-display text-2xl font-black text-[var(--tl-metallic-black)]">{title}</h3>
			<div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:gap-5 lg:-mx-6 lg:px-6">
				{items.map((item) => (
					<div key={item.id} className="w-[calc(100vw-48px)] max-w-[340px] flex-none sm:w-[330px] lg:w-[320px]">
						{renderItem(item)}
					</div>
				))}
			</div>
		</section>
	);
}
