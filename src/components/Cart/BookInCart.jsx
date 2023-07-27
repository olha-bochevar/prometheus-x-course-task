import { useEffect, useRef /*, useState , useEffect*/ } from 'react';
import './BookInCart.css';
import addBook from './../../assets/images/add.png';
import deleteBook from './../../assets/images/delete.png';
import removeBook from './../../assets/images/remove.png';
import { useBooks } from '../../hooks/BooksContext';

export function BookInCart(props) {
	const { cart, setCart } = useBooks();

	const bookRef = useRef(null);
	const btnDeleteRef = useRef(null);

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
		if (cart.length === 0) {
			btnDeleteRef.current.disabled = true;
			setCart([]);
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
				<img src={image} alt="Book`s cover" className="book-item__image" />
				<div className="book-item__info">
					<p className="book-item__title">{title}</p>
					<p className="book-item__author">{author}</p>
					<span className="book-item__price">{price}</span>
				</div>
				<div className="book-item__quantity-block">
					<button
						className="book-item__btn remove"
						onClick={deleteOneBook}
						ref={btnDeleteRef}
					>
						<img src={deleteBook} alt="Remove book from the cart" />
					</button>
					<span className="book-item__quantity">{quantity}</span>
					<button className="book-item__btn add" onClick={addOneBook}>
						<img src={addBook} alt="Add book to the cart" />
					</button>
				</div>
				<p className="book-item__total-price">{price * quantity}</p>
				<button className="book-item__btn" onClick={removeItemFromCart}>
					<img src={removeBook} alt="Remove book" />
				</button>
			</li>
		</>
	);
}
