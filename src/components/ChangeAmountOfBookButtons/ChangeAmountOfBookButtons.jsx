import addBook from './../../assets/images/add.png';
import deleteBook from './../../assets/images/delete.png';
import './ChangeAmountOfBookButtons.css';

export function ChangeAmountOfBookButtons({ value, children }) {
	const { deleteOneBook, addOneBook, amount, quantity } = value;

	const handleAddClick = () => {
		// якщо з батьківського елементу передається quantity, то передивляємось amount
		if (quantity && quantity < amount) {
			addOneBook();
		}
		// якщо не передається, значить, там прописані власні методи перевірки на кількість
		if (quantity == undefined) {
			addOneBook();
		}
	};
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
				onClick={handleAddClick}
				disabled={quantity >= amount}
				data-testid="increase-btn"
			>
				<img src={addBook} alt="Add book to the cart" />
			</button>
		</div>
	);
}
