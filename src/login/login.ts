import { Modal } from 'bootstrap';
import { logins } from './logins';
import { IValidateResponse, Selectors } from '../types';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils';
import { validateLogin, setInvalidFeedback } from './validate';

// NODES --
const usernameTextNode = document.querySelector<HTMLParagraphElement>(
	Selectors.USERNAME_TEXT
)!;
const loginModalButton = document.querySelector<HTMLButtonElement>('#login')!;
const nodesInModal = {
	usernameInput: document.querySelector<HTMLInputElement>(
		Selectors.USERNAME_INPUT
	)!,
	passwordInput: document.querySelector<HTMLInputElement>(
		Selectors.PASSWORD_INPUT
	)!,
	loginButton: document.querySelector(Selectors.LOGIN_BUTTON)
};
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
	const isLoginFromLocalStorage = getDataFromLocalStorage<boolean>('isLogin');
	if (isLoginFromLocalStorage != null) {
		isLogin = isLoginFromLocalStorage;

		const usernameFromLocalStorage = getDataFromLocalStorage<string | null>(
			'username'
		);
		if (usernameFromLocalStorage) {
			username = usernameFromLocalStorage;
		}
		loginModalButton.textContent = 'Exit';
	} else {
		isLogin = false;
		username = 'guest';
	}

	usernameTextNode.textContent = username;

	// EVENTS LISTENERS --
	loginModalButton.addEventListener('click', () => {
		if (isLogin) {
			onExit();
		} else {
			loginModal.show();
		}
	});

	nodesInModal.loginButton?.addEventListener(`click`, () =>
		isLogin ? onExit() : onLogin()
	);
	// -- EVENTS LISTENERS
};

// EVENTS --
export const onLogin = () => {
	const validateResponse = validateLogin(
		nodesInModal.usernameInput.value,
		nodesInModal.passwordInput.value
	);
	setInvalidFeedback(validateResponse);
	if (validateResponse.isValid) {
		isLogin = true;
		username = nodesInModal.usernameInput.value;
		setDataToLocalStorage<boolean>('isLogin', isLogin);
		setDataToLocalStorage<string>('username', username);
		usernameTextNode.textContent = username;
		loginModal.hide();

		nodesInModal.usernameInput.value = ``;
		nodesInModal.passwordInput.value = ``;
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
