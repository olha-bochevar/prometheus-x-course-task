import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../../hooks/BooksContext';
import imageNotFound from './../../assets/images/imageNotFound.png';
import './BookList.css';

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

	// для max-width : 420px будемо показувати повну назву, для більших екранів - скорочуємо назву до 24 символів
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

	const sliceNameOfBook = (title) => {
		return title.length > 24 ? title.substring(0, 24).concat('...') : title;
	};

	return (
		<section className="booklist">
			<h1>Вітаємо! Обирайте книжечки!</h1>
			<div className="booklist__container">
				<div className="booklist__filters">
					<input
						type="search"
						value={search}
						onChange={handleSearchInputValue}
						className="booklist__filter-by-name"
						placeholder="Введіть назву книги"
					/>
					<select
						value={filterPrice}
						onChange={handleChangeFilterPrice}
						className="booklist__filter-by-price"
					>
						<option value="all" key="">
							Всі
						</option>
						<option value="<15" key="15">{`0$ < Ціна < 15$`}</option>
						<option value="<30" key="30">{`15$ < Ціна < 30$`}</option>
						<option value="30+" key="30+">{`Ціна > 30$`}</option>
					</select>
				</div>
				<div className="booklist__catalog">
					<ul className="booklist__list">
						{filteredBooks.map((book) => (
							<li key={book?.id} className="booklist__book book">
								<img
									src={book?.image ? book.image : imageNotFound}
									alt="Book's cover"
									className="book__image"
								/>

								<h3 className="book__title">
									{windowSize.width <= 420
										? book.title
										: sliceNameOfBook(book.title)}
								</h3>
								<p className="book__author">{book?.author}</p>
								<div className="book__info">
									<span className="book__price">{`${book?.price}$`}</span>
									<Link to={`/book/${book?.id}`} className="book__link">
										View
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
