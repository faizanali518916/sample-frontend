import { Manrope, Montserrat } from 'next/font/google';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import RouteScrollReset from '@/components/common/RouteScrollReset';
import SiteNavbar from '@/components/common/SiteNavbar';
import SiteFooter from '@/components/common/SiteFooter';
import FloatingLocaleSwitcher from '@/components/common/FloatingLocaleSwitcher';
import { CartProvider } from '@/components/cart/CartProvider';
import { DataProvider } from '@/components/providers/DataProvider';
import { loadMessages } from '@/i18n/loadMessages';
import { getLocaleFromCookieStore } from '@/lib/locale';
import './globals.css';

const montserrat = Montserrat({
	variable: '--font-montserrat',
	subsets: ['latin'],
	weight: ['500', '600', '700', '800', '900'],
});

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
});

export const metadata = {
	title: '24-7 Labs | Tampa Testing Services',
	description:
		'24-7 Labs homepage rebuilt with Next.js and Tailwind CSS, featuring diagnostics services, scheduling, reviews, and contact details.',
};

export default async function RootLayout({ children }) {
	const cookieStore = await cookies();
	const locale = getLocaleFromCookieStore(cookieStore);
	const messages = await loadMessages(locale);

	return (
		<html
			lang={locale}
			data-scroll-behavior="smooth"
			className={`${montserrat.variable} ${manrope.variable} h-full scroll-smooth antialiased`}
		>
			<body className="min-h-full bg-[var(--tl-surface)] font-sans text-[var(--tl-ink)]">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<DataProvider>
						<CartProvider>
							<RouteScrollReset />
							<SiteNavbar />
							<div className="pt-[98px]">{children}</div>
							<SiteFooter locale={locale} />
							<FloatingLocaleSwitcher />
						</CartProvider>
					</DataProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
