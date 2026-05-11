export const staticPageMetadata = {
	'/': {
		title: '24-7 Labs | Accurate Diagnostic & Testing Services in Tampa',
		description:
			'Need fast, reliable testing? 24-7 Labs in Tampa offers walk-in lab testing, DNA, STD, drug, and routine blood tests. Schedule online or walk in today.',
	},
	'/about': {
		title: 'About Us | Certified Clinical Testing Team | 24-7 Labs',
		description:
			'Meet the dedicated team at 24-7 Labs in Tampa. Learn about our mission to provide affordable, high-quality, and confidential diagnostic testing.',
	},
	'/blogs': {
		title: 'Health & Wellness Blog | Testing Insights | 24-7 Labs',
		description:
			'Stay informed with the latest health insights, medical testing guides, and wellness tips written by the medical experts at 24-7 Labs Tampa.',
	},
	'/covid-19': {
		title: 'Rapid & PCR COVID-19 Testing Tampa | 24-7 Labs',
		description:
			'Get fast, accurate COVID-19 PCR and Rapid testing in Tampa. Walk-ins welcome, no insurance required. Receive your secure digital results quickly.',
	},
	'/trust-standards': {
		title: 'Our Standards: CLIA, CAP & HIPAA Certified | 24-7 Labs',
		description:
			'Your health data is safe with us. Learn about 24-7 Labs’ strict adherence to CLIA certifications, CAP accreditations, and HIPAA privacy standards.',
	},
	'/testing-services': {
		title: 'Lab Testing Services Tampa | DNA, STD & Drug Tests',
		description:
			'Explore comprehensive testing services at 24-7 Labs. We offer confidential STD, DNA, drug, hormone, allergy, and routine blood tests in Tampa.',
	},
	'/dna-testing': {
		title: 'DNA Testing Services | 24-7 Labs Tampa',
		description:
			'Professional DNA testing services including paternity, ancestry, and relationship testing at 24-7 Labs.',
	},
	'/std-testing': {
		title: 'STD Testing Services | 24-7 Labs Tampa',
		description:
			'Confidential and accurate STD testing services. Fast results with no insurance or prescription required.',
	},
	'/drug-testing': {
		title: 'Drug Testing Services | 24-7 Labs Tampa',
		description: 'Comprehensive drug testing for employment, personal, and legal purposes at 24-7 Labs.',
	},
	'/allergy-testing': {
		title: 'Allergy Testing Services | 24-7 Labs Tampa',
		description: 'Identify your allergies with comprehensive allergy testing services at 24-7 Labs.',
	},
	'/heart-testing': {
		title: 'Heart Testing Services | 24-7 Labs Tampa',
		description:
			'Cardiac health testing including cholesterol, blood pressure, and heart disease screening at 24-7 Labs.',
	},
	'/hormone-testing': {
		title: 'Hormone Testing Services | 24-7 Labs Tampa',
		description: 'Comprehensive hormone testing for thyroid, fertility, and overall health at 24-7 Labs.',
	},
	'/routine-health-testing': {
		title: 'Routine Health Testing | 24-7 Labs Tampa',
		description: 'Essential health screenings and routine blood tests to monitor your overall health at 24-7 Labs.',
	},
	// Business pages
	'/business-opportunities': {
		title: 'Business Opportunities | 24-7 Labs Tampa',
		description: 'Partner with 24-7 Labs for business opportunities in diagnostic testing and healthcare services.',
	},
	'/business-solutions': {
		title: 'Business Solutions | 24-7 Labs Tampa',
		description: 'Corporate health solutions and employer testing services from 24-7 Labs.',
	},
	'/privacy-policy': {
		title: 'Privacy Policy | 24-7 Labs Tampa',
		description: 'Read our privacy policy to understand how 24-7 Labs protects your personal health information.',
	},
	'/telemedicine': {
		title: 'Telemedicine Services | 24-7 Labs Tampa',
		description: 'Access virtual healthcare consultations and telemedicine services through 24-7 Labs.',
	},
	'/contact': {
		title: 'Contact Us | 24-7 Labs Tampa',
		description: 'Get in touch with 24-7 Labs for testing services, appointments, and inquiries.',
	},
	'/schedule-appointment': {
		title: 'Schedule Appointment | 24-7 Labs Tampa',
		description: 'Schedule your diagnostic testing appointment online with 24-7 Labs.',
	},
	'/patient-intake-form': {
		title: 'Patient Intake Form | 24-7 Labs Tampa',
		description: 'Complete your patient intake form online before visiting 24-7 Labs.',
	},
	'/covid-screening-form': {
		title: 'COVID Screening Form | 24-7 Labs Tampa',
		description: 'Complete the COVID-19 screening form before your testing appointment at 24-7 Labs.',
	},
	'/prescription-consent-form': {
		title: 'Prescription Consent Form | 24-7 Labs Tampa',
		description: 'Prescription consent form for diagnostic testing services at 24-7 Labs.',
	},
	'/checkout': {
		title: 'Checkout | 24-7 Labs Tampa',
		description: 'Complete your purchase of diagnostic testing services at 24-7 Labs.',
	},
};

// Helper function to get metadata for a specific path
export function getMetadataForPath(path) {
	// Remove trailing slash for consistent matching
	const normalizedPath = path.replace(/\/$/, '') || '/';
	return staticPageMetadata[normalizedPath] || staticPageMetadata['/'];
}
