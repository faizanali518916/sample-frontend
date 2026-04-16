function parsePrice(value) {
	const numeric = Number(value);
	return Number.isFinite(numeric) ? numeric : null;
}

function getVariantPrices(variants = []) {
	if (!Array.isArray(variants)) {
		return [];
	}

	return variants
		.map((variant) => {
			const salePrice = parsePrice(variant?.salePrice);
			const regularPrice = parsePrice(variant?.regularPrice);
			const resolved = salePrice && salePrice > 0 ? salePrice : regularPrice;
			return resolved && resolved > 0 ? resolved : null;
		})
		.filter((price) => price !== null);
}

export function getCurrentLocale(locale) {
	return locale?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

export function getLabel(value, language) {
	if (!value) {
		return '';
	}

	return value?.[language] || value?.en || '';
}

export function getDisplayPrice(product) {
	const regularPrice = parsePrice(product?.regularPrice);
	const salePrice = parsePrice(product?.salePrice);

	if (regularPrice !== null && salePrice !== null && regularPrice > 0 && salePrice > 0 && salePrice < regularPrice) {
		return salePrice;
	}

	if (salePrice !== null && salePrice > 0) {
		return salePrice;
	}

	if (regularPrice !== null && regularPrice > 0) {
		return regularPrice;
	}

	const variantPrices = getVariantPrices(product?.variants);
	if (variantPrices.length === 0) {
		return null;
	}

	return Math.min(...variantPrices);
}
