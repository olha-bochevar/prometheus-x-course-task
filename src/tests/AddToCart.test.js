import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddToCart } from './../components/AddToCard/AddToCart';
import { BooksProvider } from './../hooks/BooksContext';

describe('AddToCart Component', () => {
	const bookData = {
		value: { price: 10.0, amount: 20, id: 1 },
	};

	test('should increase the amount after clicking on the increase button', () => {
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		const increaseButton = getByTestId('increase-btn');
		userEvent.click(increaseButton);

		const amountInput = getByTestId('amount');
		expect(amountInput.value).toBe('2');
	});

	test('should decrease the amount after clicking the decrease button', () => {
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		const increaseButton = getByTestId('increase-btn');
		userEvent.click(increaseButton);
		userEvent.click(increaseButton);

		const decreaseButton = getByTestId('decrease-btn');
		userEvent.click(decreaseButton);

		const amountInput = getByTestId('amount');
		expect(amountInput.value).toBe('2');
	});

	test('should update totalPrice when amountToBuy changes', () => {
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		const amountInput = getByTestId('amount');
		const totalPrice = getByTestId('total-price');

		fireEvent.change(amountInput, { target: { value: 5 } });
		expect(totalPrice.textContent).toBe('50.00');
	});
});
