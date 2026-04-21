const API_ORIGIN =
	process.env.NEXT_PUBLIC_MODE === 'dev' ? 'http://localhost:3000/api' : 'https://247labstage.spctek.com:9000/api';
console.log('Development mode:', process.env.NEXT_PUBLIC_MODE);
console.log('API_ORIGIN set to:', API_ORIGIN);

const PRODUCTS_API_URL = `${API_ORIGIN}/products`;
const CATEGORIES_API_URL = `${API_ORIGIN}/category`;
const BLOGS_API_URL = `${API_ORIGIN}/blogs`;

const INFECTIONS_API_URL = `${API_ORIGIN}/infections`;
const LAB_LOCATIONS_API_URL = `${API_ORIGIN}/lab-locations`;
const COUNTRY_STATES_API_URL = `${API_ORIGIN}/country-states`;

const CONTACT_API_URL = `${API_ORIGIN}/contact`;
const APPOINTMENTS_API_URL = `${API_ORIGIN}/appointments`;
const CONSENT_FORM_API_URL = `${API_ORIGIN}/consent-form`;
const PATIENT_INTAKE_API_URL = `${API_ORIGIN}/patient-intake`;
const COVID_SCREENING_API_URL = `${API_ORIGIN}/covid-screening`;
const ORDERS_API_URL = `${API_ORIGIN}/orders`;
const COUPONS_API_URL = `${API_ORIGIN}/coupons`;

async function parseJsonResponse(response) {
	if (!response.ok) {
		throw new Error(`API failed with status ${response.status}`);
	}

	return response.json();
}

function withJsonOptions(body) {
	return {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	};
}

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

export function normalizeBlog(blog) {
	if (!blog?.id) {
		return null;
	}

	return {
		id: blog.id,
		slug: blog.slug ?? String(blog.id),
		title: blog.title ?? null,
		author: blog.author ?? null,
		blogcontent: blog.blogcontent ?? '',
		thumbnailimage: resolveImageUrl(blog.thumbnailimage),
		created_at: blog.created_at ?? null,
		categories: Array.isArray(blog.categories)
			? blog.categories.map((category) => ({
					id: category?.id,
					name: category?.name ?? null,
				}))
			: [],
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

export async function fetchBlogs() {
	const response = await fetch(BLOGS_API_URL, {
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`Blogs API failed with status ${response.status}`);
	}

	const payload = await response.json();
	const blogs = Array.isArray(payload)
		? payload
		: Array.isArray(payload?.blogs)
			? payload.blogs
			: Array.isArray(payload?.data)
				? payload.data
				: [];

	return blogs.map(normalizeBlog).filter(Boolean);
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

export async function fetchLabLocations() {
	const response = await fetch(LAB_LOCATIONS_API_URL, {
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	const payload = await parseJsonResponse(response);

	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload?.data)) {
		return payload.data;
	}

	if (Array.isArray(payload?.locations)) {
		return payload.locations;
	}

	return [];
}

export async function fetchCountryStates() {
	const response = await fetch(COUNTRY_STATES_API_URL, {
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	const payload = await parseJsonResponse(response);

	console.log('Fetched country states:', payload);

	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload?.data)) {
		return payload.data;
	}

	if (Array.isArray(payload?.countryStates)) {
		return payload.countryStates;
	}

	return [];
}

export async function fetchInfections() {
	const response = await fetch(INFECTIONS_API_URL, {
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	const payload = await parseJsonResponse(response);

	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload?.data)) {
		return payload.data;
	}

	if (Array.isArray(payload?.infections)) {
		return payload.infections;
	}

	return [];
}

export async function submitContactForm(payload) {
	const response = await fetch(CONTACT_API_URL, withJsonOptions(payload));
	return parseJsonResponse(response);
}

export async function submitAppointmentForm(payload) {
	const response = await fetch(APPOINTMENTS_API_URL, withJsonOptions(payload));
	return parseJsonResponse(response);
}

export async function submitPatientIntakeForm(payload) {
	const response = await fetch(PATIENT_INTAKE_API_URL, withJsonOptions(payload));
	return parseJsonResponse(response);
}

export async function submitPrescriptionConsentForm(payload) {
	const response = await fetch(CONSENT_FORM_API_URL, withJsonOptions(payload));
	return parseJsonResponse(response);
}

export async function submitCovidScreeningForm(payload) {
	const response = await fetch(COVID_SCREENING_API_URL, withJsonOptions(payload));
	return parseJsonResponse(response);
}

export async function validateCoupon(code) {
	const normalizedCode = String(code || '')
		.trim()
		.toUpperCase();
	if (!normalizedCode) {
		throw new Error('Coupon code is required');
	}

	const response = await fetch(`${COUPONS_API_URL}/validate/${encodeURIComponent(normalizedCode)}`, {
		method: 'POST',
		cache: 'no-store',
		headers: {
			Accept: 'application/json',
		},
	});

	let payload = null;
	try {
		payload = await response.json();
	} catch {
		payload = null;
	}

	if (!response.ok) {
		throw new Error(payload?.error || `API failed with status ${response.status}`);
	}

	if (payload?.valid) {
		return payload;
	}

	throw new Error(payload?.error || 'Invalid or expired coupon code');
}

export async function createOrder(payload) {
	const response = await fetch(ORDERS_API_URL, withJsonOptions(payload));
	return parseJsonResponse(response);
}
