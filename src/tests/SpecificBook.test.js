import {
	render,
	screen,
	fireEvent,
	expect,
	jest,
	test,
} from '@testing-library/react';
import { AddToCart } from './../components/AddToCard/AddToCart';

test('should increase and decrease the quantity correctly', () => {
	// Мокове значення для функції setCart
	const setCart = jest.fn();

	render(<AddToCart value={{ price: 10, amount: 5, id: 1, setCart }} />);

	// Знайдемо елементи, що мають бути на сторінці
	const increaseBtn = screen.getByTestId('increase-btn');
	const decreaseBtn = screen.getByTestId('decrease-btn');
	const quantityInput = screen.getByTestId('amount');

	// Перевіримо, що кількість на початку дорівнює 1
	expect(quantityInput.value).toBe('1');

	// Клікнемо на кнопку "+" і перевіримо, що кількість збільшилася
	fireEvent.click(increaseBtn);
	expect(quantityInput.value).toBe('2');

	// Клікнемо на кнопку "-" і перевіримо, що кількість зменшилася
	fireEvent.click(decreaseBtn);
	expect(quantityInput.value).toBe('1');

	// Клікнемо на кнопку "-", коли кількість вже 1, і перевіримо, що кількість не змінилася
	fireEvent.click(decreaseBtn);
	expect(quantityInput.value).toBe('1');
});

test('should add item to cart when "Add to cart" button is clicked', () => {
	// Мокове значення для функції setCart
	const setCart = jest.fn();

	render(<AddToCart value={{ price: 10, amount: 5, id: 1, setCart }} />);

	// Знайдемо кнопку "Add to cart" і клікнемо на неї
	const addToCartBtn = screen.getByText('Add to cart');
	fireEvent.click(addToCartBtn);

	// Перевіримо, що функція setCart була викликана з вірними аргументами
	expect(setCart).toHaveBeenCalledTimes(1);
	expect(setCart).toHaveBeenCalledWith([{ id: 1, quantity: 1, price: 10 }]);
});

// Додайте інші тести за необхідністю
