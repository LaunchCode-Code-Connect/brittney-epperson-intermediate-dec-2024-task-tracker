const baseURL = 'http://localhost:8080/api';

export const fetchClient = async (endpoint, options = {}) => {
	const url = new URL(`${baseURL}${endpoint}`, window.location.origin);

	if (options.params) {
		Object.keys(options.params).forEach((key) =>
			url.searchParams.append(key, options.params[key])
		);
	}

	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	const config = {
		method: options.method || 'GET',
		...options,
		headers,
	};

	if (config.method.toUpperCase() === 'GET') {
		delete config.body;
	}

	try {
		const response = await fetch(url, config);

		// Determine response type based on Content-Type header
		const contentType = response.headers.get('content-type');
		let data;

		if (contentType && contentType.includes('application/json')) {
			data = await response.json(); // Parse JSON response
		} else {
			data = await response.text(); // Handle plain text or other responses
		}

		if (!response.ok) {
			throw new Error(data.message || data || 'Something went wrong');
		}

		return data;
	} catch (error) {
		console.error('FetchClient Error:', error.message);
		throw error;
	}
};
