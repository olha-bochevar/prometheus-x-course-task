import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router';
import avatar from './../../assets/images/avatar-cat.png';
import shoppingCart from './../../assets/images/cart.svg';
import './Header.css';
import { useBooks } from '../../hooks/BooksContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { LocalStorageService, LS_KEYS } from '../../services/localStorage';

export function Header() {
	const { isLoggedIn, user, logout } = useAuth();
	const { cartAmountToBuy, setCartAmountToBuy, cart, setCart } = useBooks();

	useEffect(() => {
		const cartData = LocalStorageService.get(LS_KEYS.CART);
		if (cartData) {
			setCart(cartData);
		} else {
			setCart([]);
		}
	}, []);

	useEffect(() => {
		const booksInTheCart = cart
			.map((item) => item.quantity)
			.reduce((acc, curr) => acc + curr, 0);
		setCartAmountToBuy(booksInTheCart);
	}, [cart]);

	const navigate = useNavigate();
	const handleSubmitSignOut = () => {
		logout();

		navigate('/');
	};

	return (
		<header className="header">
			<div className="header__logo logo-content">
				<p>
					<span>IT Bookstore / </span>
					<a
						href="https://github.com/olha-bochevar"
						target="_blank"
						title="Go to Github's profile"
						rel="noreferrer"
					>
						Olha Bochevar
					</a>
				</p>
			</div>
			{isLoggedIn && (
				<div className="header__user-profile user-profile">
					<div className="cart-icon">
						<Link to="/cart">
							<img src={shoppingCart} alt="cart" />
						</Link>
						<sup>{cartAmountToBuy}</sup>
					</div>
					<button
						type="submit"
						className="signout"
						onClick={handleSubmitSignOut}
					>
						Sign Out
					</button>
					<figure className="user-info">
						<div className="user-avatar">
							<img src={avatar} alt="User's avatar" />
						</div>
						<figcaption>{user}</figcaption>
					</figure>
				</div>
			)}
		</header>
	);
}
