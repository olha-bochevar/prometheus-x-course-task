import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useBooks } from '../../hooks/BooksContext';
import { AddToCart } from '../AddToCard/AddToCart';
import './SpecificBook.css';
import imageNotFound from './../../assets/images/imageNotFound.png';
export function SpecificBook() {
	const { pageID } = useParams();
	const { books } = useBooks();

	const [book, setBook] = useState({});

	useEffect(() => {
		setBook(books.find((book) => book.id === +pageID));
	}, [pageID]);
	const { id, title, author, image, price, amount, level, tags, description } =
		book;

	return (
		<section className="main">
			<section className="book-info">
				<div className="book-main-info">
					<div className="book-cover">
						<img src={image ? image : imageNotFound} alt="Book's cover" />
					</div>
					<div className="book-characterics">
						<ul>
							<li>
								<span className="charact-name">Book name</span>
								<span className="charact-value" id="charact-value">
									{title}
								</span>
							</li>
							<li>
								<span className="charact-name">Book author</span>
								<span className="charact-value" id="charact-value">
									{author}
								</span>
							</li>
							<li>
								<span className="charact-name">Book level</span>
								<span className="charact-value" id="charact-value">
									{level}
								</span>
							</li>
							<li>
								<span className="charact-name">Book tags</span>
								<span className="charact-value" id="charact-value">
									{tags}
								</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="book-description">
					<h4>Description</h4>
					<p>{description}</p>
				</div>
			</section>

			<AddToCart value={{ price, amount, id }} />
		</section>
	);
}
