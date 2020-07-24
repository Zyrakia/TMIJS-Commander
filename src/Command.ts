import { CommandExecutor, AnonymousCommandExecutor, CommandOrigins, Logger } from './Exporter';

export class Command {
	private enabled = true;

	constructor(
		private identifier: string,
		private executor: CommandExecutor | AnonymousCommandExecutor,
		private allowedChannels: string[] = [],
		private log: Logger
	) {}

	public run(origins: CommandOrigins) {
		if (!this.enabled) {
			this.log.warn(`Command ${origins.identifier} received, but it is disabled.`);
			return;
		}

		if (this.allowedChannels.length !== 0)
			if (!this.allowedChannels.includes(origins.channel)) {
				this.log.warn(
					`Command ${origins.identifier} received, but in an unallowed channel (${origins.channel}).`
				);
				return;
			}

		if (this.executor instanceof CommandExecutor) this.executor.invoke(origins);
		else this.executor(origins);

		this.log.info(`Command ${origins.identifier} successfully sent to executor.`);
	}

	public enable() {
		this.enabled = true;
		this.log.info(`Command ${this.identifier} was enabled.`);
	}

	public disable() {
		this.enabled = false;
		this.log.info(`Command ${this.identifier} was disabled.`);
	}

	public getEnabled() {
		return this.enabled;
	}

	public getExecutor() {
		return this.executor;
	}

	public getAllowedChannels() {
		return this.allowedChannels;
	}
}
