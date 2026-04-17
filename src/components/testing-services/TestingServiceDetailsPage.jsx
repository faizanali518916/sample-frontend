'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, PhoneCall } from 'lucide-react';
import React from 'react';
import { t as translate } from '@/lib/i18n-utils';
import { resolveImageUrl } from '@/lib/api';
import TestingServiceCard from './components/TestingServiceCard';

function parsePrice(value) {
	const numeric = Number(value);
	return Number.isFinite(numeric) ? numeric : null;
}

function buildPriceModel(product) {
	const regularPrice = parsePrice(product?.regularPrice);
	const salePrice = parsePrice(product?.salePrice);
	const hasSale =
		regularPrice !== null && salePrice !== null && regularPrice > 0 && salePrice > 0 && salePrice < regularPrice;

	if (hasSale) {
		return {
			type: 'sale',
			regularPrice,
			salePrice,
		};
	}

	const basePrice = salePrice && salePrice > 0 ? salePrice : regularPrice;
	if (basePrice && basePrice > 0) {
		return {
			type: 'single',
			price: basePrice,
		};
	}

	const variantPrices = (product?.variants || [])
		.map((variant) => {
			const variantSalePrice = parsePrice(variant.salePrice);
			const variantRegularPrice = parsePrice(variant.regularPrice);
			return variantSalePrice && variantSalePrice > 0 ? variantSalePrice : variantRegularPrice;
		})
		.filter((price) => price && price > 0);

	if (variantPrices.length > 0) {
		const minimum = Math.min(...variantPrices);
		const maximum = Math.max(...variantPrices);

		return {
			type: minimum === maximum ? 'single' : 'range',
			minimum,
			maximum,
			price: minimum,
		};
	}

	return {
		type: 'contact',
	};
}

function isLikelyHtml(value) {
	return /<[a-z][\s\S]*>/i.test(value || '');
}

function renderDescription(description) {
	if (!description) {
		return null;
	}

	if (isLikelyHtml(description)) {
		return <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: description }} />;
	}

	return <p className="text-sm leading-relaxed whitespace-pre-line text-slate-600">{description}</p>;
}

function summarizeText(value, maxLength = 145) {
	if (!value) {
		return '';
	}

	if (value.length <= maxLength) {
		return value;
	}

	return `${value.slice(0, maxLength).trimEnd()}...`;
}

function getProductImage(product) {
	return product?.mainImage || product?.image || '/images/placeholder.png';
}

function getCategoryImage(category) {
	const imageCandidate =
		category?.mainImage ||
		category?.image ||
		category?.main_image ||
		category?.thumbnail ||
		category?.banner ||
		'/images/placeholder.png';

	return resolveImageUrl(imageCandidate);
}

