'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Sparkles, X } from 'lucide-react';
import { API_BASE_URL } from '@/lib/api';

const PRODUCTS_API_ENDPOINT = `${API_BASE_URL}/products`;

const TEST_FINDER_TREE = {
	work_legal: {
		label: {
			en: 'Work / Legal',
			es: 'Trabajo / Legal',
		},
		categories: {
			drug_testing: {
				label: {
					en: 'Drug Testing',
					es: 'Pruebas de drogas',
				},
				subcategories: {
					instant_screening: {
						label: {
							en: 'Instant Screening',
							es: 'Deteccion instantanea',
						},
						refinements: {
							instant_5_panel: {
								label: {
									en: 'Instant 5 Panel',
									es: 'Panel de 5 instantaneo',
								},
								productIds: [103, 112],
							},
							instant_10_panel: {
								label: {
									en: 'Instant 10 Panel',
									es: 'Panel de 10-13 instantaneo',
								},
								productIds: [104, 113],
							},
						},
					},
					lab_confirmation: {
						label: {
							en: 'Lab Confirmation',
							es: 'Confirmacion en laboratorio',
						},
						refinements: {
							coc_certified: {
								label: {
									en: 'COC Certified',
									es: 'Certificado COC',
								},
								productIds: [114, 115],
							},
							hair_blood_test: {
								label: {
									en: 'Hair / Blood Test',
									es: 'Prueba de cabello / sangre',
								},
								productIds: [116, 117, 118, 119],
							},
							dot_certified: {
								label: {
									en: 'DOT Certified',
									es: 'Certificado DOT',
								},
								productIds: [26],
							},
						},
					},
				},
			},
			dna_testing: {
				label: {
					en: 'DNA Testing',
					es: 'Pruebas de ADN',
				},
				subcategories: {
					legal_purposes: {
						label: {
							en: 'Legal Purposes',
							es: 'Propositos legales',
						},
						refinements: {
							paternity_test: {
								label: {
									en: 'Paternity Test',
									es: 'Prueba de paternidad',
								},
								productIds: [23],
							},
						},
					},
					informational: {
						label: {
							en: 'Informational',
							es: 'Informativo',
						},
						refinements: {
							family_ancestry: {
								label: {
									en: 'Family Ancestry',
									es: 'Ascendencia familiar',
								},
								productIds: [24],
							},
						},
					},
				},
			},
		},
	},
	wellness: {
		label: {
			en: 'Wellness / Hormones',
			es: 'Bienestar / Hormonas',
		},
		categories: {
			mens_health: {
				label: {
					en: "Men's Health",
					es: 'Salud masculina',
				},
				subcategories: {
					performance_vitality: {
						label: {
							en: 'Performance & Vitality',
							es: 'Rendimiento y vitalidad',
						},
						refinements: {
							hormone_optimization: {
								label: {
									en: 'Hormone Optimization',
									es: 'Optimizacion hormonal',
								},
								productIds: [87, 86, 120],
							},
							fertility_virility: {
								label: {
									en: 'Fertility & Virility',
									es: 'Fertilidad y virilidad',
								},
								productIds: [84],
							},
						},
					},
					cancer_screening: {
						label: {
							en: 'Cancer Screening',
							es: 'Deteccion de cancer',
						},
						refinements: {
							tumor_markers: {
								label: {
									en: 'Tumor Markers',
									es: 'Marcadores tumorales',
								},
								productIds: [85],
							},
						},
					},
				},
			},
			womens_health: {
				label: {
					en: "Women's Health",
					es: 'Salud femenina',
				},
				subcategories: {
					reproductive_hormones: {
						label: {
							en: 'Reproductive & Hormones',
							es: 'Reproductivo y hormonas',
						},
						refinements: {
							fertility_assessment: {
								label: {
									en: 'Fertility Assessment',
									es: 'Evaluacion de fertilidad',
								},
								productIds: [92, 97, 62, 58, 57],
							},
						},
					},
					cancer_screening: {
						label: {
							en: 'Cancer Screening',
							es: 'Deteccion de cancer',
						},
						refinements: {
							tumor_markers: {
								label: {
									en: 'Tumor Markers',
									es: 'Marcadores tumorales',
								},
								productIds: [91, 47],
							},
						},
					},
				},
			},
		},
	},
	symptoms: {
		label: {
			en: 'Symptoms / Illness',
			es: 'Sintomas / Malestar',
		},
		categories: {
			fatigue_weakness: {
				label: {
					en: 'Fatigue & Weakness',
					es: 'Fatiga y debilidad',
				},
				subcategories: {
					thyroid_metabolism: {
						label: {
							en: 'Thyroid & Metabolism',
							es: 'Tiroides y metabolismo',
						},
						refinements: {
							comprehensive_thyroid: {
								label: {
									en: 'Comprehensive Thyroid',
									es: 'Panel tiroideo completo',
								},
								productIds: [2, 95, 122, 63, 64, 76],
							},
						},
					},
					blood_energy_levels: {
						label: {
							en: 'Blood & Energy Levels',
							es: 'Sangre y niveles de energia',
						},
						refinements: {
							anemia_iron_status: {
								label: {
									en: 'Anemia & Iron Status',
									es: 'Anemia y estado del hierro',
								},
								productIds: [31, 34, 60, 81],
							},
						},
					},
				},
			},
			sexual_reproductive: {
				label: {
					en: 'Sexual & Reproductive Health',
					es: 'Salud sexual y reproductiva',
				},
				subcategories: {
					sti_screening: {
						label: {
							en: 'STI Screening',
							es: 'Deteccion de ETS',
						},
						refinements: {
							comprehensive_panel: {
								label: {
									en: 'Comprehensive Panel',
									es: 'Panel completo',
								},
								productIds: [88, 30],
							},
							individual_infections: {
								label: {
									en: 'Individual Infections',
									es: 'Infecciones individuales',
								},
								productIds: [28, 29, 27, 89, 90, 42, 41],
							},
						},
					},
				},
			},
			heart_circulation: {
				label: {
					en: 'Heart & Circulation',
					es: 'Corazon y circulacion',
				},
				subcategories: {
					cardiac_risk: {
						label: {
							en: 'Cardiac Risk Assessment',
							es: 'Evaluacion de riesgo cardiaco',
						},
						refinements: {
							comprehensive_cardiac: {
								label: {
									en: 'Comprehensive Cardiac',
									es: 'Panel cardiaco completo',
								},
								productIds: [3, 93, 69, 55, 66, 78],
							},
						},
					},
				},
			},
		},
	},
	preventive: {
		label: {
			en: 'Preventive Health Screening',
			es: 'Deteccion preventiva de salud',
		},
		categories: {
			general_wellness: {
				label: {
					en: 'General Wellness',
					es: 'Bienestar general',
				},
				subcategories: {
					basic_screening: {
						label: {
							en: 'Basic Screening',
							es: 'Deteccion basica',
						},
						refinements: {
							comprehensive_panel: {
								label: {
									en: 'Comprehensive Panel',
									es: 'Panel completo',
								},
								productIds: [12, 32, 52, 53, 74],
							},
						},
					},
				},
			},
			disease_prevention: {
				label: {
					en: 'Disease Prevention',
					es: 'Prevencion de enfermedades',
				},
				subcategories: {
					viral_immunity: {
						label: {
							en: 'Viral Immunity',
							es: 'Inmunidad viral',
						},
						refinements: {
							immune_status: {
								label: {
									en: 'Immune Status',
									es: 'Estado inmunologico',
								},
								productIds: [33, 39, 40, 36, 37, 80, 48, 99],
							},
						},
					},
					metabolic_endocrine: {
						label: {
							en: 'Metabolic & Endocrine',
							es: 'Metabolico y endocrino',
						},
						refinements: {
							diabetes_metabolic: {
								label: {
									en: 'Diabetes & Metabolism',
									es: 'Diabetes y metabolismo',
								},
								productIds: [94, 82, 70, 79],
							},
						},
					},
				},
			},
			allergy_immunology: {
				label: {
					en: 'Allergies & Immunology',
					es: 'Alergias e inmunologia',
				},
				subcategories: {
					food_environmental: {
						label: {
							en: 'Food & Environmental',
							es: 'Alimentos y ambientales',
						},
						refinements: {
							food_allergies: {
								label: {
									en: 'Food Allergies',
									es: 'Alergias alimentarias',
								},
								productIds: [16, 19, 20],
							},
							environmental_allergies: {
								label: {
									en: 'Environmental Allergies',
									es: 'Alergias ambientales',
								},
								productIds: [17, 18, 21],
							},
						},
					},
				},
			},
		},
	},
};

