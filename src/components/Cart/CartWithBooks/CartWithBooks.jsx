import { useState, useEffect } from 'react';
import { useBooks } from '../../../hooks/BooksContext';
import { BookInCart } from '../BookInCart/BookInCart';
import { Modal } from './../Modal/Modal';
import './CartWithBooks.css';

export function CartWithBooks() {
	const { books, cart, setCart, cartAmountToBuy } = useBooks();
	const [booksToBuy, setBooksToBuy] = useState([]);
	const [totalCost, setTotalCost] = useState(0);

	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const total = cart.reduce(
			(acc, curr) => acc + curr.price * curr.quantity,
			0
		);
		setTotalCost(total.toFixed(2));
	}, [cart]);

	useEffect(() => {
		const tempBooks = cart
			.map((bookInCart) => {
				const foundBook = books.find((item) => bookInCart.id === item.id);
				if (foundBook) {
					return { ...foundBook, quantity: bookInCart.quantity };
				}
				return null; // якщо книга не знайдена
			})
			.filter((book) => book !== null); // видалення елементів зі значенням null

		setBooksToBuy(tempBooks);
	}, [cart, books]);

	const purchaseBooks = () => {
		setShowModal(true);
		setTimeout(() => {
			setCart([]);
		}, 1000);
	};
	console.log(showModal);
	return (
		<>
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
							Total <span>{`$ ${totalCost}`}</span>
						</p>
						<button
							onClick={purchaseBooks}
							className="button purchase-block__button"
						>
							Purchase
						</button>
					</div>
				</div>
			</div>

			{showModal && <Modal />}
		</>
	);
}
