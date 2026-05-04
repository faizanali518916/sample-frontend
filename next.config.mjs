/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
	allowedDevOrigins: ['**.*', 'localhost', '*.localhost', '[::1]'],
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '247labstage.spctek.com',
				port: '9000',
				pathname: '/uploads/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000',
				pathname: '/uploads/**',
			},
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '3000',
				pathname: '/uploads/**',
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
