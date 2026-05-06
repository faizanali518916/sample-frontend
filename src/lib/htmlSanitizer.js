/**
 * HTML Rendering Utilities
 */

/**
 * Extracts plain text from HTML by stripping tags
 * @param {string} html - HTML string
 * @returns {string} Plain text without HTML tags
 */
export function stripHtmlTags(html) {
	if (!html) return '';

	// Use regex-based approach on both server and client for consistency
	return html
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * Summarizes text by extracting plain text from HTML and truncating
 * @param {string} htmlOrText - HTML or plain text
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Plain text, truncated if necessary
 */
export function summarizeHtml(htmlOrText, maxLength = 130) {
	if (!htmlOrText) return '';

	// Extract plain text from HTML
	let text = stripHtmlTags(htmlOrText);

	// Truncate if necessary
	if (text.length <= maxLength) {
		return text;
	}

	return `${text.slice(0, maxLength).trim()}...`;
}
