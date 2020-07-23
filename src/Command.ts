import { CommandExecutor, AnonymousCommandExecutor } from '.';
import { CommandOrigins } from '.';

export class Command {
	private enabled = true;

	constructor(
		private executor: CommandExecutor | AnonymousCommandExecutor,
		private allowedChannels: string[] = []
	) {}

	public run(origins: CommandOrigins) {
		if (this.enabled) return;
		if (this.allowedChannels.length !== 0)
			if (!this.allowedChannels.includes(origins.channel)) return;

		if (this.executor instanceof CommandExecutor) this.executor.invoke(origins);
		else this.executor(origins);
	}

	public setEnabled(enabled: boolean) {
		this.enabled = enabled;
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
