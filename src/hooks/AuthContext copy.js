import { createContext, useContext, useState } from 'react';
import { PropTypes } from 'prop-types';
// Створення контексту авторизації
export const AuthContext = createContext();

// Створення провайдера контексту авторизації
export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);

	const login = (userData) => {
		// Виконайте логіку для перевірки авторизації та збереження даних користувача
		setIsLoggedIn(true);
		setUser(userData);
	};

	const logout = () => {
		// Виконайте логіку для виходу з авторизації та очищення даних користувача
		setIsLoggedIn(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
export const useAuth = () => useContext(AuthContext);
AuthProvider.propTypes = {
	children: PropTypes.node,
};
