import { useEffect, useRef } from 'react';
import { useBooks } from '../../hooks/BooksContext';
import { CartWithBooks } from './CartWithBooks';
//import { BookInCart } from './BookInCart';
import { EmptyCart } from './EmptyCart';

export function Cart() {
	const { cart, setCart } = useBooks();
	const btnRef = useRef(null);

	useEffect(() => {
		btnRef.current.disabled = cart.length >= 1 ? false : true;
	}, [cart]);

	const purchaseBooks = () => {
		setCart([]);
	};

	return (
		<section className="shopping-cart">
			{cart.length === 0 && <EmptyCart />}

			{cart.length > 0 && <CartWithBooks />}
			<button ref={btnRef} onClick={purchaseBooks}>
				Сплатити
			</button>
		</section>
	);
}
