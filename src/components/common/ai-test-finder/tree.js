export const TEST_FINDER_TREE = {
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
