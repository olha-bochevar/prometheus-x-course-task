import addBook from './../../assets/images/add.png';
import deleteBook from './../../assets/images/delete.png';
import './ChangeAmountOfBookButtons.css';

export function ChangeAmountOfBookButtons({ value, children }) {
	const { deleteOneBook, addOneBook } = value;
	return (
		<div className="quantity-block" data-testid="quantity">
			<button
				className="quantity-block__btn quantity-block__btn_remove"
				onClick={deleteOneBook}
				data-testid="decrease-btn"
			>
				<img src={deleteBook} alt="Remove book from the cart" />
			</button>
			{children}
			<button
				className="quantity-block__btn quantity-block__btn_add"
				onClick={addOneBook}
				data-testid="increase-btn"
			>
				<img src={addBook} alt="Add book to the cart" />
			</button>
		</div>
	);
}
