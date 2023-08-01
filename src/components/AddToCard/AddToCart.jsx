import { PropTypes } from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useBooks } from '../../hooks/BooksContext';

import './AddToCart.css';
import { ChangeAmountOfBookButtons } from '../ChangeAmountOfBookButtons/ChangeAmountOfBookButtons';

export function AddToCart({ value: { price, amount, id } }) {
	const { cart, setCart } = useBooks();

	const [amountToBuy, setAmountToBuy] = useState(1);
	const [booksLeft, setBooksLeft] = useState(42);

	const [totalPrice, setTotalPrice] = useState(
		(price * amountToBuy).toFixed(2)
	);
	const btnRef = useRef(null);

	const handleInputCountValue = ({ target: { value } }) => {
		if (value >= 1 && value <= amount) {
			setAmountToBuy(+value);
			// для введення значення з клавіатури з повним видаленням value перед цим
		} else if (value == '') {
			setAmountToBuy('');
		} else {
			setAmountToBuy(1);
		}
	};

	const getAmountOfBookInCart = () => {
		const book = cart.find((book) => book.id == id);
		return book.quantity;
	};

	useEffect(() => {
		if (cart.find((book) => book.id === id)) {
			const amountInCart = getAmountOfBookInCart();
			setAmountToBuy(amountInCart);
		} else setAmountToBuy(1);
	}, [id, cart]);

	useEffect(() => {
		if (amountToBuy > 0 && amountToBuy <= amount) {
			setTotalPrice((amountToBuy * price).toFixed(2));
		}
	}, [amountToBuy]);

	const addOneBook = () => {
		setAmountToBuy((prev) => (prev < amount ? +prev + 1 : amount));
	};
	const deleteOneBook = () => {
		setAmountToBuy((prev) => (prev > 1 ? +prev - 1 : 1));
	};

	useEffect(() => {
		// якщо товар вже є в корзині, перевіряємо, чи бажана кількість не перевищує кількість на складі, та у разі потреби блокуємо кнопку

		/*
		existingBook - книжка є в корзині, existingBook.quantity - її кількість в корзині
		amountToBuy - бажана кількість, що введена в input, але не відправлена до корзини
		amount - початкова кількість книжок (з books.json)
		Випадки:
		1) книжки в корзині нема; залишилась початкова кількість книжок; кнопка розблокована.

		2) книжка в корзині є; кількість, яку хочуть придбати (amountToBuy), та кількість в корзині (existingBook.quantity) у сумі не перевищують початкової (amount); кнопка розблокована.

		3) книжка у корзині є; кількість, яку хочуть придбати (amountToBuy), та кількість в корзині (existingBook.quantity) перевищують у сумі початкову кількість (amount); тож кнопка заблокована.
		*/
		const existingBook = cart.find((book) => book.id === id);

		// випадок №1
		if (!existingBook) {
			btnRef.current.disabled = false;
			setBooksLeft(amount);
		} // випадок №2
		else if (existingBook?.quantity + amountToBuy <= amount) {
			btnRef.current.disabled = false;
			const booksInStock = amount - existingBook.quantity;
			setBooksLeft(booksInStock);
		} // випадок №3
		else {
			btnRef.current.disabled = true;
			const booksInStock = amount - existingBook.quantity;
			setBooksLeft(booksInStock);
		}
	}, [amountToBuy, cart, id]);

	const addToCart = (e) => {
		e.preventDefault();

		const existingBook = cart.find((book) => book.id === id);
		// якщо товар вже є в корзині, збільшуємо його кількість
		if (existingBook) {
			const updatedItems = cart.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + Number(amountToBuy) };
				}
				return item;
			});
			setCart(updatedItems);
		} else {
			// якщо товару немає в корзині, додаємо
			const newItem = { id: id, quantity: Number(amountToBuy), price: price };
			setCart([...cart, newItem]);
		}
	};

	return (
		<section className="book-order">
			<div className="book-order__container">
				<div className="book-order__price">
					<span>Price, $</span>
					<span>{price}</span>
				</div>
				<div className="book-order__amount">
					<label htmlFor="book-count">Count</label>

					<ChangeAmountOfBookButtons value={{ addOneBook, deleteOneBook }}>
						<input
							type="number"
							className="book-order__count"
							name="book-count"
							min={1}
							max={amount}
							value={amountToBuy}
							onChange={handleInputCountValue}
							data-testid="amount"
							title={`The maximum possible quantity is ${amount} pieces`}
						/>
					</ChangeAmountOfBookButtons>
				</div>
				<div className="book-order__books-in-stock">
					<span>Books left in stock:</span>
					<span> {booksLeft}</span>
				</div>
				<div className="book-order__total">
					<span>Total price, $</span>
					<span className="book-order__total-price" data-testid="total-price">
						{totalPrice}
					</span>
				</div>

				<button
					ref={btnRef}
					type="submit"
					className="button book-order__btn"
					onClick={addToCart}
				>
					Add to cart
				</button>
			</div>
		</section>
	);
}
AddToCart.propTypes = {
	value: PropTypes.object,
	price: PropTypes.number,
	amount: PropTypes.number,
	id: PropTypes.number,
};
