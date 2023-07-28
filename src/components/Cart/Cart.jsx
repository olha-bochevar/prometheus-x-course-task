import { useBooks } from '../../hooks/BooksContext';
import { CartWithBooks } from './CartWithBooks';
//import { BookInCart } from './BookInCart';
import { EmptyCart } from './EmptyCart';

import './Cart.css';
import { BackToCatalogPage } from '../BackToCatalogPage/BackToCatalogPage';

export function Cart() {
	const { cart } = useBooks();

	return (
		<section className="cart">
			{cart.length === 0 && <EmptyCart />}

			{cart.length > 0 && (
				<>
					<BackToCatalogPage />
					<CartWithBooks />
				</>
			)}
		</section>
	);
}
