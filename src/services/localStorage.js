/*
браузера(localStorage/sessionStorage). При логіні записуєте те що вам потрібно в storage. При заході на сайт перевіряєте інфу з стореджа, якщо є - пропускаєте далі, якщо нема - редірект на логін. При кліку на log out - чистим дані.*/
const LS_KEYS = {
	CART: 'cart',
	USERNAME: 'username',
	BOOKS: 'books',
};

class LocalStorageService {
	static get(key) {
		const value = window.localStorage.getItem(key);

		try {
			return JSON.parse(value);
		} catch {
			return value;
		}
	}

	static set(key, value) {
		return window.localStorage.setItem(key, JSON.stringify(value));
	}
	static remove(key) {
		return window.localStorage.removeItem(key);
	}
	static clearAll() {
		return window.localStorage.clear();
	}
}

export { LocalStorageService, LS_KEYS };
