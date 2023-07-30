import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useBooks } from '../../hooks/BooksContext';

import './AddToCart.css';
import { ChangeAmountOfBook } from '../ChangeAmountOfBook/ChangeAmountOfBook';

export function AddToCart({ value: { price, amount, id } }) {
	const { cart, setCart } = useBooks();

	const [amountToBuy, setAmountToBuy] = useState(1);

	const [totalPrice, setTotalPrice] = useState();

	const handleInputCountValue = ({ target: { value } }) => {
		if (value < 1 || value > amount) {
			setAmountToBuy(1);
		} else {
			setAmountToBuy(+value || '');
		}
	};

	const updateValueOfAmountInputFromCart = () => {
		return cart.filter((book) => book.id == id).map((book) => book.quantity);
	};
	useEffect(() => {
		if (cart.find((book) => book.id === id)) {
			const value = updateValueOfAmountInputFromCart();
			setAmountToBuy(value);
		}
	}, [cart]);

	useEffect(() => {
		if (cart.find((book) => book.id === id)) {
			setAmountToBuy(
				cart.filter((book) => book.id == id).map((book) => book.quantity)
			);
		} else setAmountToBuy(1);
	}, [id]);

	useEffect(() => {
		if (amountToBuy <= amount && amountToBuy > 0) {
			setTotalPrice((amountToBuy * price).toFixed(2) || price);
		}
	}, [price, amountToBuy]);

	const addOneBook = () => {
		setAmountToBuy((prev) => (prev < amount ? +prev + 1 : amount));
	};
	const deleteOneBook = () => {
		setAmountToBuy((prev) => (prev > 1 ? +prev - 1 : 1));
	};

	const addToCart = (e) => {
		e.preventDefault();

		const existingBook = cart.find((book) => book.id === id);
		if (existingBook) {
			// Якщо товар вже є в корзині, збільшуємо його кількість
			const updatedItems = cart.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + Number(amountToBuy) };
				}
				return item;
			});
			setCart(updatedItems);
		} else {
			// Якщо товару немає в корзині, додаємо
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

					<ChangeAmountOfBook value={{ addOneBook, deleteOneBook }}>
						<input
							type="number"
							className="book-order__count"
							name="book-count"
							min={1}
							max={amount}
							value={amountToBuy}
							onInput={handleInputCountValue}
							data-testid="amount"
							title={`Max quantity - ${amount}`}
						/>
					</ChangeAmountOfBook>
				</div>
				<div className="book-order__total">
					<span>Total price</span>
					<span className="book-order__total-price" data-testid="total-price">
						{totalPrice}
					</span>
				</div>
				<button
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
