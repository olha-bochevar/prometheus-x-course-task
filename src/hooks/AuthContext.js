import { createContext, useContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';

// Створення контексту авторизації
export const AuthContext = createContext();

// Створення провайдера контексту авторизації
export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const userData = LocalStorageService.get(LS_KEYS.USERNAME) || null;
		console.log(userData);
		setUser(userData);
		setIsLoggedIn(Boolean(userData));
	}, []);

	const login = (userData) => {
		// Виконати логіку для перевірки авторизації та збереження даних користувача
		setIsLoggedIn(true);
		setUser(userData);
		LocalStorageService.set(LS_KEYS.USERNAME, userData);
	};
	const logout = () => {
		// Виконати логіку для виходу з авторизації та очищення даних користувача
		setIsLoggedIn(false);
		setUser(null);

		LocalStorageService.clearAll();
	};

	const authContextValue = {
		isLoggedIn,
		user,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
	children: PropTypes.node,
};
