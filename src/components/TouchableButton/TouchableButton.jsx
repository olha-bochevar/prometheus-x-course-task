import { useState } from 'react';

export function TouchableButton({ addToCart, ...restProps }) {
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	const handleTouchStart = () => {
		setIsTouchDevice(true);
	};

	const handleButtonClick = (e) => {
		if (isTouchDevice) {
			e.preventDefault();
			setIsTouchDevice(false);
		} else {
			addToCart(e);
		}
	};

	return (
		<button
			onTouchStart={handleTouchStart}
			onClick={handleButtonClick}
			className="button book-order__btn"
			{...restProps}
		/>
	);
}
