import { useEffect, useRef /*, useState , useEffect*/ } from 'react';
import './BookInCart.css';

import imageNotFound from './../../assets/images/imageNotFound.png';
import { useBooks } from '../../hooks/BooksContext';
import { ChangeAmountOfBook } from '../ChangeAmountOfBook/ChangeAmountOfBook';

export function BookInCart(props) {
	const { cart, setCart } = useBooks();

	const bookRef = useRef(null);

	const { title, author, image, price, quantity, id } = props.value;

	const removeItemFromCart = () => {
		let temp = cart.filter((book) => book.id !== id);
		setCart(temp);
	};
	const addOneBook = () => {
		const updatedItems = cart.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCart(updatedItems);
	};
	const deleteOneBook = () => {
		const foundBook = cart.find((book) => book.id === id);
		if (foundBook.quantity === 1) {
			let tempCart = cart.filter((book) => book !== foundBook);
			setCart(tempCart);
		} else {
			const updatedItems = cart.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity - 1 };
				}
				return item;
			});
			setCart(updatedItems);
		}
	};

	useEffect(() => {
		let temp = cart.filter((book) => book.quantity >= 1);
		setCart(temp);
	}, []);

	return (
		<>
			<li ref={bookRef} className="books-to-buy__item book-item">
				<img
					src={image ? image : imageNotFound}
					alt="Book`s cover"
					className="book-item__image"
				/>
				<div className="book-item__info">
					<p className="book-item__title">{title}</p>
					<p className="book-item__author">{author}</p>
					<span className="book-item__price">{price}</span>
				</div>

				<ChangeAmountOfBook value={{ addOneBook, deleteOneBook }}>
					<span className="book-item__quantity">{quantity}</span>
				</ChangeAmountOfBook>
				<p className="book-item__total-price">{price * quantity}</p>
				<button
					className="book-item__btn"
					onClick={removeItemFromCart}
				></button>
			</li>
		</>
	);
}
