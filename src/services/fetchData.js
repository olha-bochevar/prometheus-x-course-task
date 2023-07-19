const getBooksData = async (url) => {
	const res = await fetch(url);
	const data = await res.json();
	return data;
};
/*const fetchBooks = async () => {
			try {
				const response = await fetch('/data/books.json', {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				});

				const data = await response.json();
				setBooks(data.books);
			} catch (error) {
				console.error('Помилка завантаження файлу:', error);
			}
		}; */

export { getBooksData };
