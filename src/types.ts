export interface ILogin {
	login: string;
	password: string;
}

export interface IValidateResponse {
	isValid: boolean;
	errorMessage: string | null;
}

export const enum Selectors {
	USERNAME_INPUT = `#username`,
	PASSWORD_INPUT = `#password`,
	LOGIN_BUTTON = `#login-btn`,
	USERNAME_TEXT = `#username-text`,

	MODAL_ID = `#modalId`,
	INVALID_FEEDBACK = `#invalid-feedback`,

	MESSAGES_CONTAINER = `#messages`,
	MESSAGE_INPUT = `#message-input`,
	MESSAGE_SEND_BUTTON = `#button-send-message`,
	LAST_MESSAGE = `.message`
}

export interface IMessage {
	login: string;
	message: string;
	id: string;
}

export const enum ErrorsMessages {
	FIELDS_EMPTY = 'Поля не могут быть пустыми',
	PASSWORD_LENGTH = 'Пароль должен быть больше 3 символов',
	WRONG_LOGIN_OR_PASSWORD = 'Неверный логин или пароль'
}

export const enum LocalStorageItems {
	IS_LOGIN = 'isLogin',
	USERNAME = 'username'
}
