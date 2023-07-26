import './Footer.css';
export function Footer() {
	return (
		<footer className="footer">
			<p className="footer__content">
				Done in{' '}
				<a
					href="https://prometheus.org.ua/"
					target="_blank"
					rel="noopener noreferrer"
					className="footer__link"
				>
					Prometheus
				</a>{' '}
				© 2023
			</p>
		</footer>
	);
}
