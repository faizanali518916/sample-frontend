const API_ORIGIN = 'https://247labstage.spctek.com:9000';

export const API_BASE_URL = `${API_ORIGIN}/api`;
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;
const CATEGORIES_API_URL = `${API_BASE_URL}/category`;

export function extractProducts(payload) {
	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload?.products)) {
		return payload.products;
	}

	if (Array.isArray(payload?.data)) {
		return payload.data;
	}

	if (Array.isArray(payload?.data?.products)) {
		return payload.data.products;
	}

	return [];
}

export function resolveImageUrl(value) {
	if (!value) {
		return '/images/placeholder.png';
	}

	if (value.startsWith('http://') || value.startsWith('https://')) {
		return value;
	}

	if (value.startsWith('//')) {
		return `https:${value}`;
	}

	if (value.startsWith('/')) {
		return `${API_ORIGIN}${value}`;
	}

	return `${API_ORIGIN}/${value}`;
}

export function normalizeProduct(product) {
	if (!product?.id) {
		return null;
	}

	const regularPrice = Number(product.regular_price);
	const salePrice = Number(product.sale_price);
	const stockQuantity = Number(product.stock_quantity);

	return {
		id: product.id,
		name: product.name ?? null,
		description: product.description ?? '',
		mainImage: resolveImageUrl(product.main_image),
		image: resolveImageUrl(product.main_image),
		categories: Array.isArray(product.categories) ? product.categories : [],
		variants: Array.isArray(product.variants)
			? product.variants.map((variant) => normalizeProduct(variant)).filter(Boolean)
			: [],
		variantOf: product.variant_of ?? null,
		rawRegularPrice: product.regular_price ?? null,
		rawSalePrice: product.sale_price ?? null,
		regularPrice: Number.isFinite(regularPrice) ? regularPrice : null,
		salePrice: Number.isFinite(salePrice) ? salePrice : null,
		published: Boolean(product.published),
		visible: Boolean(product.visible),
		stockQuantity: Number.isFinite(stockQuantity) ? stockQuantity : null,
	};
}

export async function fetchProducts() {
	const response = await fetch(PRODUCTS_API_URL, {
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Product API failed with status ${response.status}`);
	}

	const payload = await response.json();
	return extractProducts(payload).map(normalizeProduct).filter(Boolean);
}

export async function fetchCategories() {
	const response = await fetch(CATEGORIES_API_URL, {
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Categories API failed with status ${response.status}`);
	}

	const payload = await response.json();

	// Extract categories from response
	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload?.categories)) {
		return payload.categories;
	}

	if (Array.isArray(payload?.data)) {
		return payload.data;
	}

	if (Array.isArray(payload?.data?.categories)) {
		return payload.data.categories;
	}

	return [];
}
