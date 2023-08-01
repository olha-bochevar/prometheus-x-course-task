import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router';
import avatar from './../../assets/images/avatar-cat.png';
import shoppingCart from './../../assets/images/cart.svg';
import './Header.css';
import { useBooks } from '../../hooks/BooksContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';

export function Header() {
	const { isLoggedIn, user, logout } = useAuth();
	const { cartAmountToBuy, setCartAmountToBuy, cart, setCart } = useBooks();
	const navigate = useNavigate();

	useEffect(() => {
		const booksInTheCart = cart
			.map((item) => item.quantity)
			.reduce((acc, curr) => acc + curr, 0);
		setCartAmountToBuy(booksInTheCart);
	}, [cart]);

	const handleSubmitSignOut = () => {
		logout();
		setCart([]);
		navigate('/');
	};
	const { windowSize } = useWindowWidth();

	return (
		<header className="header">
			<div className="header__logo logo-content">
				<p>
					<span>IT Bookstore</span>
					<a
						href="https://github.com/olha-bochevar"
						target="_blank"
						title="Go to Github's profile"
						rel="noreferrer noopener"
					>
						/ Olha Bochevar
					</a>
				</p>
			</div>
			{isLoggedIn && (
				<div className="header__user-profile user-profile">
					<div className="user-profile__cart-icon">
						<Link to="/cart">
							<img src={shoppingCart} alt="cart" />
						</Link>
						<sup className={cartAmountToBuy > 0 ? 'active' : ''}>
							{cartAmountToBuy}
						</sup>
					</div>
					{windowSize.width > 420 && (
						<button
							type="submit"
							className="user-profile__signout"
							onClick={handleSubmitSignOut}
						>
							Sign Out
						</button>
					)}

					<figure className="user-profile__info">
						<figcaption>{user}</figcaption>
						<div className="user-avatar">
							<img src={avatar} alt="User's avatar" />
						</div>
						{windowSize.width <= 420 && (
							<button
								className="user-profile__signout-btn"
								onClick={handleSubmitSignOut}
							></button>
						)}
					</figure>
				</div>
			)}
		</header>
	);
}
