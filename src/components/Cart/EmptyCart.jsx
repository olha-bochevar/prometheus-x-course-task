import { LinkToHomePage } from '../LinkToHomePage/LinkToHomePage';

export function EmptyCart() {
	return (
		<section className="empty-cart">
			<h2>В Вашій корзині поки що немає книжок!</h2>
			<LinkToHomePage value={'Давайте передивимось каталог та щось купимо!'} />
		</section>
	);
}
