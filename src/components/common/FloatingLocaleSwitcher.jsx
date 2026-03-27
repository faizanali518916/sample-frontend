"use client";

import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const localeButtonClass = {
  default:
    "rounded-full border border-slate-300 bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]",
  active:
    "rounded-full border border-[var(--tl-primary)] bg-[var(--tl-primary)] px-3 py-1.5 text-xs font-bold text-white shadow-sm",
};

export default function FloatingLocaleSwitcher() {
  return null;

  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("FloatingLocaleSwitcher");

  const setLanguage = (nextLocale) => {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  const buttonClassByLocale = {
    en: locale === "en" ? localeButtonClass.active : localeButtonClass.default,
    es: locale === "es" ? localeButtonClass.active : localeButtonClass.default,
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/70 bg-white/90 p-1.5 shadow-[0_16px_40px_-26px_rgba(5,7,13,0.85)] backdrop-blur">
        <button
          type="button"
          className={buttonClassByLocale.en}
          onClick={() => setLanguage("en")}
          aria-label={t("switchToEnglish")}
        >
          {t("englishShort")}
        </button>
        <button
          type="button"
          className={buttonClassByLocale.es}
          onClick={() => setLanguage("es")}
          aria-label={t("switchToSpanish")}
        >
          {t("spanishShort")}
        </button>
      </div>
    </div>
  );
}
