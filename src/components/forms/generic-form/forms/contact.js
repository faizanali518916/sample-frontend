import { submitContactForm } from '@/lib/api';
import { normalizePhone, safeT } from '../utils';

export function createContactConfig(t) {
	return {
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
	};
}
