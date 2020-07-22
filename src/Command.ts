import { CommandExecutor, AnonymousCommandExecutor } from '.';
import { CommandOrigins } from '.';

export default class Command {
	constructor(
		private executor: CommandExecutor | AnonymousCommandExecutor,
		private allowedChannels: string[] = []
	) {}

	public run(origins: CommandOrigins) {
		console.log(this.allowedChannels);
		console.log(origins.channel);
		if (this.allowedChannels.length !== 0)
			if (!this.allowedChannels.includes(origins.channel)) return;
		if (this.executor instanceof CommandExecutor) this.executor.invoke(origins);
		else this.executor(origins);
	}
}
