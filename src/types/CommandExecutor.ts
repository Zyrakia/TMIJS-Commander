import { CommandOrigins } from '../Exporter';

export abstract class CommandExecutor {
	abstract invoke(origins: CommandOrigins): void;
}

export interface AnonymousCommandExecutor {
	(origins: CommandOrigins): void;
}
