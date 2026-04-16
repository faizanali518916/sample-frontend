import { useEffect, useState } from 'react';
import { fetchProducts } from '@/lib/api';
import { getDisplayPrice } from './utils';

function toRecommendation(product) {
	return {
		id: product.id,
		image: product.mainImage,
		name: product.name ?? null,
		price: getDisplayPrice(product),
	};
}

export default function useRecommendedProducts({ isOpen, step, selectedProductIds, fallbackTestName }) {
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);
	const [recommendedProducts, setRecommendedProducts] = useState([]);

	useEffect(() => {
		if (!isOpen || step !== 5) {
			return;
		}

		if (selectedProductIds.length === 0) {
			setRecommendedProducts([]);
			return;
		}

		let isActive = true;

		const loadRecommendedProducts = async () => {
			setIsLoadingProducts(true);

			try {
				const products = await fetchProducts();
				if (!isActive) {
					return;
				}

				const productById = new Map(products.map((product) => [String(product.id), product]));
				const orderedRecommendations = selectedProductIds.map((id) => {
					const match = productById.get(String(id));
					if (match) {
						return toRecommendation(match);
					}

					return {
						id,
						name: `${fallbackTestName} #${id}`,
						image: '/images/placeholder.png',
						price: null,
					};
				});

				setRecommendedProducts(orderedRecommendations);
			} catch {
				if (!isActive) {
					return;
				}

				setRecommendedProducts(
					selectedProductIds.map((id) => ({
						id,
						name: `${fallbackTestName} #${id}`,
						image: '/images/placeholder.png',
						price: null,
					}))
				);
			} finally {
				if (isActive) {
					setIsLoadingProducts(false);
				}
			}
		};

		loadRecommendedProducts();

		return () => {
			isActive = false;
		};
	}, [fallbackTestName, isOpen, selectedProductIds, step]);

	const resetRecommendedProducts = () => {
		setRecommendedProducts([]);
		setIsLoadingProducts(false);
	};

	return {
		isLoadingProducts,
		recommendedProducts,
		resetRecommendedProducts,
	};
}
