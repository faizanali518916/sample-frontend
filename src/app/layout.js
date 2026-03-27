import { Manrope, Montserrat } from "next/font/google";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import RouteScrollReset from "@/components/common/RouteScrollReset";
import SiteNavbar from "@/components/common/SiteNavbar";
import SiteFooter from "@/components/common/SiteFooter";
import FloatingLocaleSwitcher from "@/components/common/FloatingLocaleSwitcher";
import { getLocaleFromCookieStore } from "@/lib/locale";
import "./globals.css";

const messagesByLocale = {
  en: () => import("../../messages/en.json").then((module) => module.default),
  es: () => import("../../messages/es.json").then((module) => module.default),
};

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata = {
  title: "24-7 Labs | Tampa Testing Services",
  description:
    "24-7 Labs homepage rebuilt with Next.js and Tailwind CSS, featuring diagnostics services, scheduling, reviews, and contact details.",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const locale = getLocaleFromCookieStore(cookieStore);
  const loadMessages = messagesByLocale[locale] || messagesByLocale.en;
  const messages = await loadMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--tl-surface)] font-sans text-[var(--tl-ink)]">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <RouteScrollReset />
          <SiteNavbar />
          {children}
          <SiteFooter locale={locale} />
          <FloatingLocaleSwitcher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
