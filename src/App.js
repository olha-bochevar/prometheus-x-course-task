import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import {
	Layout,
	ProductsPage,
	BookPage,
	CartPage,
	NotFoundPage,
	SignInPage,
} from './routes';

import { useAuth } from './hooks/AuthContext';
import './App.css';
import { useBooks } from './hooks/BooksContext';
import { useEffect } from 'react';
import { Header } from './components/Header/Header';

function App() {
	const { isLoggedIn } = useAuth();
	const { cart, setCartAmountToBuy } = useBooks();

	useEffect(() => {
		if (cart.length === 0) {
			setCartAmountToBuy(0);
		}
	}, [cart]);

	return (
		<HashRouter>
			<Header />
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
					<Route index element={<ProductsPage />} />
					<Route path="book/:pageID" element={<BookPage />} />
					<Route path="cart" element={<CartPage />} />
				</Route>
				<Route path="login" element={<SignInPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
