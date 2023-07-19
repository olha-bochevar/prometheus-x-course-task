import { createContext, useContext } from 'react';
import { PropTypes } from 'prop-types';
// Створення контексту авторизації
export const AuthContext = createContext();

// Створення провайдера контексту авторизації
export const AuthProvider = ({ values, children }) => {
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
AuthProvider.propTypes = {
	children: PropTypes.node,
	values: PropTypes.object,
};
