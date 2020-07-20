import { Client, Userstate } from 'tmi.js';
import { CommandExecutor, AnonymousCommandExecutor } from './utils/CommandExecutor';
import { CommandOrigins } from './utils/CommandOrigins';
import { info, warn } from './utils/Logger';

class Commander {
	private static runningID = 0;

	private registeredCommands: Map<string, CommandExecutor | AnonymousCommandExecutor> = new Map();
	private client: Client;
	private id: number;
	private shouldLog: boolean;

	constructor(client: Client, enableLogging: boolean = false) {
		this.client = client;
		this.client.addListener('chat', (channel, userstate, message, self) => {
			this.parseChatEventToRegisteredCommand(channel, userstate, message, self, this.client);
		});
		this.id = Commander.runningID++;
		this.shouldLog = enableLogging;

		info(
			'Commander initialized. (ID: ' + this.id + ' | Logging: ' + this.shouldLog + ')',
			this.id,
			this.shouldLog
		);
	}

	public registerCommand(command: string, executor: CommandExecutor | AnonymousCommandExecutor) {
		if (!command || command.includes(' ')) {
			warn(
				`Command was not registered. It is either empty or includes spaces.`,
				this.id,
				this.shouldLog
			);
			return;
		}

		this.registeredCommands.set(command.toLowerCase(), executor);
		info(`Registered command ${command}.`, this.id, this.shouldLog);
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

		if (command instanceof CommandExecutor) command.invoke(origins);
		else command(origins);

		info(
			`Command ${origins.command} run by ${origins.user.username}.`,
			this.id,
			this.shouldLog
		);
	}

	public toggleLog() {
		this.shouldLog = !this.shouldLog;
		if (this.shouldLog) console.log('Commander logging enabled');
		else console.log('Commander logging disabled');
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

	public getShouldLog() {
		return this.shouldLog;
	}
}

export { Commander, CommandExecutor, CommandOrigins };
