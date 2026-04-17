'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Clock3, Loader2, Mail, MapPin, PhoneCall } from 'lucide-react';
import {
	fetchCountryStates,
	fetchInfections,
	fetchLabLocations,
	submitAppointmentForm,
	submitContactForm,
	submitCovidScreeningForm,
	submitPatientIntakeForm,
	submitPrescriptionConsentForm,
} from '@/lib/api';

const inputClassName =
	'mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm transition outline-none focus:border-[var(--tl-primary)] focus:ring-2 focus:ring-[var(--tl-primary)]/15';

function safeT(t, key, fallback = '') {
	try {
		return t(key);
	} catch {
		return fallback;
	}
}

function safeRaw(t, key, fallback = null) {
	try {
		return t.raw(key);
	} catch {
		return fallback;
	}
}

function toIsoDate(value) {
	if (!value) {
		return null;
	}

	const parsed = new Date(`${value}T00:00:00`);
	if (Number.isNaN(parsed.getTime())) {
		return null;
	}

	return parsed.toISOString();
}

function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function normalizePhone(value) {
	return String(value ?? '').replace(/\D/g, '');
}

function buildFormConfig(formKey, t, optionSets) {
	const yesNoOptions = [
		{ value: 'yes', label: safeT(t, 'common.yes', 'Yes') },
		{ value: 'no', label: safeT(t, 'common.no', 'No') },
	];

	const declarationContent = safeRaw(t, 'common.declarationContent', []);
	const termsContent = safeRaw(t, 'common.termsContent', []);
	const covidTermsContent = safeRaw(t, 'common.covidTermsContent', termsContent);
	const medicationPricingLines = safeRaw(t, 'common.medicationPricing.lines', []);

	const sharedPersonal = [
		{ name: 'firstname', type: 'text', label: safeT(t, 'common.fields.firstName', 'First Name'), required: true },
		{ name: 'lastname', type: 'text', label: safeT(t, 'common.fields.lastName', 'Last Name'), required: true },
		{
			name: 'phone',
			type: 'tel',
			label: safeT(t, 'common.fields.phone', 'Phone Number'),
			required: true,
			validation: 'phone',
		},
		{
			name: 'dateofbirth',
			type: 'date',
			label: safeT(t, 'common.fields.dateOfBirth', 'Date of Birth'),
			required: true,
		},
		{
			name: 'email',
			type: 'email',
			label: safeT(t, 'common.fields.email', 'Email'),
			required: true,
			validation: 'email',
		},
		{ name: 'address', type: 'text', label: safeT(t, 'common.fields.address', 'Address'), required: true },
		{ name: 'city', type: 'text', label: safeT(t, 'common.fields.city', 'City'), required: true },
		{ name: 'apt', type: 'text', label: safeT(t, 'common.fields.apt', 'Apt') },
		{ name: 'zipcode', type: 'text', label: safeT(t, 'common.fields.zipCode', 'Zip Code'), required: true },
		{
			name: 'state',
			type: 'select',
			label: safeT(t, 'common.fields.state', 'State'),
			required: true,
			placeholder: safeT(t, 'common.selectState', 'Select State'),
			options: optionSets.countryStates.map((state) => ({ value: String(state.id), label: state.name })),
		},
	];

	const configs = {
		contact: {
			layout: 'split',
			description: safeT(t, 'contact.subtitle'),
			submitLabel: safeT(t, 'contact.submitLabel'),
			successMessage: safeT(t, 'contact.successMessage'),
			errorMessage: safeT(t, 'contact.errorMessage'),
			sections: [
				{
					title: safeT(t, 'contact.formTitle'),
					fields: [
						{
							name: 'firstname',
							type: 'text',
							label: safeT(t, 'common.fields.firstName', 'First Name'),
							required: true,
						},
						{ name: 'lastname', type: 'text', label: safeT(t, 'common.fields.lastName', 'Last Name'), required: true },
						{
							name: 'email',
							type: 'email',
							label: safeT(t, 'common.fields.email', 'Email'),
							required: true,
							validation: 'email',
						},
						{
							name: 'phone',
							type: 'tel',
							label: safeT(t, 'common.fields.phone', 'Phone Number'),
							required: true,
							validation: 'phone',
						},
						{
							name: 'message',
							type: 'textarea',
							label: safeT(t, 'common.fields.message', 'Message'),
							required: true,
							rows: 6,
							span: 'full',
						},
					],
				},
			],
			buildPayload: (values) => ({
				firstname: values.firstname,
				lastname: values.lastname,
				email: values.email,
				phone: normalizePhone(values.phone),
				message: values.message,
			}),
			submit: submitContactForm,
		},
		scheduleAppointment: {
			layout: 'split',
			description: safeT(t, 'scheduleAppointment.subtitle'),
			submitLabel: safeT(t, 'scheduleAppointment.submitLabel'),
			successMessage: safeT(t, 'scheduleAppointment.successMessage'),
			errorMessage: safeT(t, 'scheduleAppointment.errorMessage'),
			dataNeeds: { locations: true },
			sections: [
				{
					title: safeT(t, 'scheduleAppointment.formTitle'),
					fields: [
						{ name: 'name', type: 'text', label: safeT(t, 'common.fields.name', 'Name'), required: true },
						{
							name: 'email',
							type: 'email',
							label: safeT(t, 'common.fields.email', 'Email'),
							required: true,
							validation: 'email',
						},
						{
							name: 'phone',
							type: 'tel',
							label: safeT(t, 'common.fields.phone', 'Phone Number'),
							required: true,
							validation: 'phone',
						},
						{
							name: 'location',
							type: 'select',
							label: safeT(t, 'common.fields.location', 'Location'),
							required: true,
							placeholder: safeT(t, 'common.selectLocation', 'Select Location'),
							options: optionSets.locations.map((location) => ({
								value: String(location.id),
								label: location.name,
							})),
						},
						{
							name: 'datetime',
							type: 'date',
							label: safeT(t, 'common.fields.dateTime', 'Choose Date'),
							required: true,
						},
						{
							name: 'symptoms',
							type: 'textarea',
							label: safeT(t, 'common.fields.symptomsTests', 'Symptoms / Tests'),
							required: true,
							rows: 6,
							span: 'full',
						},
					],
				},
			],
			buildPayload: (values) => ({
				name: values.name,
				emailaddress: values.email,
				phonenumber: normalizePhone(values.phone),
				symptoms_tests: values.symptoms,
				datetime: toIsoDate(values.datetime),
				lablocation_id: Number(values.location),
			}),
			submit: submitAppointmentForm,
		},
		patientIntake: {
			layout: 'single',
			description: safeT(t, 'patientIntake.subtitle'),
			submitLabel: safeT(t, 'patientIntake.submitLabel'),
			successMessage: safeT(t, 'patientIntake.successMessage'),
			errorMessage: safeT(t, 'patientIntake.errorMessage'),
			dataNeeds: { countryStates: true },
			sections: [
				{ title: safeT(t, 'common.sections.personalInformation'), fields: sharedPersonal },
				{
					title: safeT(t, 'patientIntake.sections.permissions'),
					fields: [
						{
							name: 'may_contact_number',
							type: 'radio',
							label: safeT(t, 'patientIntake.fields.mayContactNumber'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'may_contact_email',
							type: 'radio',
							label: safeT(t, 'patientIntake.fields.mayContactEmail'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'may_forward_results',
							type: 'radio',
							label: safeT(t, 'patientIntake.fields.mayForwardResults'),
							required: true,
							options: yesNoOptions,
						},
					],
				},
				{
					title: safeT(t, 'common.sections.agreements'),
					fields: [
						{
							name: 'declaration_agreed',
							type: 'agreement',
							label: safeT(t, 'common.declarationTitle'),
							required: true,
							content: declarationContent,
						},
						{
							name: 'terms_agreed',
							type: 'agreement',
							label: safeT(t, 'common.termsTitle'),
							required: true,
							content: termsContent,
						},
						{
							name: 'digital_signature',
							type: 'text',
							label: safeT(t, 'common.fields.digitalSignature'),
							required: true,
							span: 'full',
						},
					],
				},
			],
			buildPayload: (values) => ({
				firstname: values.firstname,
				lastname: values.lastname,
				phonenumber: normalizePhone(values.phone),
				dateofbirth: toIsoDate(values.dateofbirth),
				emailaddress: values.email,
				address: values.address,
				city: values.city,
				apt: values.apt,
				zipcode: values.zipcode,
				countrystate_id: Number(values.state),
				may_contact_number: values.may_contact_number === 'yes',
				may_contact_email: values.may_contact_email === 'yes',
				may_forward_results: values.may_forward_results === 'yes',
				declaration_agreed: Boolean(values.declaration_agreed),
				terms_agreed: Boolean(values.terms_agreed),
				digital_signature: values.digital_signature,
			}),
			submit: submitPatientIntakeForm,
		},
		covidScreening: {
			layout: 'single',
			description: safeT(t, 'covidScreening.subtitle'),
			submitLabel: safeT(t, 'covidScreening.submitLabel'),
			successMessage: safeT(t, 'covidScreening.successMessage'),
			errorMessage: safeT(t, 'covidScreening.errorMessage'),
			dataNeeds: { countryStates: true },
			sections: [
				{ title: safeT(t, 'common.sections.personalInformation'), fields: sharedPersonal },
				{
					title: safeT(t, 'covidScreening.sections.symptoms'),
					fields: [
						{
							name: 'fever_or_chills',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.fever'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'cough',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.cough'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'difficulty_breathing',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.breathing'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'fatigue',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.fatigue'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'headache',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.headache'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'loss_of_taste_smell',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.tasteSmell'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'sore_throat',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.soreThroat'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'congestion_runny_nose',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.congestion'),
							required: true,
							options: yesNoOptions,
						},
					],
				},
				{
					title: safeT(t, 'covidScreening.sections.exposureHistory'),
					fields: [
						{
							name: 'covid_exposure',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.exposure'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'vaccination_status',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.vaccinationStatus'),
							required: true,
							options: [
								{ value: 'not_vaccinated', label: safeT(t, 'common.vaccination.notVaccinated') },
								{ value: 'partially_vaccinated', label: safeT(t, 'common.vaccination.partiallyVaccinated') },
								{ value: 'fully_vaccinated', label: safeT(t, 'common.vaccination.fullyVaccinated') },
								{ value: 'boosted', label: safeT(t, 'common.vaccination.booster') },
							],
						},
						{
							name: 'previous_covid_infection',
							type: 'radio',
							label: safeT(t, 'covidScreening.fields.previousInfection'),
							required: true,
							options: yesNoOptions,
						},
					],
				},
				{
					title: safeT(t, 'common.sections.agreements'),
					fields: [
						{
							name: 'declaration_agreed',
							type: 'agreement',
							label: safeT(t, 'common.declarationTitle'),
							required: true,
							content: declarationContent,
						},
						{
							name: 'terms_agreed',
							type: 'agreement',
							label: safeT(t, 'common.termsTitle'),
							required: true,
							content: covidTermsContent,
						},
						{
							name: 'digital_signature',
							type: 'text',
							label: safeT(t, 'common.fields.digitalSignature'),
							required: true,
							span: 'full',
						},
					],
				},
			],
			buildPayload: (values) => ({
				firstname: values.firstname,
				lastname: values.lastname,
				phonenumber: normalizePhone(values.phone),
				dateofbirth: toIsoDate(values.dateofbirth),
				emailaddress: values.email,
				address: values.address,
				city: values.city,
				apt: values.apt,
				zipcode: values.zipcode,
				countrystate_id: Number(values.state),
				symptoms: {
					fever_or_chills: values.fever_or_chills === 'yes',
					cough: values.cough === 'yes',
					difficulty_breathing: values.difficulty_breathing === 'yes',
					fatigue: values.fatigue === 'yes',
					headache: values.headache === 'yes',
					loss_of_taste_smell: values.loss_of_taste_smell === 'yes',
					sore_throat: values.sore_throat === 'yes',
					congestion_runny_nose: values.congestion_runny_nose === 'yes',
				},
				close_contact_14_days: values.covid_exposure === 'yes',
				tested_positive_before: values.previous_covid_infection === 'yes',
				vaccination_status: values.vaccination_status,
				digital_signature: values.digital_signature,
			}),
			submit: submitCovidScreeningForm,
		},
		prescriptionConsent: {
			layout: 'single',
			description: safeT(t, 'prescriptionConsent.subtitle'),
			submitLabel: safeT(t, 'prescriptionConsent.submitLabel'),
			successMessage: safeT(t, 'prescriptionConsent.successMessage'),
			errorMessage: safeT(t, 'prescriptionConsent.errorMessage'),
			dataNeeds: { countryStates: true, infections: true },
			sections: [
				{
					title: safeT(t, 'common.sections.personalInformation'),
					fields: [
						...sharedPersonal,
						{
							name: 'infection',
							type: 'select',
							label: safeT(t, 'prescriptionConsent.fields.infection'),
							required: true,
							placeholder: safeT(t, 'prescriptionConsent.selectInfection', 'Select Infection'),
							span: 'full',
							options: optionSets.infections.map((infection) => ({
								value: String(infection.id),
								label: infection.name,
							})),
						},
					],
				},
				{
					title: safeT(t, 'prescriptionConsent.sections.medicalQuestions'),
					fields: [
						{
							name: 'takinganymedication',
							type: 'radio',
							label: safeT(t, 'prescriptionConsent.fields.currentMedication'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'currentmedications',
							type: 'textarea',
							label: safeT(t, 'prescriptionConsent.fields.currentMedicationDetails'),
							required: true,
							rows: 3,
							span: 'full',
							showWhen: (values) => values.takinganymedication === 'yes',
						},
						{
							name: 'allergic_to_medication',
							type: 'radio',
							label: safeT(t, 'prescriptionConsent.fields.allergicMedication'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'allergies',
							type: 'textarea',
							label: safeT(t, 'prescriptionConsent.fields.allergiesDetails'),
							required: true,
							rows: 3,
							span: 'full',
							showWhen: (values) => values.allergic_to_medication === 'yes',
						},
						{
							name: 'pregnant_or_lactating',
							type: 'radio',
							label: safeT(t, 'prescriptionConsent.fields.pregnant'),
							required: true,
							options: yesNoOptions,
						},
						{
							name: 'pharmacy_name',
							type: 'text',
							label: safeT(t, 'prescriptionConsent.fields.pharmacyName'),
							required: true,
						},
						{
							name: 'pharmacy_phonenumber',
							type: 'tel',
							label: safeT(t, 'prescriptionConsent.fields.pharmacyPhone'),
							required: true,
							validation: 'phone',
						},
					],
				},
				{
					title: safeT(t, 'common.sections.agreements'),
					fields: [
						{
							name: 'declaration_agreed',
							type: 'agreement',
							label: safeT(t, 'common.declarationTitle'),
							required: true,
							content: declarationContent,
						},
						{
							name: 'terms_agreed',
							type: 'agreement',
							label: safeT(t, 'common.termsTitle'),
							required: true,
							content: termsContent,
						},
						{
							name: 'digital_signature',
							type: 'text',
							label: safeT(t, 'common.fields.digitalSignature'),
							required: true,
							span: 'full',
						},
					],
				},
				{
					title: safeT(t, 'common.noticeTitle'),
					fields: [
						{
							name: 'medicationNotice',
							type: 'notice',
							noticeTitle: safeT(t, 'common.medicationPricing.title'),
							noticeLines: medicationPricingLines,
						},
					],
				},
			],
			buildPayload: (values) => ({
				firstname: values.firstname,
				lastname: values.lastname,
				phonenumber: normalizePhone(values.phone),
				dateofbirth: toIsoDate(values.dateofbirth),
				emailaddress: values.email,
				address: values.address,
				zipcode: values.zipcode,
				city: values.city,
				countrystate_id: Number(values.state),
				infection_id: Number(values.infection),
				takinganymedication: values.takinganymedication === 'yes',
				currentmedications: values.currentmedications,
				allergic_to_medication: values.allergic_to_medication === 'yes',
				allergies: values.allergies,
				pregnant_or_lactating: values.pregnant_or_lactating === 'yes',
				pharmacy_name: values.pharmacy_name,
				pharmacy_phonenumber: normalizePhone(values.pharmacy_phonenumber),
				declaration_agreed: Boolean(values.declaration_agreed),
				terms_agreed: Boolean(values.terms_agreed),
				digital_signature: values.digital_signature,
			}),
			submit: submitPrescriptionConsentForm,
		},
	};

	return configs[formKey] || null;
}

function flattenVisibleFields(config, values) {
	const allFields = [];

	config.sections.forEach((section) => {
		section.fields.forEach((field) => {
			if (typeof field.showWhen === 'function' && !field.showWhen(values)) {
				return;
			}
			allFields.push(field);
		});
	});

	return allFields;
}

function initialFieldValues(formKey) {
	const defaults = {
		contact: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			message: '',
		},
		scheduleAppointment: {
			name: '',
			email: '',
			phone: '',
			location: '',
			datetime: '',
			symptoms: '',
		},
		patientIntake: {
			firstname: '',
			lastname: '',
			phone: '',
			dateofbirth: '',
			email: '',
			address: '',
			city: '',
			apt: '',
			zipcode: '',
			state: '',
			may_contact_number: 'yes',
			may_contact_email: 'yes',
			may_forward_results: 'yes',
			declaration_agreed: false,
			terms_agreed: false,
			digital_signature: '',
		},
		covidScreening: {
			firstname: '',
			lastname: '',
			phone: '',
			dateofbirth: '',
			email: '',
			address: '',
			city: '',
			apt: '',
			zipcode: '',
			state: '',
			fever_or_chills: 'no',
			cough: 'no',
			difficulty_breathing: 'no',
			fatigue: 'no',
			headache: 'no',
			loss_of_taste_smell: 'no',
			sore_throat: 'no',
			congestion_runny_nose: 'no',
			covid_exposure: 'no',
			vaccination_status: 'not_vaccinated',
			previous_covid_infection: 'no',
			declaration_agreed: false,
			terms_agreed: false,
			digital_signature: '',
		},
		prescriptionConsent: {
			firstname: '',
			lastname: '',
			phone: '',
			dateofbirth: '',
			email: '',
			address: '',
			city: '',
			apt: '',
			zipcode: '',
			state: '',
			infection: '',
			takinganymedication: 'no',
			currentmedications: '',
			allergic_to_medication: 'no',
			allergies: '',
			pregnant_or_lactating: 'no',
			pharmacy_name: '',
			pharmacy_phonenumber: '',
			declaration_agreed: false,
			terms_agreed: false,
			digital_signature: '',
		},
	};

	return defaults[formKey] || {};
}

export default function GenericFormPage({ formKey }) {
	const t = useTranslations('Forms');
	const [values, setValues] = useState(initialFieldValues(formKey));
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitResult, setSubmitResult] = useState({ status: 'idle', message: '' });
	const [optionSets, setOptionSets] = useState({ countryStates: [], locations: [], infections: [] });

	const config = useMemo(() => buildFormConfig(formKey, t, optionSets), [formKey, optionSets, t]);

	useEffect(() => {
		let isMounted = true;

		async function loadOptions() {
			if (!config?.dataNeeds) {
				return;
			}

			const nextOptions = {};

			try {
				if (config.dataNeeds.countryStates) {
					nextOptions.countryStates = await fetchCountryStates();
				}
				if (config.dataNeeds.locations) {
					nextOptions.locations = await fetchLabLocations();
				}
				if (config.dataNeeds.infections) {
					nextOptions.infections = await fetchInfections();
				}
			} catch (error) {
				if (isMounted) {
					setSubmitResult({
						status: 'error',
						message: safeT(t, 'common.lookupLoadError', 'Failed to load form options.'),
					});
				}
			}

			if (isMounted && Object.keys(nextOptions).length > 0) {
				setOptionSets((previous) => ({ ...previous, ...nextOptions }));
			}
		}

		loadOptions();

		return () => {
			isMounted = false;
		};
	}, [config?.dataNeeds, t]);

	if (!config) {
		return null;
	}

	function setFieldValue(name, value) {
		setValues((previous) => ({ ...previous, [name]: value }));
		setErrors((previous) => ({ ...previous, [name]: '' }));
	}

	function validateForm() {
		const nextErrors = {};
		const fields = flattenVisibleFields(config, values);

		fields.forEach((field) => {
			if (field.type === 'notice') {
				return;
			}

			const value = values[field.name];
			const isStringEmpty = typeof value === 'string' && value.trim() === '';
			const isMissing = value === undefined || value === null || isStringEmpty;

			if (field.required) {
				if (field.type === 'agreement' && value !== true) {
					nextErrors[field.name] = safeT(t, 'common.validation.mustAgree', 'This checkbox is required.');
					return;
				}

				if (isMissing) {
					nextErrors[field.name] = safeT(t, 'common.validation.required', 'This field is required.');
					return;
				}
			}

			if (field.validation === 'email' && value && !isEmail(value)) {
				nextErrors[field.name] = safeT(t, 'common.validation.invalidEmail', 'Please enter a valid email address.');
			}

			if (field.validation === 'phone' && value && normalizePhone(value).length < 10) {
				nextErrors[field.name] = safeT(t, 'common.validation.invalidPhone', 'Please enter a valid phone number.');
			}
		});

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setSubmitResult({ status: 'idle', message: '' });

		const isValid = validateForm();
		if (!isValid) {
			return;
		}

		setIsSubmitting(true);
		try {
			const payload = config.buildPayload(values);
			await config.submit(payload);
			setSubmitResult({ status: 'success', message: config.successMessage });
			setValues(initialFieldValues(formKey));
		} catch (error) {
			setSubmitResult({ status: 'error', message: config.errorMessage });
		} finally {
			setIsSubmitting(false);
		}
	}

	function renderField(field) {
		if (typeof field.showWhen === 'function' && !field.showWhen(values)) {
			return null;
		}

		const value = values[field.name];
		const fieldError = errors[field.name];
		const isFullWidth = field.span === 'full';
		const wrapperClass = isFullWidth ? 'md:col-span-2' : '';

		if (field.type === 'notice') {
			return (
				<div
					key={field.name}
					className="rounded-xl border-2 border-rose-200 bg-rose-50 p-4 text-sm text-rose-900 md:col-span-2"
				>
					<p className="font-bold">{field.noticeTitle}</p>
					<ul className="mt-2 space-y-1">
						{field.noticeLines.map((line, index) => (
							<li key={`${field.name}-${index}`}>{line}</li>
						))}
					</ul>
				</div>
			);
		}

		if (field.type === 'agreement') {
			return (
				<div key={field.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 md:col-span-2">
					<details>
						<summary className="cursor-pointer text-sm font-bold text-slate-900">{field.label}</summary>
						<div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
							{field.content.map((paragraph, index) => (
								<p key={`${field.name}-content-${index}`}>{paragraph}</p>
							))}
						</div>
					</details>
					<label className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-800">
						<input
							type="checkbox"
							checked={Boolean(value)}
							onChange={(event) => setFieldValue(field.name, event.target.checked)}
							className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[var(--tl-primary)]"
						/>
						<span>{safeT(t, 'common.agreeTo', 'I have read and agree.')}</span>
					</label>
					{fieldError ? <p className="mt-1 text-xs text-rose-600">{fieldError}</p> : null}
				</div>
			);
		}

		if (field.type === 'radio') {
			return (
				<div key={field.name} className="md:col-span-2">
					<p className="text-sm font-semibold text-slate-700">{field.label}</p>
					<div className="mt-2 flex flex-wrap gap-4">
						{field.options.map((option) => (
							<label
								key={`${field.name}-${option.value}`}
								className="inline-flex items-center gap-2 text-sm text-slate-700"
							>
								<input
									type="radio"
									name={field.name}
									value={option.value}
									checked={value === option.value}
									onChange={(event) => setFieldValue(field.name, event.target.value)}
									className="h-4 w-4 border-slate-300 text-[var(--tl-primary)]"
								/>
								<span>{option.label}</span>
							</label>
						))}
					</div>
					{fieldError ? <p className="mt-1 text-xs text-rose-600">{fieldError}</p> : null}
				</div>
			);
		}

		if (field.type === 'select') {
			return (
				<label key={field.name} className={`${wrapperClass} text-sm font-semibold text-slate-700`}>
					{field.label}
					<select
						className={inputClassName}
						value={value}
						onChange={(event) => setFieldValue(field.name, event.target.value)}
					>
						<option value="">{field.placeholder || safeT(t, 'common.selectOption', 'Select an option')}</option>
						{field.options.map((option) => (
							<option key={`${field.name}-${option.value}`} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
					{fieldError ? <p className="mt-1 text-xs text-rose-600">{fieldError}</p> : null}
				</label>
			);
		}

		if (field.type === 'textarea') {
			return (
				<label key={field.name} className={`${wrapperClass} text-sm font-semibold text-slate-700`}>
					{field.label}
					<textarea
						rows={field.rows || 4}
						className={inputClassName}
						value={value}
						onChange={(event) => setFieldValue(field.name, event.target.value)}
					/>
					{fieldError ? <p className="mt-1 text-xs text-rose-600">{fieldError}</p> : null}
				</label>
			);
		}

		return (
			<label key={field.name} className={`${wrapperClass} text-sm font-semibold text-slate-700`}>
				{field.label}
				<input
					type={
						field.type === 'date' ? 'date' : field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : 'text'
					}
					className={inputClassName}
					value={value}
					onChange={(event) => setFieldValue(field.name, event.target.value)}
				/>
				{fieldError ? <p className="mt-1 text-xs text-rose-600">{fieldError}</p> : null}
			</label>
		);
	}

	const title = safeT(t, `${formKey}.title`);
	const aboutTitle = safeT(t, 'common.aboutCard.title');
	const aboutBody = safeT(t, 'common.aboutCard.body');

	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,#f4faff_0%,#ffffff_45%)] text-slate-900">
			<main>
				<section className="mx-auto w-full max-w-[1220px] px-4 pt-12 pb-10 sm:pt-16 lg:px-6">
					<p className="text-sm font-bold tracking-[0.16em] text-[var(--tl-primary)] uppercase">
						{safeT(t, `${formKey}.eyebrow`)}
					</p>
					<h1 className="font-display mt-3 text-3xl leading-tight font-black sm:text-4xl md:text-5xl">{title}</h1>
					<p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">{config.description}</p>
				</section>

				<section
					className={`mx-auto w-full max-w-[1220px] gap-6 px-4 pb-16 lg:px-6 ${
						config.layout === 'split' ? 'grid lg:grid-cols-[0.95fr_1.05fr]' : ''
					}`}
				>
					{config.layout === 'split' ? (
						<aside className="space-y-4 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
							<div className="rounded-2xl bg-[#f2f9ff] p-4">
								<p className="text-xs font-bold tracking-[0.14em] text-[var(--tl-primary)] uppercase">{aboutTitle}</p>
								<p className="mt-2 text-sm leading-relaxed text-slate-700">{aboutBody}</p>
							</div>
							<div className="rounded-2xl border border-sky-100 p-4">
								<p className="mt-1 flex items-start gap-2 text-sm font-semibold text-slate-700">
									<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
									{safeT(t, 'common.aboutCard.address')}
								</p>
								<p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
									<Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
									{safeT(t, 'common.aboutCard.hours')}
								</p>
								<p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
									<PhoneCall className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
									{safeT(t, 'common.aboutCard.phone')}
								</p>
								<p className="mt-3 flex items-start gap-2 text-sm font-semibold text-slate-700">
									<Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--tl-primary)]" />
									{safeT(t, 'common.aboutCard.email')}
								</p>
							</div>
							<a
								href="tel:8139323741"
								className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)]"
							>
								<PhoneCall className="h-4 w-4" />
								{safeT(t, 'common.callNow', 'Call Now')}
							</a>
						</aside>
					) : null}

					<form
						onSubmit={handleSubmit}
						className={`rounded-3xl border border-sky-100 bg-white p-6 shadow-sm ${
							config.layout === 'single' ? 'mx-auto max-w-5xl' : ''
						}`}
					>
						{config.sections.map((section, sectionIndex) => (
							<div key={`${formKey}-section-${sectionIndex}`} className={sectionIndex > 0 ? 'mt-8' : ''}>
								<h2 className="font-display text-2xl font-extrabold text-slate-900">{section.title}</h2>
								<div className="mt-4 grid gap-4 md:grid-cols-2">
									{section.fields.map((field) => renderField(field))}
								</div>
							</div>
						))}

						{submitResult.status !== 'idle' ? (
							<p
								className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
									submitResult.status === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
								}`}
							>
								{submitResult.message}
							</p>
						) : null}

						<button
							type="submit"
							disabled={isSubmitting}
							className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--tl-primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--tl-primary-strong)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
						>
							{isSubmitting ? (
								<>
									<Loader2 className="h-4 w-4 animate-spin" />
									{safeT(t, 'common.sending', 'Sending...')}
								</>
							) : (
								<>
									{config.submitLabel}
									<ArrowRight className="h-4 w-4" />
								</>
							)}
						</button>
					</form>
				</section>
			</main>
		</div>
	);
}
