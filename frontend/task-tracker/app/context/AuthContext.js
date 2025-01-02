'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { fetchClient } from '../utils/fetchClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
		checkAuthentication();
	}, []);

    const checkAuthentication = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
				const decodedToken = jwtDecode(token);
				console.log('Decoded token:', decodedToken);
				const { sub: email, userId, username } = decodedToken;
				if (email && userId && username) {
					console.log('User authenticated:', {
						username,
						id: userId,
						email,
					});
					setUser({ username, id: userId, email });
				} else {
					console.log('Invalid token data');
					setUser(null);
				}
			} catch (error) {
				console.error('Error verifying token', error);
				setUser(null);
			}
        } else {
            setUser(null);
        }
    };

    const login = async (email, password) => {
		setError(null);

		try {
			const data = await fetchClient('/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			});

			const token = data.token;
			localStorage.setItem('token', token);

			const decodedToken = jwtDecode(token);
			const username = decodedToken.sub;

			setUser({ username });
			return { success: true, username };
		} catch (error) {
			setError(error.message);
			return { success: false, error: error.message };
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		setUser(null);
	};

    return (
		<AuthContext.Provider
			value={{ user, login, logout, checkAuthentication, error }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export { AuthContext };
