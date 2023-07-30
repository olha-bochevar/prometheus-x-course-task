import { useState, useEffect } from 'react';

export function useWindowWidth() {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
	});

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	return { windowSize };
}
