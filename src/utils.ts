import { ErrorsMessages } from './types';

export const setDataToLocalStorage = <T>(key: string, value: T): void => {
	const valueToJSON = JSON.stringify(value);
	localStorage.setItem(key, valueToJSON);
};

export const getDataFromLocalStorage = <T>(key: string): T | null => {
	const localStorageResponse = localStorage.getItem(key);
	if (
		localStorageResponse !== null &&
		JSON.parse(localStorageResponse) !== null
	) {
		return JSON.parse(localStorageResponse);
	}
	return null;
};

export const getError = (
	errorMessage: ErrorsMessages | null,
	isValid: boolean = false
) => ({
	isValid,
	errorMessage
});
