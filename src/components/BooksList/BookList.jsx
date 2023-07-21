import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/BooksContext';
import imageNotFound from './../../assets/images/imageNotFound.png';
import './book-list.css';
export function BookList() {
	const { books } = useBooks();
	const [search, setSearch] = useState('');
	const [filterPrice, setFilterPrice] = useState('all');

	const handleSearchInputValue = ({ target: { value } }) => {
		setSearch(value);
	};
	const handleChangeFilterPrice = (event) => {
		setFilterPrice(event.target.value);
	};
	const filteredBooksByPrice = books.filter((book) => {
		switch (filterPrice) {
			case 'all':
				return book;
			case '<15':
				return book.price < 15;
			case '<30':
				return book.price >= 15 && book.price < 30;
			case '30+':
				return book.price >= 30;
			default:
				break;
		}
	});

	const filteredBooks = filteredBooksByPrice.filter((book) =>
		book.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<section className="bookList">
			<div>
				<form>
					<input
						type="search"
						value={search}
						onChange={handleSearchInputValue}
					/>
					<select value={filterPrice} onChange={handleChangeFilterPrice}>
						<option value="all" key="">
							Всі
						</option>
						<option value="<15" key="15">{`0 < ціна < 15`}</option>
						<option value="<30" key="30">{`15 < ціна < 30`}</option>
						<option value="30+" key="30+">{`ціна > 30`}</option>
					</select>
				</form>
			</div>
			<div className="books-container">
				<div className="book-container">
					{filteredBooks.map((book) => (
						<li key={book?.id}>
							<div>
								<img
									src={book?.image ? book.image : imageNotFound}
									alt="Book's cover"
								/>
								<h5>
									{book?.title.length > 24
										? book.title.substring(0, 24).concat('...')
										: book.title}
								</h5>
								<p>{book?.author}</p>
								<span>{book?.price}</span>
								<Link to={`/book/${book?.id}`}>View</Link>
							</div>
						</li>
					))}
				</div>
			</div>
		</section>
	);
}
