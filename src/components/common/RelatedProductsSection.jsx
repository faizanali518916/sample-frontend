import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RelatedProductsSection({ title, items = [], renderItem }) {
	const scrollRef = useRef(null);

	if (!items.length) return null;

	const scroll = (direction) => {
		if (scrollRef.current) {
			const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
			const cardWidth = clientWidth - 32; // Subtract padding (16px * 2)
			const gap = 16; // gap-4 = 16px
			const scrollAmount = cardWidth + gap;
			const maxScroll = scrollWidth - clientWidth;

			let scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

			// Clamp scroll to bounds
			scrollTo = Math.max(0, Math.min(scrollTo, maxScroll));

			// Snap to nearest card position
			scrollTo = Math.round(scrollTo / scrollAmount) * scrollAmount;

			scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
		}
	};

	return (
		<section className="mt-8">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="font-display text-2xl font-black text-[var(--tl-metallic-black)]">{title}</h3>

				<div className="flex gap-2">
					<button
						onClick={() => scroll('left')}
						className="rounded-full border border-gray-200 p-2 transition-all hover:bg-gray-100 active:scale-90 dark:border-gray-800 dark:hover:bg-slate-800"
					>
						<ChevronLeft className="h-5 w-5" />
					</button>
					<button
						onClick={() => scroll('right')}
						className="rounded-full border border-gray-200 p-2 transition-all hover:bg-gray-100 active:scale-90 dark:border-gray-800 dark:hover:bg-slate-800"
					>
						<ChevronRight className="h-5 w-5" />
					</button>
				</div>
			</div>

			<div
				ref={scrollRef}
				className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth p-4 sm:gap-5"
			>
				{items.map((item) => (
					<div
						key={item.id}
						className="w-[calc(100vw-48px)] flex-none snap-center sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-14px)]"
					>
						{renderItem(item)}
					</div>
				))}
			</div>
		</section>
	);
}
