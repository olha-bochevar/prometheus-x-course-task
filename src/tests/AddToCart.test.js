import { render, fireEvent } from '@testing-library/react';
import { AddToCart } from './../components/AddToCard/AddToCart';
import { BooksProvider } from './../hooks/BooksContext';

describe('AddToCart Component', () => {
	const bookData = {
		value: { price: 10.0, amount: 20, id: 1 },
	};

	it('should increase the amount after clicking on the increase button', () => {
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		const increaseButton = getByTestId('increase-btn');
		fireEvent.click(increaseButton);

		const amountInput = getByTestId('amount');
		expect(amountInput.value).toBe('2');
	});

	it('should decrease the amount after clicking the decrease button', () => {
		const { getByTestId } = render(
			<BooksProvider>
				<AddToCart {...bookData} />
			</BooksProvider>
		);

		const increaseButton = getByTestId('increase-btn');
		fireEvent.click(increaseButton);
		fireEvent.click(increaseButton);

		const decreaseButton = getByTestId('decrease-btn');
		fireEvent.click(decreaseButton);

		const amountInput = getByTestId('amount');
		expect(amountInput.value).toBe('2');
	});

	it('should update totalPrice when amountToBuy changes', () => {
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
