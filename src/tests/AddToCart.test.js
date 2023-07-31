import { render, fireEvent } from '@testing-library/react';
import { AddToCart } from './../components/AddToCard/AddToCart';
// Імпортуємо необхідні залежності для тестування контексту
import { BooksProvider } from './../hooks/BooksContext';

describe('AddToCart Component', () => {
	// Мокуємо дані книги для тесту
	const bookData = {
		value: { price: '10.00', amount: 20, id: 1 },
	};

	// Тест для збільшення кількості
	it('повинно збільшити кількість після кліку на кнопку збільшення', () => {
		// Використовуємо функцію render з відповідним контекстом BooksProvider
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		// Знаходимо кнопку збільшення і клікаємо на неї
		const increaseButton = getByTestId('increase-btn');
		fireEvent.click(increaseButton);

		// Очікуємо, що кількість збільшиться до 2, оскільки початкове значення 1, а максимальне 20
		const amountInput = getByTestId('amount');
		expect(amountInput.value).toBe('2');
	});

	// Тест для зменшення кількості
	it('повинно зменшити кількість після кліку на кнопку зменшення', () => {
		// Використовуємо функцію render з відповідним контекстом BooksProvider
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		// Спочатку збільшуємо кількість до 3
		const increaseButton = getByTestId('increase-btn');
		fireEvent.click(increaseButton);
		fireEvent.click(increaseButton);

		// Знаходимо кнопку зменшення і клікаємо на неї
		const decreaseButton = getByTestId('decrease-btn');
		fireEvent.click(decreaseButton);

		// Очікуємо, що кількість зменшиться до 2
		const amountInput = getByTestId('amount');
		expect(amountInput.value).toBe('2');
	});

	// Тест для перевірки зміни загальної вартості
	it('повинно змінити загальну вартість після зміни кількості', () => {
		// Використовуємо функцію render з відповідним контекстом BooksProvider
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		// Знаходимо інпут для вводу кількості і встановлюємо значення 5
		const amountInput = getByTestId('amount');
		fireEvent.change(amountInput, { target: { value: 5 } });

		// Очікуємо, що загальна вартість зміниться відповідно до введеної кількості
		const totalPrice = getByTestId('total-price');
		expect(totalPrice.textContent).toBe('50.00');
	});
});
