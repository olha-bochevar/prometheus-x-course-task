//import { useEffect, useRef } from 'react';
import { useBooks } from '../../hooks/BooksContext';
import { CartWithBooks } from './CartWithBooks';
//import { BookInCart } from './BookInCart';
import { EmptyCart } from './EmptyCart';
import './Cart.css';

export function Cart() {
	const { cart } = useBooks();

	return (
		<section className="cart">
			{cart.length === 0 && <EmptyCart />}

			{cart.length > 0 && <CartWithBooks />}
		</section>
	);
}
