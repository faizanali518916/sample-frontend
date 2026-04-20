import { submitAppointmentForm } from '@/lib/api';
import { normalizePhone, safeT, toIsoDate } from '../utils';

export function createScheduleAppointmentConfig(t, optionSets) {
	return {
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
	};
}
