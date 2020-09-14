import { CommandOrigins } from '../Exporter';

export abstract class CommandExecutor {
	abstract async invoke(origins: CommandOrigins): Promise<void>;
}

export interface AnonymousCommandExecutor {
	async (origins: CommandOrigins): Promise<void>;
}
