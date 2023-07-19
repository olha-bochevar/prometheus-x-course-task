import { Link } from 'react-router-dom';

export function EmptyCart() {
	return (
		<section className="empty-cart">
			<h2>В Вашій корзині поки що немає книжок!</h2>
			<Link to="/">Давайте передивимось каталог та щось купимо!</Link>
		</section>
	);
}
