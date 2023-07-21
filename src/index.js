import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './hooks/AuthContext';
import { BooksProvider } from './hooks/BooksContext';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<BooksProvider>
				<App />
			</BooksProvider>
		</AuthProvider>
	</React.StrictMode>
);
