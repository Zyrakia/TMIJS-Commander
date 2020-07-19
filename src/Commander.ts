import { Client, Userstate } from 'tmi.js';
import { CommandExecutor } from './utils/CommandExecutor';
import { CommandOrigins } from './utils/CommandOrigins';

class Commander {
	private static runningID = 0;

	private registeredCommands: Map<string, CommandExecutor> = new Map();
	private client: Client;
	private shouldLog: boolean;
	private id: number;

	constructor(client: Client, enableLogging: boolean = false) {
		this.client = client;
		this.client.addListener('chat', (channel, userstate, message, self) => {
			this.parseChatEventToRegisteredCommand(channel, userstate, message, self, this.client);
		});
		this.shouldLog = enableLogging;
		this.id = Commander.runningID++;

		this.log('Commander initialized. (ID: ' + this.id + ' | Logging: ' + this.shouldLog + ')');
	}

	public registerCommand(command: string, executor: CommandExecutor) {
		if (!command || command.includes(' ')) {
			this.log(`Command was not registered. It is either empty or includes spaces.`);
			return;
		}

		this.registeredCommands.set(command.toLowerCase(), executor);
		this.log(`Registered command ${command}.`);
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
		this.log(`Command ${origins.command} run by ${origins.user.username}.`);
	}

	public toggleLog() {
		this.shouldLog = !this.shouldLog;
		if (this.shouldLog) console.log('Commander logging enabled');
		else console.log('Commander logging disabled');
	}

	private log(msg: string) {
		if (this.shouldLog) console.log(this.id + ': ' + msg);
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

	public getID() {
		return this.id;
	}
}

export { Commander, CommandExecutor, CommandOrigins };
