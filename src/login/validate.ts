import { IValidateResponse, Selectors } from "../types";
import { logins } from "./logins";

const invalidFeedbackNode = document.querySelector<HTMLDivElement>(
	Selectors.INVALID_FEEDBACK
)!;

export const validateLogin = (
	login: string,
	password: string
): IValidateResponse => {
	login = login.trim();
	password = password.trim();

	if (login.length <= 0 || password.length <= 0) {
		return { isValid: false, errorMessage: 'Поля не могут быть пустыми' };
	}
	if (password.length < 4) {
		return {
			isValid: false,
			errorMessage: 'Пароль должен быть больше 6 символов'
		};
	}

	let result;

	logins.forEach(({ login: serverLogin, password: serverPassword }) => {
		if (serverLogin === login && serverPassword === password) {
			result = { isValid: true, errorMessage: null };
		}
	});

	if (!result) {
		return {
			isValid: false,
			errorMessage: 'Неправльный логин или пароль'
		};
	}
	return result;
};

export const setInvalidFeedback = ({
	isValid,
	errorMessage
}: IValidateResponse) => {
	if (isValid) {
		invalidFeedbackNode.classList.remove('d-block');
	} else if (!isValid) {
		invalidFeedbackNode.classList.add('d-block');
		invalidFeedbackNode.textContent = errorMessage;
	}
};