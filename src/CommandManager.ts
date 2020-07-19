import { Client, Userstate } from 'tmi.js';
import { CommandExecutor } from './CommandExecutor';
import { CommandOrigins } from './CommandOrigins';

class CommandManager {
	private registeredCommands: Map<string, CommandExecutor> = new Map();
	private client: Client;

	constructor(client: Client) {
		this.client = client;
		this.client.addListener('chat', (channel, userstate, message, self) => {
			this.parseChatEventToRegisteredCommand(channel, userstate, message, self, this.client);
		});
	}

	public registerCommand(command: string, executor: CommandExecutor) {
		if (!command || command.includes(' ')) return;
		this.registeredCommands.set(command.toLowerCase(), executor);
	}

	private parseChatEventToRegisteredCommand(
		channel: string,
		userstate: Userstate,
		message: string,
		self: boolean,
		client: Client
	) {
		if (self) return;

		const messageArr = message.split(' ');
		const command = messageArr.shift();
		const args = [...messageArr];
		if (!command || !args) return;

		const origins: CommandOrigins = {
			command: command.toLowerCase(),
			arguments: args,
			channel: channel,
			user: userstate,
			client: client,
		};

		this.runCommand(origins);
	}

	private runCommand(origins: CommandOrigins) {
		const command = this.registeredCommands.get(origins.command);
		if (!command) return;
		command.invoke(origins);
	}

	public getRegisteredCommands() {
		return this.registeredCommands;
	}

	public getRegisteredCommandsAsArray() {
		return [...this.registeredCommands.keys()];
	}

	public getClient() {
		return this.client;
	}
}

export { CommandManager, CommandExecutor, CommandOrigins };
