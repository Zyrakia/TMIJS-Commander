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
		this.client.addListener('chat', this.handleChat);
		Commander.registeredCommanders.push(this);
	}

	private handleChat(
		this: Commander,
		channel: string,
		userstate: Userstate,
		message: string,
		self: boolean
	) {
		if (self) return;
		const origins = parseOrigins(channel, userstate, message, this.client);
		if (!origins) return;

		const command = this.registeredCommands.get(origins.identifier);
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

	private getID() {
		return this.id;
	}
}
