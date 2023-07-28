import { useState, useEffect, useRef } from 'react';
import { useBooks } from '../../hooks/BooksContext';
import { BookInCart } from './BookInCart';

export function CartWithBooks() {
	const { books, cart, setCart, cartAmountToBuy } = useBooks();
	const [booksToBuy, setBooksToBuy] = useState([]);
	const [totalCost, setTotalCost] = useState(0);
	useEffect(() => {
		const total = cart.reduce(
			(acc, curr) => acc + curr.price * curr.quantity,
			0
		);
		setTotalCost(total);
	}, [cart]);

	useEffect(() => {
		const tempBooks = cart
			.map((bookInCart) => {
				const foundBook = books.find((item) => bookInCart.id === item.id);
				if (foundBook) {
					return { ...foundBook, quantity: bookInCart.quantity };
				}
				return null; // Обробка випадку, якщо книга не знайдена
			})
			.filter((book) => book !== null); // Видалення елементів зі значенням null

		setBooksToBuy(tempBooks);
	}, [cart, books]);

	const btnRef = useRef(null);

	useEffect(() => {
		btnRef.current.disabled = cart.length === 0;
	}, [cart]);

	const purchaseBooks = () => {
		setCart([]);
	};

	return (
		<div className="cart__books-to-buy books-to-buy">
			<h2>
				You have {cartAmountToBuy > 1 ? `${cartAmountToBuy} books` : `1 book`}{' '}
				in your cart
			</h2>

			<div>
				<ul className="books-to-buy__list">
					{booksToBuy.map((book) => (
						<BookInCart key={book?.id} id={book.id} value={book} />
					))}
				</ul>
			</div>
			<div className="books-to-buy__purchase purchase-block">
				<div className="purchase-block__container">
					<p className="purchase-block__text-content">
						Total <span>{totalCost}</span>
					</p>
					<button
						ref={btnRef}
						onClick={purchaseBooks}
						className="button purchase-block__button"
					>
						Purchase
					</button>
				</div>
			</div>
		</div>
	);
}
