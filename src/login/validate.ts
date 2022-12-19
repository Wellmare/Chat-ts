import { ErrorsMessages, IValidateResponse, Selectors } from '../types';
import { getError } from '../utils';
import { logins } from './logins';

const invalidFeedbackNode = document.querySelector<HTMLDivElement>(
	Selectors.INVALID_FEEDBACK
)!;

export const validateLogin = (
	login: string,
	password: string
): IValidateResponse => {
	login = login.trim();
	password = password.trim();

	if (login.length === 0 || password.length === 0) {
		return getError(ErrorsMessages.FIELDS_EMPTY, false);
	}
	if (password.length < 4) {
		return getError(ErrorsMessages.PASSWORD_LENGTH, false);
	}

	let result;

	logins.forEach(({ login: serverLogin, password: serverPassword }) => {
		if (serverLogin === login && serverPassword === password) {
			result = getError(null, true);
		}
	});

	if (!result) {
		return getError(ErrorsMessages.WRONG_LOGIN_OR_PASSWORD, false);
	}
	return result;
};

export const setInvalidFeedback = ({
	isValid,
	errorMessage
}: IValidateResponse) => {
	if (isValid) {
		invalidFeedbackNode.classList.remove('d-block');
	} else {
		invalidFeedbackNode.classList.add('d-block');
		invalidFeedbackNode.textContent = errorMessage;
	}
};
