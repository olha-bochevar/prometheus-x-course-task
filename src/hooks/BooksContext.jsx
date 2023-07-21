import { createContext, useContext, useEffect, useState } from 'react';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
	const [books, setBooks] = useState(
		LocalStorageService.get(LS_KEYS.BOOKS) || []
	);
	const [cart, setCart] = useState(LocalStorageService.get(LS_KEYS.CART) || []);
	const [cartAmountToBuy, setCartAmountToBuy] = useState(0);

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await fetch('books.json', {
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

	useEffect(() => LocalStorageService.set(LS_KEYS.CART, cart), [cart]);

	useEffect(() => LocalStorageService.set(LS_KEYS.BOOKS, books), [books]);

	const booksContextValue = {
		books,
		setBooks,
		cart,
		setCart,
		cartAmountToBuy,
		setCartAmountToBuy,
	};
	return (
		<BooksContext.Provider value={booksContextValue}>
			{children}
		</BooksContext.Provider>
	);
};
export const useBooks = () => useContext(BooksContext);
