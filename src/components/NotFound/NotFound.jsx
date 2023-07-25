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
					<h2 className="not-found-page__title">Упс! Ця сторінка не існує.</h2>
					<p className="not-found-page__text-error">
						Можливо, Ви вказали неправильний URL, або ця сторінка була видалена.
					</p>
					<Link to="/" className="not-found-page__link-home button">
						До книжочок
					</Link>
				</div>
			</div>
		</section>
	);
}
