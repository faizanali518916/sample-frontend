const localeLoaders = {
	en: [
		() => import('../../locales/en/common.json').then((module) => module.default),
		() => import('../../locales/en/home.json').then((module) => module.default),
		() => import('../../locales/en/testing.json').then((module) => module.default),
		() => import('../../locales/en/business.json').then((module) => module.default),
		() => import('../../locales/en/services.json').then((module) => module.default),
		() => import('../../locales/en/company.json').then((module) => module.default),
		() => import('../../locales/en/forms.json').then((module) => module.default),
		() => import('../../locales/en/blog.json').then((module) => module.default),
	],
	es: [
		() => import('../../locales/es/common.json').then((module) => module.default),
		() => import('../../locales/es/home.json').then((module) => module.default),
		() => import('../../locales/es/testing.json').then((module) => module.default),
		() => import('../../locales/es/business.json').then((module) => module.default),
		() => import('../../locales/es/services.json').then((module) => module.default),
		() => import('../../locales/es/company.json').then((module) => module.default),
		() => import('../../locales/es/forms.json').then((module) => module.default),
		() => import('../../locales/es/blog.json').then((module) => module.default),
	],
};

const fallbackLocale = 'en';

export async function loadMessages(locale) {
	const loaders = localeLoaders[locale] || localeLoaders[fallbackLocale];
	const chunks = await Promise.all(loaders.map((load) => load()));

	return chunks.reduce((merged, chunk) => ({ ...merged, ...chunk }), {});
}
