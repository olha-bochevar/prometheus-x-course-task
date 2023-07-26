import { Link } from 'react-router-dom';
import cartImage from './../../assets/images/cart_cat.png';

export function EmptyCart() {
	return (
		<div className="cart__empty-cart empty-cart">
			<img
				src={cartImage}
				alt="Surprised cat with book"
				className="empty-cart__image"
			/>
			<h2>Your cart is empty!</h2>
			<p>Looks like you haven`t added anything to your cart yet.</p>

			<Link to="/" className="button empty-cart__link">
				Go for a book
			</Link>
		</div>
	);
}
