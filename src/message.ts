import { IMessage, Selectors } from './types';
import { v4 as uuid } from 'uuid';
import { getDataFromLocalStorage, setDataToLocalStorage } from './utils';
const messagesContainer = document.querySelector<HTMLDivElement>(
	Selectors.MESSAGES_CONTAINER
)!;

const messages: IMessage[] = [];

export const sendMessage = (login: string, message: string, id?: string) => {
	if (message.length === 0) return;

	const lastMessage = document.querySelector<HTMLDivElement>(
		Selectors.LAST_MESSAGE
	);

	const formedMessage: IMessage = {
		login,
		message,
		id: id || uuid()
	};

	const messageHTML = `
        <div class="card text-start mb-3 message" data-id="${formedMessage.id}">
            <div class="card-body">
                <h4 class="card-title">${formedMessage.login}</h4>
                <p class="card-text">${formedMessage.message}</p>
            </div>
        </div>
    `;
	if (lastMessage) {
		lastMessage?.insertAdjacentHTML('beforebegin', messageHTML);
	} else {
		messagesContainer.innerHTML = messageHTML;
	}
	messages.push(formedMessage);
	setDataToLocalStorage<IMessage[]>('messages', messages);
};

export const initMessages = () => {
	const messagesFromLS = getDataFromLocalStorage<IMessage[]>('messages');
	if (messagesFromLS && messagesFromLS.length > 0) {
		messagesFromLS.forEach((message) => {
			sendMessage(message.login, message.message, message.id);
		});
	}
};
