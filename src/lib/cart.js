const CART_STORAGE_KEY = 'twentylab.cart.v1';

function toNumber(value) {
	const numeric = Number(value);
	return Number.isFinite(numeric) ? numeric : null;
}

export function getItemPrice(item) {
	const salePrice = toNumber(item?.salePrice ?? item?.sale_price);
	const regularPrice = toNumber(item?.regularPrice ?? item?.regular_price);

	if (salePrice !== null && salePrice > 0) {
		return salePrice;
	}

	if (regularPrice !== null && regularPrice > 0) {
		return regularPrice;
	}

	return null;
}

export function makeCartItem(product, options = {}) {
	if (!product?.id) {
		return null;
	}

	const quantity = Math.max(1, Number(options.quantity) || 1);
	const variantId = options.variantId ? String(options.variantId) : null;
	const variantLabel = options.variantLabel ? String(options.variantLabel) : null;
	const price = getItemPrice(product);
	const image = product.mainImage || product.image || '/images/placeholder.png';

	return {
		id: String(product.id),
		variantId,
		key: variantId ? `${product.id}:${variantId}` : String(product.id),
		name: product.name ?? `Product ${product.id}`,
		price,
		quantity,
		image,
		variantLabel,
	};
}

export function normalizeCart(rawCart) {
	const items = Array.isArray(rawCart?.items)
		? rawCart.items
				.map((item) => {
					if (!item?.id || !item?.key) {
						return null;
					}

					const quantity = Math.max(1, Number(item.quantity) || 1);
					const price = toNumber(item.price);

					return {
						id: String(item.id),
						variantId: item.variantId ? String(item.variantId) : null,
						key: String(item.key),
						name: item.name ?? `Product ${item.id}`,
						price,
						quantity,
						image: item.image || '/images/placeholder.png',
						variantLabel: item.variantLabel ? String(item.variantLabel) : null,
					};
				})
				.filter(Boolean)
		: [];

	const subtotal = items.reduce((total, item) => {
		return total + (item.price || 0) * item.quantity;
	}, 0);
	const itemCount = items.reduce((total, item) => total + item.quantity, 0);

	return {
		items,
		subtotal,
		itemCount,
	};
}

export function loadCartFromStorage() {
	if (typeof window === 'undefined') {
		return normalizeCart({ items: [] });
	}

	try {
		const value = window.localStorage.getItem(CART_STORAGE_KEY);
		if (!value) {
			return normalizeCart({ items: [] });
		}

		return normalizeCart(JSON.parse(value));
	} catch {
		return normalizeCart({ items: [] });
	}
}

export function saveCartToStorage(cart) {
	if (typeof window === 'undefined') {
		return;
	}

	window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: cart.items }));
}

export { CART_STORAGE_KEY };
