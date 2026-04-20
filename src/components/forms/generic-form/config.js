import { fetchCountryStates, fetchInfections, fetchLabLocations } from '@/lib/api';
import { initialFieldValues } from './initialValues';
import { createContactConfig } from './forms/contact';
import { createScheduleAppointmentConfig } from './forms/scheduleAppointment';
import { createPatientIntakeConfig } from './forms/patientIntake';
import { createCovidScreeningConfig } from './forms/covidScreening';
import { createPrescriptionConsentConfig } from './forms/prescriptionConsent';
import { createSharedFormData } from './forms/shared';

export { initialFieldValues };

export function buildFormConfig(formKey, t, optionSets) {
	const shared = createSharedFormData(t, optionSets);
	const configs = {
		contact: createContactConfig(t),
		scheduleAppointment: createScheduleAppointmentConfig(t, optionSets),
		patientIntake: createPatientIntakeConfig(t, shared),
		covidScreening: createCovidScreeningConfig(t, shared),
		prescriptionConsent: createPrescriptionConsentConfig(t, optionSets, shared),
	};

	return configs[formKey] || null;
}

export function flattenVisibleFields(config, values) {
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

export async function loadFormOptions(config) {
	if (!config?.dataNeeds) {
		return {};
	}

	const nextOptions = {};

	if (config.dataNeeds.countryStates) {
		nextOptions.countryStates = await fetchCountryStates();
	}
	if (config.dataNeeds.locations) {
		nextOptions.locations = await fetchLabLocations();
	}
	if (config.dataNeeds.infections) {
		nextOptions.infections = await fetchInfections();
	}

	return nextOptions;
}
