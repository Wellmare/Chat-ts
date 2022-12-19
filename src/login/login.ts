import { Modal } from 'bootstrap';
import { logins } from './logins';
import { IValidateResponse, Selectors } from '../types';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils';
import { validateLogin, setInvalidFeedback } from './validate';

// NODES --
const usernameInput = document.querySelector<HTMLInputElement>(
	Selectors.USERNAME_INPUT
)!;
const passwordInput = document.querySelector<HTMLInputElement>(
	Selectors.PASSWORD_INPUT
)!;
const usernameTextNode = document.querySelector<HTMLParagraphElement>(
	Selectors.USERNAME_TEXT
)!;
const loginModalButton = document.querySelector<HTMLButtonElement>('#login')!;
// -- NODES

// BOOTSTRAP MODAL --
export const loginModal: Modal = new Modal(
	document.querySelector<HTMLDivElement>(Selectors.MODAL_ID)!
);
// -- BOOTSTRAP MODAL

// VARIABLES --
export let username: string;
export let isLogin: boolean;
// -- VARIABLES

// init on page entry
export const initLogin = (): void => {
	const isLoginFromLS = getDataFromLocalStorage<boolean>('isLogin');
	if (isLoginFromLS != null) {
		isLogin = isLoginFromLS;

		const usernameFromLS = getDataFromLocalStorage<string | null>(
			'username'
		);
		if (usernameFromLS) {
			username = usernameFromLS;
		}
	}

	if (isLogin) {
		loginModalButton.textContent = 'Exit';
	} else {
		username = 'guest';
	}

	usernameTextNode.textContent = username;

	loginModalButton.addEventListener('click', () => {
		if (isLogin) {
			onExit();
		} else {
			loginModal.show();
		}
	});

	document
		.querySelector(Selectors.LOGIN_BUTTON)
		?.addEventListener(`click`, () => {
			if (isLogin) {
				onExit();
			} else {
				onLogin();
			}
		});
};

// EVENTS --
export const onLogin = () => {
	const validateResponse = validateLogin(
		usernameInput.value,
		passwordInput.value
	);
	setInvalidFeedback(validateResponse);
	if (validateResponse.isValid) {
		isLogin = true;
		username = usernameInput.value;
		setDataToLocalStorage<boolean>('isLogin', isLogin);
		setDataToLocalStorage<string>('username', username);
		usernameTextNode.textContent = username;
		loginModal.hide();

		usernameInput.value = ``;
		passwordInput.value = ``;
		loginModalButton.textContent = 'Exit';
	}
};
export const onExit = () => {
	isLogin = false;
	setDataToLocalStorage<boolean>('isLogin', isLogin);
	setDataToLocalStorage<string | null>('username', null);

	usernameTextNode.textContent = 'guest';
	loginModalButton.textContent = 'Login';
};
// -- EVENTS
