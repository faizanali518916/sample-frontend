/**
 * Translates a key from a messages object, with support for parameter interpolation
 * @param {Object} messages - The messages object (e.g., messages.PageName)
 * @param {string} key - The translation key
 * @param {Object} params - Optional parameters for string interpolation (e.g., { id: 123 })
 * @returns {string} The translated message
 */
export function t(messages, key, params = {}) {
	if (!messages || typeof messages !== 'object') {
		console.warn(`Invalid messages object for key: ${key}`);
		return key;
	}

	let message = messages[key];

	if (typeof message !== 'string') {
		console.warn(`Message not found or not a string for key: ${key}`);
		return key;
	}

	// Replace parameters in the message (e.g., {id}, {min}, {max})
	if (params && Object.keys(params).length > 0) {
		Object.entries(params).forEach(([paramKey, paramValue]) => {
			const placeholder = `{${paramKey}}`;
			message = message.replace(new RegExp(`\\${placeholder}`, 'g'), paramValue);
		});
	}

	return message;
}
