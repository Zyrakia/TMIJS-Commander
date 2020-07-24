import { Userstate, Client } from '../Exporter';

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
	if (!identifier) return;
	const args = messageArr;

	parsed.identifier = identifier.toLowerCase();
	parsed.arguments = args;

	return parsed;
}
