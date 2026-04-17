import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const metadata = {
	title: 'Page Not Found | 24-7 Labs',
	description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
	// Note: useTranslations cannot be used in async components
	// This is a server component, so we'll use a client wrapper
	return <NotFoundClient />;
}

function NotFoundClient() {
	const t = useTranslations('NotFoundPage');

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md text-center">
				<div className="mb-8">
					<h1 className="font-display text-var-tl-primary mb-4 text-9xl font-bold sm:text-[10rem]">{t('heading')}</h1>
					<p className="mb-4 text-lg text-slate-700 sm:text-xl">{t('subtitle')}</p>
				</div>

				<Link
					href={t('buttonHref')}
					className="bg-var-tl-primary hover:bg-opacity-90 inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
				>
					{t('buttonText')}
				</Link>
			</div>
		</div>
	);
}
