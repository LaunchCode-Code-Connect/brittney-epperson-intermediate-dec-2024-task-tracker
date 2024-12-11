const baseURL = 'http://localhost:8080/api';

export const fetchClient = async (endpoint, options = {}) => {
    
    const url = `${baseURL}${endpoint}`;

    const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        return data;
    } catch (error) {
        console.error('FetchClient Error:', error.message);
        throw error;
    }
};