function getCurrentLocale(locale) {
	return locale?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

function getLabel(value, language) {
	if (!value) {
		return '';
	}

	return value?.[language] || value?.en || '';
}

function extractProducts(payload) {
	if (Array.isArray(payload)) {
		return payload;
	}

	if (Array.isArray(payload?.products)) {
		return payload.products;
	}

	if (Array.isArray(payload?.data)) {
		return payload.data;
	}

	if (Array.isArray(payload?.data?.products)) {
		return payload.data.products;
	}

	return [];
}

function normalizeProduct(product) {
	if (!product?.id) return null;

	const price = Number(product.regular_price);

	return {
		id: product.id,
		image: product.main_image ?? null,
		name: product.name ?? null,
		price: Number.isFinite(price) ? price : null,
	};
}

export default function AITestFinderModal({ isOpen, onClose, locale = 'en' }) {
	const t = useTranslations('AITestFinderModal');
	const language = getCurrentLocale(locale);
	const copy = {
		title: t('title'),
		subtitle: t('subtitle'),
		close: t('close'),
		back: t('back'),
		step: t('step'),
		of: t('of'),
		intentTitle: t('intentTitle'),
		categoryTitle: t('categoryTitle'),
		subcategoryTitle: t('subcategoryTitle'),
		refinementTitle: t('refinementTitle'),
		recommendedTitle: t('recommendedTitle'),
		recommendedBody: t('recommendedBody'),
		loading: t('loading'),
		empty: t('empty'),
		price: t('price'),
		priceUnavailable: t('priceUnavailable'),
		bookNow: t('bookNow'),
		fallbackProductName: t('fallbackProductName'),
		fallbackTestName: t('fallbackTestName'),
		ariaLabel: t('ariaLabel'),
		badgeTitle: t('badgeTitle'),
		loadError: t('loadError'),
	};
	const currencyFormatter = useMemo(
		() =>
			new Intl.NumberFormat(language === 'es' ? 'es-US' : 'en-US', {
				style: 'currency',
				currency: 'USD',
			}),
		[language]
	);

	const [step, setStep] = useState(1);
	const [path, setPath] = useState({
		intent: null,
		category: null,
		subcategory: null,
		refinement: null,
	});
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);
	const [recommendedProducts, setRecommendedProducts] = useState([]);

	const activeIntent = useMemo(() => (path.intent ? TEST_FINDER_TREE[path.intent] : null), [path.intent]);

	const activeCategory = useMemo(() => {
		if (!activeIntent || !path.category) {
			return null;
		}

		return activeIntent.categories[path.category] || null;
	}, [activeIntent, path.category]);

	const activeSubcategory = useMemo(() => {
		if (!activeCategory || !path.subcategory) {
			return null;
		}

		return activeCategory.subcategories[path.subcategory] || null;
	}, [activeCategory, path.subcategory]);

	const selectedProductIds = useMemo(() => {
		if (!activeSubcategory || !path.refinement) {
			return [];
		}

		return activeSubcategory.refinements[path.refinement]?.productIds || [];
	}, [activeSubcategory, path.refinement]);

	useEffect(() => {
		if (!isOpen) {
			return undefined;
		}

		const onKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.body.style.overflow = 'hidden';
		window.addEventListener('keydown', onKeyDown);

		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (!isOpen || step !== 5) {
			return;
		}

		if (selectedProductIds.length === 0) {
			setRecommendedProducts([]);
			return;
		}

		const abortController = new AbortController();

		const loadRecommendedProducts = async () => {
			setIsLoadingProducts(true);

			try {
				const response = await fetch(PRODUCTS_API_ENDPOINT, {
					signal: abortController.signal,
					cache: 'no-store',
				});

				if (!response.ok) {
					throw new Error(copy.loadError);
				}

				const payload = await response.json();
				const products = extractProducts(payload).map(normalizeProduct).filter(Boolean);

				const productById = new Map(products.map((product) => [product.id, product]));

				const orderedRecommendations = selectedProductIds.map((id) => {
					const match = productById.get(id);
					if (match) {
						return match;
					}

					return {
						id,
						name: `${copy.fallbackTestName} #${id}`,
						image: null,
						price: null,
					};
				});

				setRecommendedProducts(orderedRecommendations);
			} catch {
				setRecommendedProducts(
					selectedProductIds.map((id) => ({
						id,
						name: `${copy.fallbackTestName} #${id}`,
						image: null,
						price: null,
					}))
				);
			} finally {
				setIsLoadingProducts(false);
			}
		};

		loadRecommendedProducts();

		return () => {
			abortController.abort();
		};
	}, [copy.fallbackTestName, copy.loadError, isOpen, selectedProductIds, step]);

	if (!isOpen) {
		return null;
	}

	const resetAndClose = () => {
		setStep(1);
		setPath({
			intent: null,
			category: null,
			subcategory: null,
			refinement: null,
		});
		setRecommendedProducts([]);
		setIsLoadingProducts(false);
		onClose();
	};

	const stepProgress = Math.min((step / 4) * 100, 100);

	const intentOptions = Object.entries(TEST_FINDER_TREE);
	const categoryOptions = activeIntent ? Object.entries(activeIntent.categories) : [];
	const subcategoryOptions = activeCategory ? Object.entries(activeCategory.subcategories) : [];
	const refinementOptions = activeSubcategory ? Object.entries(activeSubcategory.refinements) : [];

	const showBack = step > 1;
	const formatPrice = (price) =>
		typeof price === 'number' && Number.isFinite(price) ? currencyFormatter.format(price) : copy.priceUnavailable;

	const getStepTitle = () => {
		if (step === 1) {
			return copy.intentTitle;
		}
		if (step === 2) {
			return copy.categoryTitle;
		}
		if (step === 3) {
			return copy.subcategoryTitle;
		}
		if (step === 4) {
			return copy.refinementTitle;
		}
		return copy.recommendedTitle;
	};

	const goBack = () => {
		if (step === 5) {
			setStep(4);
			setRecommendedProducts([]);
			return;
		}

		if (step === 4) {
			setStep(3);
			setPath((prev) => ({ ...prev, refinement: null }));
			return;
		}

		if (step === 3) {
			setStep(2);
			setPath((prev) => ({ ...prev, subcategory: null, refinement: null }));
			return;
		}

		if (step === 2) {
			setStep(1);
			setPath({
				intent: null,
				category: null,
				subcategory: null,
				refinement: null,
			});
		}
	};

	const renderStepContent = () => {
		if (step === 1) {
			return (
				<div className="grid gap-3 sm:grid-cols-2">
					{intentOptions.map(([intentKey, intent]) => (
						<button
							key={intentKey}
							type="button"
							onClick={() => {
								setPath({
									intent: intentKey,
									category: null,
									subcategory: null,
									refinement: null,
								});
								setStep(2);
							}}
							className="rounded-2xl border border-sky-200 bg-sky-50/70 px-3 py-3 text-left transition hover:border-[var(--tl-primary)] hover:bg-white sm:px-4 sm:py-4"
						>
							<p className="font-display text-sm font-bold text-slate-900 sm:text-base">
								{getLabel(intent.label, language)}
							</p>
						</button>
					))}
				</div>
			);
		}

		if (step === 2) {
			return (
				<div className="grid gap-3 sm:grid-cols-2">
					{categoryOptions.map(([categoryKey, category]) => (
						<button
							key={categoryKey}
							type="button"
							onClick={() => {
								setPath((prev) => ({
									...prev,
									category: categoryKey,
									subcategory: null,
									refinement: null,
								}));
								setStep(3);
							}}
							className="rounded-2xl border border-sky-200 bg-sky-50/70 px-3 py-3 text-left transition hover:border-[var(--tl-primary)] hover:bg-white sm:px-4 sm:py-4"
						>
							<p className="font-display text-sm font-bold text-slate-900 sm:text-base">
								{getLabel(category.label, language)}
							</p>
						</button>
					))}
				</div>
			);
		}

		if (step === 3) {
			return (
				<div className="grid gap-3 sm:grid-cols-2">
					{subcategoryOptions.map(([subcategoryKey, subcategory]) => (
						<button
							key={subcategoryKey}
							type="button"
							onClick={() => {
								setPath((prev) => ({
									...prev,
									subcategory: subcategoryKey,
									refinement: null,
								}));
								setStep(4);
							}}
							className="rounded-2xl border border-sky-200 bg-sky-50/70 px-3 py-3 text-left transition hover:border-[var(--tl-primary)] hover:bg-white sm:px-4 sm:py-4"
						>
							<p className="font-display text-sm font-bold text-slate-900 sm:text-base">
								{getLabel(subcategory.label, language)}
							</p>
						</button>
					))}
				</div>
			);
		}

		if (step === 4) {
			return (
				<div className="grid gap-3 sm:grid-cols-2">
					{refinementOptions.map(([refinementKey, refinement]) => (
						<button
							key={refinementKey}
							type="button"
							onClick={() => {
								setPath((prev) => ({ ...prev, refinement: refinementKey }));
								setStep(5);
							}}
							className="rounded-2xl border border-sky-200 bg-sky-50/70 px-3 py-3 text-left transition hover:border-[var(--tl-primary)] hover:bg-white sm:px-4 sm:py-4"
						>
							<p className="font-display text-sm font-bold text-slate-900 sm:text-base">
								{getLabel(refinement.label, language)}
							</p>
						</button>
					))}
				</div>
			);
		}

		return (
			<div className="flex h-full min-h-0 flex-col gap-4">
				<p className="text-[13px] text-slate-600 sm:text-sm">{copy.recommendedBody}</p>

				{isLoadingProducts ? (
					<p className="rounded-2xl border border-sky-100 bg-sky-50/70 px-3 py-4 text-xs font-semibold text-[var(--tl-primary)] sm:px-4 sm:py-5 sm:text-sm">
						{copy.loading}
					</p>
				) : recommendedProducts.length === 0 ? (
					<p className="rounded-2xl border border-sky-100 bg-sky-50/70 px-3 py-4 text-xs text-slate-600 sm:px-4 sm:py-5 sm:text-sm">
						{copy.empty}
					</p>
				) : (
					<div className="min-h-0 flex-1 overflow-y-auto pr-1">
						{recommendedProducts.map((product) => (
							<div
								key={product.id}
								className="mb-3 flex flex-col gap-3 rounded-2xl border border-sky-100 bg-white p-3 shadow-sm transition last:mb-0 hover:border-sky-200 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
							>
								<div className="to-sky-25 relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-sky-50 sm:h-20 sm:w-24">
									{product.image ? (
										<Image
											src={product.image}
											alt={product.name ?? `${copy.fallbackProductName} ${product.id}`}
											fill
											sizes="(max-width: 640px) 100vw, 96px"
											className="object-cover object-center"
										/>
									) : (
										<div className="grid h-full w-full place-items-center">
											<div className="text-center">
												<p className="text-lg font-bold text-sky-200">#{product.id}</p>
											</div>
										</div>
									)}
								</div>
								<div className="min-w-0 flex-1">
									<div className="space-y-1">
										<p className="font-display truncate text-sm font-bold text-slate-900 sm:text-lg">
											{product.name ?? `${copy.fallbackProductName} ${product.id}`}
										</p>
										<p className="text-xs font-semibold text-[var(--tl-primary-strong)] sm:text-sm">
											{copy.price}: {formatPrice(product.price)}
										</p>
									</div>
								</div>
								<div className="w-full sm:w-auto">
									<button
										type="button"
										className="w-full rounded-full bg-[var(--tl-primary)] px-4 py-2.5 text-xs font-bold tracking-wide text-white uppercase transition hover:bg-[var(--tl-primary-strong)] sm:w-auto sm:min-w-[132px]"
									>
										{copy.bookNow}
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		);
	};

	return (
		<div
			className="fixed inset-0 z-[220] flex items-start justify-center bg-slate-900/45 px-4 pt-24 pb-4 sm:px-6 sm:pt-24 sm:pb-6"
			role="dialog"
			aria-modal="true"
			aria-label={copy.ariaLabel}
			onPointerDown={(event) => {
				if (event.target === event.currentTarget) {
					resetAndClose();
				}
			}}
		>
			<div
				className="flex max-h-[72dvh] w-[calc(100%-3.25rem)] max-w-3xl flex-col overflow-hidden rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] p-4 shadow-[0_30px_80px_-35px_rgba(3,86,197,0.55)] sm:max-h-[calc(100dvh-7rem)] sm:w-full sm:p-6"
				onPointerDown={(event) => event.stopPropagation()}
			>
				<div className="flex items-start justify-end gap-3 sm:justify-between">
					<div className="hidden sm:block">
						<p className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-[var(--tl-primary)] uppercase">
							<Sparkles className="h-3.5 w-3.5" />
							{copy.badgeTitle}
						</p>
						<h3 className="font-display mt-2 text-xl font-black text-slate-900 sm:mt-3 sm:text-2xl">{copy.title}</h3>
						<p className="mt-1 text-sm text-slate-600">{copy.subtitle}</p>
					</div>
					<button
						type="button"
						onClick={resetAndClose}
						className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 sm:h-10 sm:w-10"
						aria-label={copy.close}
					>
						<X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
					</button>
				</div>

				<div className="mt-2 sm:mt-5">
					<div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.08em] text-slate-500 uppercase sm:text-xs">
						<span>
							{copy.step} {Math.min(step, 4)} {copy.of} 4
						</span>
						{showBack ? (
							<button
								type="button"
								onClick={goBack}
								className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-bold text-slate-700 transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)] sm:px-3 sm:py-1 sm:text-[11px]"
							>
								<ArrowLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
								{copy.back}
							</button>
						) : (
							<span />
						)}
					</div>
					<div className="mt-2 h-1.5 rounded-full bg-sky-100 sm:h-2">
						<div
							className="h-full rounded-full bg-[var(--tl-primary)] transition-all duration-300"
							style={{ width: `${stepProgress}%` }}
						/>
					</div>
				</div>

				<div className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-sky-100/80 bg-white/90 p-3.5 sm:mt-5 sm:p-5">
					<h4 className="font-display text-base font-extrabold text-slate-900 sm:text-lg">{getStepTitle()}</h4>
					<div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1 sm:mt-4">{renderStepContent()}</div>
				</div>
			</div>
		</div>
	);
}
