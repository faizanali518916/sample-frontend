const API_ORIGIN = 'https://247labstage.spctek.com:9000';

export const API_BASE_URL = `${API_ORIGIN}/api`;
const PRODUCTS_API_URL = `${API_BASE_URL}/products`;
const CATEGORIES_API_URL = `${API_BASE_URL}/category`;
const LAB_LOCATIONS_API_URL = `${API_BASE_URL}/lab-locations`;
const COUNTRY_STATES_API_URL = `${API_BASE_URL}/country-states`;
const INFECTIONS_API_URL = `${API_BASE_URL}/infections`;
const CONTACT_API_URL = `${API_BASE_URL}/contact`;
const APPOINTMENTS_API_URL = `${API_BASE_URL}/appointments`;
const PATIENT_INTAKE_API_URL = `${API_BASE_URL}/patient-intake`;
const CONSENT_FORM_API_URL = `${API_BASE_URL}/consent-form`;
const COVID_SCREENING_API_URL = `${API_BASE_URL}/covid-screening`;

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
