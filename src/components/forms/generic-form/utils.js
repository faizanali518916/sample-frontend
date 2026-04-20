export const inputClassName =
	'mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15';

export function safeT(t, key, fallback = '') {
	try {
		return t(key);
	} catch {
		return fallback;
	}
}

export function safeRaw(t, key, fallback = null) {
	try {
		return t.raw(key);
	} catch {
		return fallback;
	}
}

export function toIsoDate(value) {
	if (!value) {
		return null;
	}

	const parsed = new Date(`${value}T00:00:00`);
	if (Number.isNaN(parsed.getTime())) {
		return null;
	}

	return parsed.toISOString();
}

export function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function normalizePhone(value) {
	return String(value ?? '').replace(/\D/g, '');
}
