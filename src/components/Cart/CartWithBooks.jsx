import { useState, useEffect, useRef } from 'react';
import { useBooks } from '../../hooks/BooksContext';
import { BookInCart } from './BookInCart';

export function CartWithBooks() {
	const { books, cart, setCart, cartAmountToBuy } = useBooks();
	const [booksToBuy, setBooksToBuy] = useState([]);

	useEffect(() => {
		let tempBooks = [];

		tempBooks = cart
			.map((bookInCart) => books.find((item) => bookInCart.id === item.id))
			.map((item) => {
				const foundCartItem = cart.find((cartItem) => cartItem.id === item.id);
				if (foundCartItem) {
					return { ...item, quantity: foundCartItem.quantity };
				}
				return item;
			});

		setBooksToBuy(tempBooks);
	}, [cart]);

	const btnRef = useRef(null);

	useEffect(() => {
		btnRef.current.disabled = cart.length >= 1 ? false : true;
	}, [cart]);

	const purchaseBooks = () => {
		setCart([]);
	};

	return (
		<div className="cart__with-books">
			<h2>В Вашій корзині {cartAmountToBuy} книжок</h2>
			<div>
				<ul>
					{booksToBuy.map((book) => (
						<BookInCart key={book?.id} id={book.id} value={book} />
					))}
				</ul>
			</div>
			<button ref={btnRef} onClick={purchaseBooks} className="button">
				Purchase
			</button>
		</div>
	);
}
