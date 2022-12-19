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
	MESSAGE_SEND_BUTTON = `#button-send-message`
}

export interface IMessage {
	login: string;
	message: string;
	id: string;
}
