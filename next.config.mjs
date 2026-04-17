/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
	allowedDevOrigins: ['**.*', 'localhost', '*.localhost', '[::1]'],
	images: {
		remotePatterns: [
			{
				port: '9000',
				protocol: 'https',
				pathname: '/uploads/**',
				hostname: '247labstage.spctek.com',
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
