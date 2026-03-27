export const SUPPORTED_LOCALES = ["en", "es"];

export function normalizeLocale(value) {
  if (!value || typeof value !== "string") {
    return "en";
  }

  const short = value.toLowerCase().split("-")[0];
  return SUPPORTED_LOCALES.includes(short) ? short : "en";
}

export function getLocaleFromCookieStore(cookieStore) {
  // Temporary product requirement: keep entire site fixed to English.
  return "en";
}
