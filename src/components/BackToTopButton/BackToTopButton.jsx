import { useEffect, useState } from 'react';
import './BackToTopButton.css';
import arrowUp from './../../assets/images/arrow_upward.png';

export function BackToTopButton() {
	const [backToTopButton, setBackToTopButton] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 100) {
				setBackToTopButton(true);
			} else {
				setBackToTopButton(false);
			}
		});
	}, []);

	const scrollUp = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			{backToTopButton && (
				<button className="btn-up" onClick={scrollUp}>
					<img src={arrowUp} alt="Button up" />
				</button>
			)}
		</>
	);
}
