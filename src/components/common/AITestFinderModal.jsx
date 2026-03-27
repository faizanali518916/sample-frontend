"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Sparkles, X } from "lucide-react";

const API_PROXY_ENDPOINT = "/api/test-finder-products";

const TEST_FINDER_TREE = {
  work_legal: {
    label: {
      en: "Work / Legal",
      es: "Trabajo / Legal",
    },
    categories: {
      drug_testing: {
        label: {
          en: "Drug Testing",
          es: "Pruebas de drogas",
        },
        subcategories: {
          instant_screening: {
            label: {
              en: "Instant Screening",
              es: "Deteccion instantanea",
            },
            refinements: {
              instant_5_panel: {
                label: {
                  en: "Instant 5 Panel",
                  es: "Panel de 5 instantaneo",
                },
                productIds: [103, 112],
              },
              instant_10_panel: {
                label: {
                  en: "Instant 10 Panel",
                  es: "Panel de 10-13 instantaneo",
                },
                productIds: [104, 113],
              },
            },
          },
          lab_confirmation: {
            label: {
              en: "Lab Confirmation",
              es: "Confirmacion en laboratorio",
            },
            refinements: {
              coc_certified: {
                label: {
                  en: "COC Certified",
                  es: "Certificado COC",
                },
                productIds: [114, 115],
              },
              hair_blood_test: {
                label: {
                  en: "Hair / Blood Test",
                  es: "Prueba de cabello / sangre",
                },
                productIds: [116, 117, 118, 119],
              },
              dot_certified: {
                label: {
                  en: "DOT Certified",
                  es: "Certificado DOT",
                },
                productIds: [26],
              },
            },
          },
        },
      },
      dna_testing: {
        label: {
          en: "DNA Testing",
          es: "Pruebas de ADN",
        },
        subcategories: {
          legal_purposes: {
            label: {
              en: "Legal Purposes",
              es: "Propositos legales",
            },
            refinements: {
              paternity_test: {
                label: {
                  en: "Paternity Test",
                  es: "Prueba de paternidad",
                },
                productIds: [23],
              },
            },
          },
          informational: {
            label: {
              en: "Informational",
              es: "Informativo",
            },
            refinements: {
              family_ancestry: {
                label: {
                  en: "Family Ancestry",
                  es: "Ascendencia familiar",
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
      en: "Wellness / Hormones",
      es: "Bienestar / Hormonas",
    },
    categories: {
      mens_health: {
        label: {
          en: "Men's Health",
          es: "Salud masculina",
        },
        subcategories: {
          performance_vitality: {
            label: {
              en: "Performance & Vitality",
              es: "Rendimiento y vitalidad",
            },
            refinements: {
              hormone_optimization: {
                label: {
                  en: "Hormone Optimization",
                  es: "Optimizacion hormonal",
                },
                productIds: [87, 86, 120],
              },
              fertility_virility: {
                label: {
                  en: "Fertility & Virility",
                  es: "Fertilidad y virilidad",
                },
                productIds: [84],
              },
            },
          },
          cancer_screening: {
            label: {
              en: "Cancer Screening",
              es: "Deteccion de cancer",
            },
            refinements: {
              tumor_markers: {
                label: {
                  en: "Tumor Markers",
                  es: "Marcadores tumorales",
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
          es: "Salud femenina",
        },
        subcategories: {
          reproductive_hormones: {
            label: {
              en: "Reproductive & Hormones",
              es: "Reproductivo y hormonas",
            },
            refinements: {
              fertility_assessment: {
                label: {
                  en: "Fertility Assessment",
                  es: "Evaluacion de fertilidad",
                },
                productIds: [92, 97, 62, 58, 57],
              },
            },
          },
          cancer_screening: {
            label: {
              en: "Cancer Screening",
              es: "Deteccion de cancer",
            },
            refinements: {
              tumor_markers: {
                label: {
                  en: "Tumor Markers",
                  es: "Marcadores tumorales",
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
      en: "Symptoms / Illness",
      es: "Sintomas / Malestar",
    },
    categories: {
      fatigue_weakness: {
        label: {
          en: "Fatigue & Weakness",
          es: "Fatiga y debilidad",
        },
        subcategories: {
          thyroid_metabolism: {
            label: {
              en: "Thyroid & Metabolism",
              es: "Tiroides y metabolismo",
            },
            refinements: {
              comprehensive_thyroid: {
                label: {
                  en: "Comprehensive Thyroid",
                  es: "Panel tiroideo completo",
                },
                productIds: [2, 95, 122, 63, 64, 76],
              },
            },
          },
          blood_energy_levels: {
            label: {
              en: "Blood & Energy Levels",
              es: "Sangre y niveles de energia",
            },
            refinements: {
              anemia_iron_status: {
                label: {
                  en: "Anemia & Iron Status",
                  es: "Anemia y estado del hierro",
                },
                productIds: [31, 34, 60, 81],
              },
            },
          },
        },
      },
      sexual_reproductive: {
        label: {
          en: "Sexual & Reproductive Health",
          es: "Salud sexual y reproductiva",
        },
        subcategories: {
          sti_screening: {
            label: {
              en: "STI Screening",
              es: "Deteccion de ETS",
            },
            refinements: {
              comprehensive_panel: {
                label: {
                  en: "Comprehensive Panel",
                  es: "Panel completo",
                },
                productIds: [88, 30],
              },
              individual_infections: {
                label: {
                  en: "Individual Infections",
                  es: "Infecciones individuales",
                },
                productIds: [28, 29, 27, 89, 90, 42, 41],
              },
            },
          },
        },
      },
      heart_circulation: {
        label: {
          en: "Heart & Circulation",
          es: "Corazon y circulacion",
        },
        subcategories: {
          cardiac_risk: {
            label: {
              en: "Cardiac Risk Assessment",
              es: "Evaluacion de riesgo cardiaco",
            },
            refinements: {
              comprehensive_cardiac: {
                label: {
                  en: "Comprehensive Cardiac",
                  es: "Panel cardiaco completo",
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
      en: "Preventive Health Screening",
      es: "Deteccion preventiva de salud",
    },
    categories: {
      general_wellness: {
        label: {
          en: "General Wellness",
          es: "Bienestar general",
        },
        subcategories: {
          basic_screening: {
            label: {
              en: "Basic Screening",
              es: "Deteccion basica",
            },
            refinements: {
              comprehensive_panel: {
                label: {
                  en: "Comprehensive Panel",
                  es: "Panel completo",
                },
                productIds: [12, 32, 52, 53, 74],
              },
            },
          },
        },
      },
      disease_prevention: {
        label: {
          en: "Disease Prevention",
          es: "Prevencion de enfermedades",
        },
        subcategories: {
          viral_immunity: {
            label: {
              en: "Viral Immunity",
              es: "Inmunidad viral",
            },
            refinements: {
              immune_status: {
                label: {
                  en: "Immune Status",
                  es: "Estado inmunologico",
                },
                productIds: [33, 39, 40, 36, 37, 80, 48, 99],
              },
            },
          },
          metabolic_endocrine: {
            label: {
              en: "Metabolic & Endocrine",
              es: "Metabolico y endocrino",
            },
            refinements: {
              diabetes_metabolic: {
                label: {
                  en: "Diabetes & Metabolism",
                  es: "Diabetes y metabolismo",
                },
                productIds: [94, 82, 70, 79],
              },
            },
          },
        },
      },
      allergy_immunology: {
        label: {
          en: "Allergies & Immunology",
          es: "Alergias e inmunologia",
        },
        subcategories: {
          food_environmental: {
            label: {
              en: "Food & Environmental",
              es: "Alimentos y ambientales",
            },
            refinements: {
              food_allergies: {
                label: {
                  en: "Food Allergies",
                  es: "Alergias alimentarias",
                },
                productIds: [16, 19, 20],
              },
              environmental_allergies: {
                label: {
                  en: "Environmental Allergies",
                  es: "Alergias ambientales",
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

const COPY = {
  en: {
    title: "Find the Right Test",
    subtitle: "Let AI do the test searching for you.",
    close: "Close",
    back: "Back",
    step: "Step",
    of: "of",
    intentTitle: "What are you testing for today?",
    categoryTitle: "What specific area?",
    subcategoryTitle: "Pick a focus area",
    refinementTitle: "Choose your preference",
    recommendedTitle: "Recommended tests for you",
    recommendedBody:
      "Based on your selections, here are the tests we recommend. Each test includes descriptions and can be booked instantly.",
    loading: "Loading recommendations...",
    empty: "No matching products were found for this path yet.",
    bookNow: "Book Now",
  },
  es: {
    title: "Encuentra la prueba correcta",
    subtitle: "Deja que la IA busque la prueba por ti.",
    close: "Cerrar",
    back: "Volver",
    step: "Paso",
    of: "de",
    intentTitle: "Que necesitas evaluar hoy?",
    categoryTitle: "Que area especifica?",
    subcategoryTitle: "Elige un area de enfoque",
    refinementTitle: "Elige tu preferencia",
    recommendedTitle: "Pruebas recomendadas para ti",
    recommendedBody:
      "Segun tus respuestas, estas son las pruebas recomendadas. Cada prueba incluye descripciones y puede reservarse al instante.",
    loading: "Cargando recomendaciones...",
    empty: "Aun no encontramos productos para esta ruta.",
    bookNow: "Reservar",
  },
};

function getCurrentLocale(locale) {
  return locale?.toLowerCase().startsWith("es") ? "es" : "en";
}

function getLabel(value, language) {
  if (!value) {
    return "";
  }

  return value?.[language] || value?.en || "";
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

  return {
    id: product.id,
    name: product.name || `Product ${product.id}`,
    image: product.main_image || null,
  };
}

export default function AITestFinderModal({ isOpen, onClose, locale = "en" }) {
  const language = getCurrentLocale(locale);
  const copy = COPY[language];

  const [step, setStep] = useState(1);
  const [path, setPath] = useState({
    intent: null,
    category: null,
    subcategory: null,
    refinement: null,
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const activeIntent = useMemo(
    () => (path.intent ? TEST_FINDER_TREE[path.intent] : null),
    [path.intent],
  );

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
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
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
        const response = await fetch(API_PROXY_ENDPOINT, {
          signal: abortController.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Unable to load products: ${response.status}`);
        }

        const payload = await response.json();
        const products = extractProducts(payload)
          .map(normalizeProduct)
          .filter(Boolean);

        const productById = new Map(
          products.map((product) => [product.id, product]),
        );

        const orderedRecommendations = selectedProductIds.map((id) => {
          const match = productById.get(id);
          if (match) {
            return match;
          }

          return {
            id,
            name: `${language === "es" ? "Prueba" : "Test"} #${id}`,
            image: null,
          };
        });

        setRecommendedProducts(orderedRecommendations);
      } catch {
        setRecommendedProducts(
          selectedProductIds.map((id) => ({
            id,
            name: `${language === "es" ? "Prueba" : "Test"} #${id}`,
            image: null,
          })),
        );
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadRecommendedProducts();

    return () => {
      abortController.abort();
    };
  }, [isOpen, language, selectedProductIds, step]);

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
  const categoryOptions = activeIntent
    ? Object.entries(activeIntent.categories)
    : [];
  const subcategoryOptions = activeCategory
    ? Object.entries(activeCategory.subcategories)
    : [];
  const refinementOptions = activeSubcategory
    ? Object.entries(activeSubcategory.refinements)
    : [];

  const showBack = step > 1;

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
              className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-4 text-left transition hover:border-[var(--tl-primary)] hover:bg-white"
            >
              <p className="font-display text-base font-bold text-slate-900">
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
              className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-4 text-left transition hover:border-[var(--tl-primary)] hover:bg-white"
            >
              <p className="font-display text-base font-bold text-slate-900">
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
              className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-4 text-left transition hover:border-[var(--tl-primary)] hover:bg-white"
            >
              <p className="font-display text-base font-bold text-slate-900">
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
              className="rounded-2xl border border-sky-200 bg-sky-50/70 px-4 py-4 text-left transition hover:border-[var(--tl-primary)] hover:bg-white"
            >
              <p className="font-display text-base font-bold text-slate-900">
                {getLabel(refinement.label, language)}
              </p>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex h-full min-h-0 flex-col gap-4">
        <p className="text-sm text-slate-600">{copy.recommendedBody}</p>

        {isLoadingProducts ? (
          <p className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-5 text-sm font-semibold text-[var(--tl-primary)]">
            {copy.loading}
          </p>
        ) : recommendedProducts.length === 0 ? (
          <p className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-5 text-sm text-slate-600">
            {copy.empty}
          </p>
        ) : (
          <div className="grid min-h-0 flex-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="flex h-full flex-col rounded-3xl border border-sky-100 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-t-3xl bg-gradient-to-b from-sky-50 to-sky-25">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-sky-100">
                          #{product.id}
                        </p>
                        <p className="mt-1 text-xs text-sky-200">
                          Product Image
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex h-full flex-col gap-4 p-4 sm:p-5">
                  <div>
                    <p className="font-display text-lg font-bold text-slate-900">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Test ID: {product.id}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-auto w-full rounded-full bg-[var(--tl-primary)] px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[var(--tl-primary-strong)]"
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
      className="fixed inset-0 z-[220] flex items-end bg-slate-900/45 p-3 sm:items-start sm:justify-center sm:px-6 sm:pb-6 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-label={copy.title}
      onClick={resetAndClose}
    >
      <div
        className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] border border-white/60 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)] p-5 shadow-[0_30px_80px_-35px_rgba(3,86,197,0.55)] sm:max-h-[calc(100dvh-7rem)] sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--tl-primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              AI Test Finder
            </p>
            <h3 className="mt-3 font-display text-2xl font-black text-slate-900">
              {copy.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{copy.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300"
            aria-label={copy.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
            <span>
              {copy.step} {Math.min(step, 4)} {copy.of} 4
            </span>
            {showBack ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-slate-700 transition hover:border-[var(--tl-primary)] hover:text-[var(--tl-primary)]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {copy.back}
              </button>
            ) : (
              <span />
            )}
          </div>
          <div className="mt-2 h-2 rounded-full bg-sky-100">
            <div
              className="h-full rounded-full bg-[var(--tl-primary)] transition-all duration-300"
              style={{ width: `${stepProgress}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-sky-100/80 bg-white/90 p-4 sm:p-5">
          <h4 className="font-display text-lg font-extrabold text-slate-900">
            {getStepTitle()}
          </h4>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
