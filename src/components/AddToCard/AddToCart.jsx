import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useBooks } from '../../hooks/BooksContext';
import { LocalStorageService, LS_KEYS } from '../../services/localStorage';
import './AddToCart.css';

export function AddToCart({ value: { price, amount, id } }) {
	const { cart, setCart } = useBooks();

	const [amountToBuy, setAmountToBuy] = useState(1);

	const [totalPrice, setTotalPrice] = useState();

	const handleInputCountValue = ({ target: { value } }) => {
		setAmountToBuy(value || '');
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
			LocalStorageService.set(LS_KEYS.CART, updatedItems);
		} else {
			// Якщо товару немає в корзині, додаємо
			const newItem = { id: id, quantity: Number(amountToBuy) };
			setCart([...cart, newItem]);
			LocalStorageService.set(LS_KEYS.CART, [...cart, newItem]);
		}
	};

	return (
		<section className="book-order">
			<form action="/addtocart" method="post">
				<div className="book-price">
					<span>Price, $</span>
					<span id="price" className="price">
						{price}
					</span>
				</div>
				<div className="amount">
					<label htmlFor="book-count">Count</label>
					<input
						type="number"
						className="book-count"
						id="book-count"
						name="book-count"
						min={1}
						max={amount}
						value={amountToBuy}
						onInput={handleInputCountValue}
					/>
				</div>
				<div className="book-total-price">
					<span>Total price</span>
					<span id="total-price" className="total-price">
						{totalPrice}
					</span>
				</div>
				<button
					type="submit"
					className="btn-add-cart button"
					onClick={addToCart}
				>
					Add to cart
				</button>
			</form>
		</section>
	);
}
AddToCart.propTypes = {
	value: PropTypes.object,
	price: PropTypes.number,
	amount: PropTypes.number,
	id: PropTypes.number,
};
