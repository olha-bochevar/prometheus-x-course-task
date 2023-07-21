import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import {
	Layout,
	HomePage,
	BookPage,
	ShoppingCart,
	NotFoundPage,
	SignInPage,
} from './routes';

import { useAuth } from './hooks/AuthContext';
import './App.css';
import { useBooks } from './hooks/BooksContext';
import { useEffect } from 'react';

function App() {
	const { isLoggedIn } = useAuth();
	const { cart, setCartAmountToBuy, cartAmountToBuy } = useBooks();

	useEffect(() => {
		console.log(cart.length, cartAmountToBuy);
		if (cart.length === 0) {
			setCartAmountToBuy(0);
		}
	}, [cart]);

	return (
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
	);
}

export default App;
