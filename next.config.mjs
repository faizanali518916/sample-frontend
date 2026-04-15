/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
	// Broad dev-origin allowance (covers most public hosts, subdomains, and localhost variants).
	allowedDevOrigins: ['**.*', 'localhost', '*.localhost', '[::1]'],
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '247labstage.spctek.com',
				port: '8081',
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
