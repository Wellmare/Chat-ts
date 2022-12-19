import { initLogin, isLogin, loginModal, username } from './login/login';
import { initMessages, sendMessage } from './message';
import { Selectors } from './types';

initLogin();
initMessages();

const messageInput = document.querySelector<HTMLInputElement>(
	Selectors.MESSAGE_INPUT
)!;
const messageSendButton = document.querySelector<HTMLButtonElement>(
	Selectors.MESSAGE_SEND_BUTTON
)!;

messageSendButton.addEventListener('click', () => {
	if (!isLogin) {
		loginModal.show();
	} else {
		sendMessage(username, messageInput.value);
		messageInput.value = ``;
	}
});
