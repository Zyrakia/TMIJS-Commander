import { Userstate, Client } from 'tmi.js';

export interface CommandOrigins {
	identifier: string;
	arguments: string[];
	channel: string;
	author: Userstate;
	client: Client;
}

export function parseOrigins(
	channel: string,
	userstate: Userstate,
	message: string,
	client: Client
) {
	const parsed: CommandOrigins = {
		identifier: '',
		arguments: [],
		channel: channel,
		author: userstate,
		client: client,
	};

	const messageArr = message.split(' ');
	const identifier = messageArr.shift();
	const args = messageArr;

	if (messageArr.length === 0 || !identifier) return;

	parsed.identifier = identifier.toLowerCase();
	parsed.arguments = args;

	return parsed;
}