export default React.memo(function TestingServiceDetailsPage({
	product,
	allProducts = [],
	allCategories = [],
	t,
	locale,
}) {
	const sourceVariants = Array.isArray(product?.variants) ? product.variants : [];
	const [selectedVariantId, setSelectedVariantId] = useState('');
	const [selectedCategoryId, setSelectedCategoryId] = useState('all');

	const productCategories = useMemo(() => {
		return Array.isArray(product?.categories) ? product.categories : [];
	}, [product.categories]);

	const variants = [...sourceVariants].sort((left, right) => {
		const leftModel = buildPriceModel(left);
		const rightModel = buildPriceModel(right);

		const leftPrice = leftModel.type === 'sale' ? leftModel.salePrice : leftModel.price || leftModel.minimum;
		const rightPrice = rightModel.type === 'sale' ? rightModel.salePrice : rightModel.price || rightModel.minimum;

		const safeLeftPrice = Number.isFinite(leftPrice) ? leftPrice : Number.POSITIVE_INFINITY;
		const safeRightPrice = Number.isFinite(rightPrice) ? rightPrice : Number.POSITIVE_INFINITY;
		return safeLeftPrice - safeRightPrice;
	});

	const selectedVariant = useMemo(() => {
		if (!selectedVariantId) {
			return null;
		}

		return variants.find((variant) => String(variant.id) === String(selectedVariantId)) || null;
	}, [selectedVariantId, variants]);

	const activeProduct = selectedVariant || product;
	const productName = activeProduct?.name ?? translate(t, 'fallbackProductName', { id: product?.id ?? '-' });
	const selectedCategory = useMemo(() => {
		if (selectedCategoryId === 'all') {
			return null;
		}

		return (
			allCategories.find((category) => String(category.id) === String(selectedCategoryId)) ||
			productCategories.find((category) => String(category.id) === String(selectedCategoryId)) ||
			null
		);
	}, [allCategories, productCategories, selectedCategoryId]);
	const categoryName =
		selectedCategory?.name ??
		translate(t, 'fallbackProductName', { id: selectedCategory?.id ?? selectedCategoryId ?? '-' });
	const categoryDescription = selectedCategory?.description || selectedCategory?.shortDescription || '';
	const categoryImage = getCategoryImage(selectedCategory);
	// Use variant image only if it exists, otherwise fall back to product image
	const productImage =
		(selectedVariant && (selectedVariant.mainImage || selectedVariant.image)) ||
		product?.mainImage ||
		product?.image ||
		'/images/placeholder.png';
	const pricing = buildPriceModel(activeProduct);

	const categoryProducts = useMemo(() => {
		if (selectedCategoryId === 'all') {
			return [];
		}

		return allProducts.filter((entry) =>
			entry.categories.some((category) => String(category.id) === String(selectedCategoryId))
		);
	}, [allProducts, selectedCategoryId]);

	const relatedProducts = useMemo(() => {
		if (!Array.isArray(productCategories) || productCategories.length === 0) {
			return [];
		}

		const productCategoryIds = new Set(productCategories.map((category) => String(category.id)));

		return allProducts.filter(
			(entry) =>
				String(entry.id) !== String(product.id) &&
				entry.categories.some((category) => productCategoryIds.has(String(category.id)))
		);
	}, [allProducts, product.id, productCategories]);

	const formatPrice = (value, localeOverride = locale) => {
		if (!Number.isFinite(value)) {
			return translate(t, 'contactUs');
		}

		return new Intl.NumberFormat(localeOverride === 'es' ? 'es-US' : 'en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 2,
		}).format(value);
	};

	const formatProductPrice = (entry) => {
		const model = buildPriceModel(entry);
		if (model.type === 'sale') {
			return formatPrice(model.salePrice);
		}

		if (model.type === 'single') {
			return formatPrice(model.price);
		}

		if (model.type === 'range') {
			return translate(t, 'variantRange', {
				min: formatPrice(model.minimum),
				max: formatPrice(model.maximum),
			});
		}

		return translate(t, 'contactUs');
	};

	const cardT = (key, params) => translate(t, key, params);

	return (
		<main className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#ffffff_40%,#f7fbff_100%)] text-[var(--tl-ink)]">
			<section className="mx-auto w-full max-w-[1440px] overflow-x-clip px-4 pt-8 pb-14 lg:px-6 lg:pt-10 lg:pb-16">
				<div className="mb-6 flex flex-wrap items-center gap-3">
					<Link
						href="/testing-services"
						className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
					>
						<ArrowLeft className="h-4 w-4" />
						{translate(t, 'backToServices')}
					</Link>
				</div>

				<div className="grid gap-8 lg:grid-cols-[280px_1fr]">
					{/* Category Sidebar */}
					<aside className="h-fit rounded-2xl border border-sky-100 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(2,6,14,0.9)] sm:p-6">
						<h3 className="font-display text-lg font-black text-[var(--tl-metallic-black)]">
							{translate(t, 'categoriesTitle') || 'Categories'}
						</h3>
						<div className="mt-4 space-y-2">
							<button
								onClick={() => setSelectedCategoryId('all')}
								className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold break-words transition ${
									selectedCategoryId === 'all'
										? 'bg-sky-100 text-[var(--tl-primary)]'
										: 'text-slate-700 hover:bg-sky-50 hover:text-[var(--tl-primary)]'
								}`}
							>
								{translate(t, 'allCategories') || 'All Categories'}
							</button>
							{allCategories.map((category) => (
								<button
									key={category.id}
									onClick={() => setSelectedCategoryId(String(category.id))}
									className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold break-words transition ${
										String(selectedCategoryId) === String(category.id)
											? 'bg-sky-100 text-[var(--tl-primary)]'
											: 'text-slate-700 hover:bg-sky-50 hover:text-[var(--tl-primary)]'
									}`}
								>
									{category.name}
								</button>
							))}
						</div>
					</aside>

					{/* Main Content */}
					<div className="min-w-0">
						{selectedCategory ? (
							<>
								<div className="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_24px_60px_-45px_rgba(2,6,14,0.85)] md:p-7 lg:p-8">
									<div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
										<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
											<Image
												src={categoryImage}
												alt={categoryName}
												fill
												sizes="(max-width: 768px) 100vw, 45vw"
												className="object-cover"
											/>
										</div>
										<div>
											<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">
												{translate(t, 'categoriesTitle')}
											</p>
											<h1 className="font-display mt-2 text-2xl leading-tight font-black break-words text-[var(--tl-metallic-black)] sm:text-3xl lg:text-4xl">
												{categoryName}
											</h1>
											<p className="mt-5 text-sm font-semibold text-slate-600">
												{categoryProducts.length} {translate(t, 'relatedTitle').toLowerCase()}
											</p>
										</div>
									</div>
								</div>

								<div className="mt-7 rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(2,6,14,0.9)] md:p-6">
									<h2 className="font-display text-xl font-black text-[var(--tl-metallic-black)]">
										{translate(t, 'descriptionTitle')}
									</h2>
									<div className="mt-3">{renderDescription(categoryDescription)}</div>
								</div>

								<div className="mt-8">
									<h3 className="font-display text-2xl font-black text-[var(--tl-metallic-black)]">{categoryName}</h3>
									<div className="mt-4 flex w-full max-w-full gap-4 overflow-x-auto pb-2 sm:gap-5">
										{categoryProducts.map((categoryProduct) => (
											<div
												key={categoryProduct.id}
												className="w-[85vw] max-w-[340px] flex-none sm:w-[330px] lg:w-[320px]"
											>
												<TestingServiceCard
													product={categoryProduct}
													t={cardT}
													locale={locale}
													formatPrice={formatPrice}
													summarizeText={summarizeText}
													getProductImage={getProductImage}
												/>
											</div>
										))}
									</div>
									{categoryProducts.length === 0 && (
										<p className="mt-4 text-sm text-slate-600">{translate(t, 'contactUs')}</p>
									)}
								</div>
							</>
						) : (
							<>
								<div className="rounded-[2rem] border border-sky-100 bg-white p-5 shadow-[0_24px_60px_-45px_rgba(2,6,14,0.85)] md:p-7 lg:p-8">
									<div className="grid gap-8 md:grid-cols-[1fr_1.1fr]">
										<div>
											<div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
												<Image
													src={productImage}
													alt={productName}
													fill
													sizes="(max-width: 768px) 100vw, 45vw"
													className="object-cover"
												/>
											</div>
										</div>

										<div className="flex flex-col justify-between">
											<div>
												<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">
													{translate(t, 'serviceDetails')}
												</p>
												<h1 className="font-display mt-2 text-2xl leading-tight font-black break-words text-[var(--tl-metallic-black)] sm:text-3xl lg:text-4xl">
													{productName}
												</h1>

												<div className="mt-6">
													{pricing.type === 'sale' && (
														<div className="flex items-baseline gap-3">
															<p className="text-base font-semibold text-slate-400 line-through">
																{formatPrice(pricing.regularPrice)}
															</p>
															<p className="font-display text-3xl font-black text-[var(--tl-metallic-black)]">
																{formatPrice(pricing.salePrice)}
															</p>
														</div>
													)}

													{pricing.type === 'single' && (
														<p className="font-display text-3xl font-black text-[var(--tl-metallic-black)]">
															{formatPrice(pricing.price)}
														</p>
													)}

													{pricing.type === 'range' && (
														<p className="font-display text-3xl font-black text-[var(--tl-metallic-black)]">
															{translate(t, 'variantRange', {
																min: formatPrice(pricing.minimum),
																max: formatPrice(pricing.maximum),
															})}
														</p>
													)}

													{pricing.type === 'contact' && (
														<p className="font-display text-3xl font-black text-[var(--tl-metallic-black)]">
															{translate(t, 'contactUs')}
														</p>
													)}
												</div>

												{productCategories.length > 0 && (
													<p className="mt-6 text-sm text-slate-600">
														<span className="font-semibold text-slate-800">{translate(t, 'categoryLabel')}: </span>
														{productCategories.map((category) => category.name).join(', ')}
													</p>
												)}
											</div>

											<div>
												{variants.length > 0 && (
													<div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
														<label
															className="text-sm font-bold text-slate-800"
															htmlFor="testing-service-variant-select"
														>
															{translate(t, 'variationLabel')}
														</label>
														<select
															id="testing-service-variant-select"
															className="mt-2 w-full rounded-xl border border-sky-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/20"
															value={selectedVariantId}
															onChange={(event) => setSelectedVariantId(event.target.value)}
														>
															<option value="">{translate(t, 'selectVariationPlaceholder')}</option>
															{variants.map((variant) => (
																<option key={variant.id} value={variant.id}>
																	{variant.name || translate(t, 'fallbackProductName', { id: variant.id })} -{' '}
																	{formatProductPrice(variant)}
																</option>
															))}
														</select>

														<p className="mt-3 text-sm font-bold text-slate-800">{translate(t, 'optionsAvailable')}</p>
														<ul className="mt-2 space-y-1">
															{variants.slice(0, 8).map((variant) => (
																<li key={variant.id} className="text-sm text-slate-600">
																	{variant.name || translate(t, 'fallbackProductName', { id: variant.id })} -{' '}
																	{formatProductPrice(variant)}
																</li>
															))}
														</ul>
													</div>
												)}

												<div className="mt-6 flex flex-wrap gap-3">
													<Link
														href={`/contact?test=${encodeURIComponent(productName)}`}
														className="inline-flex items-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
													>
														{translate(t, 'bookTest')}
														<ArrowRight className="h-4 w-4" />
													</Link>
													<a
														href="tel:8139323741"
														className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-6 py-3 text-sm font-bold text-[var(--tl-primary-strong)] transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
													>
														<PhoneCall className="h-4 w-4" />
														{translate(t, 'callNow')}
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="mt-7 rounded-[1.5rem] border border-sky-100 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(2,6,14,0.9)] md:p-6">
									<h2 className="font-display text-xl font-black text-[var(--tl-metallic-black)]">
										{translate(t, 'descriptionTitle')}
									</h2>
									<div className="mt-3">{renderDescription(activeProduct?.description || product?.description)}</div>
								</div>

								{relatedProducts.length > 0 && (
									<div className="mt-8">
										<h3 className="font-display text-2xl font-black text-[var(--tl-metallic-black)]">
											{translate(t, 'relatedTitle')}
										</h3>
										<div className="mt-4 flex w-full max-w-full gap-4 overflow-x-auto pb-2 sm:gap-5">
											{relatedProducts.map((relatedProduct) => (
												<div
													key={relatedProduct.id}
													className="w-[85vw] max-w-[340px] flex-none sm:w-[330px] lg:w-[320px]"
												>
													<TestingServiceCard
														product={relatedProduct}
														t={cardT}
														locale={locale}
														formatPrice={formatPrice}
														summarizeText={summarizeText}
														getProductImage={getProductImage}
													/>
												</div>
											))}
										</div>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</section>
		</main>
	);
});
