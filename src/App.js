import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import {
	Layout,
	HomePage,
	BookPage,
	ShoppingCart,
	NotFoundPage,
	SignInPage,
} from './routes';
import { useEffect, useState } from 'react';
import { LocalStorageService, LS_KEYS } from './services/localStorage';
import { AuthProvider } from './hooks/AuthContext';
import { BooksProvider } from './hooks/BooksContext';
import './App.css';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		LocalStorageService.get(LS_KEYS.USERNAME || false)
	);
	const [user, setUser] = useState(
		LocalStorageService.get(LS_KEYS.USERNAME || null)
	);
	const [books, setBooks] = useState(
		LocalStorageService.get(LS_KEYS.BOOKS) || []
	);

	const [cart, setCart] = useState(LocalStorageService.get(LS_KEYS.CART) || []);

	useEffect(() => LocalStorageService.set(LS_KEYS.CART, cart), [cart]);
	useEffect(() => LocalStorageService.set(LS_KEYS.USERNAME, user), [user]);
	useEffect(() => LocalStorageService.set(LS_KEYS.BOOKS, books), [books]);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch('data/books.json', {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await response.json();
				setBooks(data.books);
			} catch (error) {
				console.error('Помилка завантаження файлу:', error);
			}
		};

		fetchBooks();
	}, []);

	const login = (userData) => {
		// Виконайте логіку для перевірки авторизації та збереження даних користувача
		setIsLoggedIn(true);
		setUser(userData);
	};

	const logout = () => {
		// Виконайте логіку для виходу з авторизації та очищення даних користувача
		setIsLoggedIn(false);
		setUser(null);

		LocalStorageService.clearAll();
	};

	// встановити кількість книжок у корзині
	const [cartAmountToBuy, setCartAmountToBuy] = useState(0);
	useEffect(() => {
		setCartAmountToBuy(
			cart.map((item) => item.quantity).reduce((acc, curr) => acc + curr, 0)
		);
	}, [cart]);

	return (
		<AuthProvider values={{ isLoggedIn, user, login, logout }}>
			<BooksProvider
				value={{
					books,
					setBooks: (b) => setBooks(b),
					cart,
					setCart: (c) => setCart(c),
					cartAmountToBuy,
					setCartAmountToBuy: (a) => setCartAmountToBuy(a),
				}}
			>
				<HashRouter>
					<Routes>
						<Route
							path="/"
							element={
								isLoggedIn ? (
									<Layout>
										<Outlet />
									</Layout>
								) : (
									<Navigate to="/login" replace={true} />
								)
							}
						>
							<Route index element={<HomePage />} />
							<Route path="book/:pageID" element={<BookPage />} />
							<Route path="cart" element={<ShoppingCart />} />
						</Route>
						<Route path="login" element={<SignInPage />} />
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</HashRouter>
			</BooksProvider>
		</AuthProvider>
	);
}

export default App;
