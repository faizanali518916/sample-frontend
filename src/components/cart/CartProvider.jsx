'use client';

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { loadCartFromStorage, makeCartItem, normalizeCart, saveCartToStorage } from '@/lib/cart';

const CartContext = createContext(null);

const initialCartState = {
	items: [],
	subtotal: 0,
	itemCount: 0,
};

function cartReducer(state, action) {
	switch (action.type) {
		case 'hydrate': {
			return normalizeCart(action.payload);
		}
		case 'add': {
			const nextItem = makeCartItem(action.payload.product, action.payload.options);
			if (!nextItem) {
				return state;
			}

			const index = state.items.findIndex((item) => item.key === nextItem.key);
			if (index === -1) {
				return normalizeCart({ items: [...state.items, nextItem] });
			}

			const items = state.items.map((item, currentIndex) =>
				currentIndex === index ? { ...item, quantity: item.quantity + nextItem.quantity } : item
			);
			return normalizeCart({ items });
		}
		case 'remove': {
			const items = state.items.filter((item) => item.key !== action.payload.key);
			return normalizeCart({ items });
		}
		case 'set-quantity': {
			const quantity = Math.max(1, Number(action.payload.quantity) || 1);
			const items = state.items.map((item) => (item.key === action.payload.key ? { ...item, quantity } : item));
			return normalizeCart({ items });
		}
		case 'clear': {
			return initialCartState;
		}
		default: {
			return state;
		}
	}
}

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(cartReducer, initialCartState);

	useEffect(() => {
		dispatch({ type: 'hydrate', payload: loadCartFromStorage() });
	}, []);

	useEffect(() => {
		saveCartToStorage(state);
	}, [state]);

	const value = useMemo(() => {
		return {
			cart: state,
			addToCart: (product, options = {}) => dispatch({ type: 'add', payload: { product, options } }),
			removeFromCart: (key) => dispatch({ type: 'remove', payload: { key } }),
			setQuantity: (key, quantity) => dispatch({ type: 'set-quantity', payload: { key, quantity } }),
			clearCart: () => dispatch({ type: 'clear' }),
		};
	}, [state]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used inside CartProvider');
	}

	return context;
}
