import {
	Client,
	Userstate,
	Command,
	parseOrigins,
	CommandExecutor,
	AnonymousCommandExecutor,
	Logger,
} from './Exporter';

export class Commander {
	private static runningID = 0;
	private static registeredCommanders: Map<number, Commander> = new Map();

	private id: number;
	private registeredCommands: Map<string, Command> = new Map();
	private loggingEnabled = false;

	private log: Logger;

	constructor(private client: Client) {
		this.id = Commander.runningID++;
		this.log = new Logger(this);

		this.client.addListener('chat', (channel, userstate, message, self) => {
			this.handleChat(channel, userstate, message, self, this, this.log);
		});

		Commander.registeredCommanders.set(this.id, this);
		this.log.info('Commander registered.');
	}

	private handleChat(
		channel: string,
		userstate: Userstate,
		message: string,
		self: boolean,
		commander: Commander,
		log: Logger
	) {
		log.info(`Message received from ${userstate.username} in ${channel}`);

		if (self) {
			log.info(`Message rejected because it came from base client.`);
			return;
		}

		const origins = parseOrigins(channel, userstate, message, commander.client);

		if (!origins) {
			log.info(`Message rejected because it did not format into a command correctly.`);
			return;
		}

		const command = commander.getCommand(origins.identifier);

		if (!command) {
			log.info(`Message was rejected because it is not a registered command.`);
			return;
		}

		log.info(`Message parsed to valid command, sending forward.`);
		command.run(origins);
	}

	public registerCommand(
		command: string,
		executor: CommandExecutor | AnonymousCommandExecutor,
		allowedChannels: string[] = []
	) {
		if (!command || command.includes(' ')) {
			this.log.warn(
				`Command ${command} was not registered because it is empty or includes spaces.`
			);
			return;
		}

		this.registeredCommands.set(
			command,
			new Command(command, executor, allowedChannels, this.log)
		);
		this.log.info(`Command ${command} successfully registered.`);
	}

	public enableLogging() {
		this.loggingEnabled = true;
		this.log.info(`Logging has been enabled.`);
	}

	public disableLogging() {
		this.loggingEnabled = false;
	}

	public getLogging() {
		return this.loggingEnabled;
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
