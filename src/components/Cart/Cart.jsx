import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/BooksContext';
import { CartWithBooks } from './CartWithBooks';
//import { BookInCart } from './BookInCart';
import { EmptyCart } from './EmptyCart';

import home from './../../assets/images/home.png';
import './Cart.css';

export function Cart() {
	const { cart } = useBooks();

	return (
		<section className="cart">
			{cart.length === 0 && <EmptyCart />}

			{cart.length > 0 && (
				<>
					<Link to="/" className="cart__link" title="Go for more books">
						<img src={home} alt="Go to home" />
						Go for more books
					</Link>
					<CartWithBooks />
				</>
			)}
		</section>
	);
}
