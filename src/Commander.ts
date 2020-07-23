import { Client, Userstate } from 'tmi.js';
import { CommandExecutor, AnonymousCommandExecutor } from '.';
import { parseOrigins } from './utils/CommandOrigins';
import { Command } from './Command';

export class Commander {
	private static runningID = 0;
	private static registeredCommanders: Map<number, Commander> = new Map();

	private id: number;
	private registeredCommands: Map<string, Command> = new Map();

	constructor(private client: Client) {
		this.id = Commander.runningID++;
		this.client.addListener('chat', (channel, userstate, message, self) => {
			this.handleChat(channel, userstate, message, self, this);
		});
		Commander.registeredCommanders.set(this.id, this);
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

	public getCommand(command: string) {
		return this.registeredCommands.get(command.toLowerCase());
	}

	public getCommands() {
		return this.registeredCommands;
	}

	public static getCommander(id: number) {
		return this.registeredCommanders.get(id);
	}

	public static getCommanders() {
		return this.registeredCommanders;
	}
}
