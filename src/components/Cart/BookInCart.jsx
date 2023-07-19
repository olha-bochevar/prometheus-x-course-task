import { useRef /*, useState , useEffect*/ } from 'react';

export function BookInCart(props) {
	const tempStyle = {
		width: '100px',
	};

	const bookRef = useRef(null);

	const { title, author, image, price, quantity } = props.value;

	const removeItemFromCart = () => {
		console.log(bookRef.current);
		//bookRef.current.remove();
	};

	return (
		<>
			<li ref={bookRef}>
				<img src={image} alt="book`s cover" style={tempStyle} />
				{title} {author} {price} {quantity}
			</li>
			<button onClick={removeItemFromCart}>Видалити з корзини</button>
		</>
	);
}
