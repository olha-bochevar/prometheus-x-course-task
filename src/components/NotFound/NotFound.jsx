import { Link } from 'react-router-dom';
import './NotFound.css';
export function NotFound() {
	return (
		<section className="not-found-page">
			<div className="not-found-page__container">
				<div className="not-found-page__visual-content">
					<p className="not-found-page__error">404</p>
				</div>
				<div className="not-found-page__text-content">
					<h2 className="not-found-page__title">
						Oops! That page doesn`t exist
					</h2>
					<p className="not-found-page__text-error">
						You may have typed the wrong URL or this page has been removed.
					</p>
					<Link to="/" className="not-found-page__link-home button">
						Go back to books
					</Link>
				</div>
			</div>
		</section>
	);
}
