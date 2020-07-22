import { Client, Userstate } from 'tmi.js';
import { CommandExecutor, AnonymousCommandExecutor } from '.';
import { parseOrigins } from './utils/CommandOrigins';
import Command from './Command';

export default class Commander {
	private static registeredCommanders: Commander[] = [];
	private static runningID = 0;

	private id: number;
	private registeredCommands: Map<string, Command> = new Map();

	constructor(private client: Client) {
		this.id = Commander.runningID++;
		this.client.addListener('chat', (channel, userstate, message, self) => {
			this.handleChat(channel, userstate, message, self, this);
		});
		Commander.registeredCommanders.push(this);
	}

	private handleChat(
		channel: string,
		userstate: Userstate,
		message: string,
		self: boolean,
		commander: Commander
	) {
		if (self) return;
		const origins = parseOrigins(channel, userstate, message, commander.client);
		if (!origins) return;
		const command = commander.registeredCommands.get(origins.identifier);
		if (!command) return;
		command.run(origins);
	}

	public registerCommand(
		command: string,
		executor: CommandExecutor | AnonymousCommandExecutor,
		allowedChannels: string[] = []
	) {
		if (!command || command.includes(' ')) return;
		this.registeredCommands.set(command, new Command(executor, allowedChannels));
	}

	public getID() {
		return this.id;
	}

	public getRegisteredCommands() {
		return [...this.registeredCommands.keys()];
	}

	public static getRegisteredCommanders() {
		return this.registeredCommanders;
	}
}
