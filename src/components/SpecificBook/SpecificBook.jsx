import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useBooks } from '../../hooks/BooksContext';
import { AddToCart } from '../AddToCard/AddToCart';
import { BackToCatalogPage } from '../BackToCatalogPage/BackToCatalogPage';
import './SpecificBook.css';
import imageNotFound from './../../assets/images/imageNotFound.png';
import { BackToTopButton } from '../BackToTopButton/BackToTopButton';

export function SpecificBook() {
	const { pageID } = useParams();
	const { books } = useBooks();

	const [book, setBook] = useState({});
	const [isShownFullDesc, setIsShownFullDesc] = useState(false);

	useEffect(() => {
		const foundBook = books.find((book) => book.id === +pageID);
		setBook(foundBook);
	}, [pageID]);

	const {
		id,
		title,
		author,
		image,
		price,
		amount,
		level,
		tags,
		shortDescription,
		description,
	} = book;

	if (Object.keys(book).length === 0) {
		// Якщо `book` ще порожній, покажемо попередження або пустий фрагмент
		return <p>Loading...</p>; // Може бути також порожній фрагмент: `return null;`
	}

	const showFullDesc = () => {
		setIsShownFullDesc(!isShownFullDesc);
	};

	return (
		<section className="specific-bookpage">
			<BackToCatalogPage />
			<div className="specific-bookpage__container book-info">
				<div className="book-info__cover">
					<img src={image ? image : imageNotFound} alt="Book's cover" />
				</div>
				<div className="book-info__title">{title}</div>
				<div className="book-info__author">{author}</div>
				<div className="book-info__price">{`$${price}`}</div>
				<div className="book-info__level">
					Level: <span>{level}</span>
				</div>
				<div className="book-info__tags">
					<ul>
						{tags.map((tag) => (
							<li key={tag}>{tag}</li>
						))}
					</ul>
				</div>
				<div className="book-info__description">
					<div className="book-info__description-wrapper">
						<p className="book-info__description_title">Description</p>
						<button onClick={showFullDesc}>
							{isShownFullDesc
								? 'Show full description'
								: 'Show short description'}
						</button>
					</div>

					<p>{isShownFullDesc ? description : shortDescription}</p>
				</div>
				<div className="book-info__book-order">
					<AddToCart value={{ price, amount, id }} />
				</div>
			</div>
			<BackToTopButton />
		</section>
	);
}
