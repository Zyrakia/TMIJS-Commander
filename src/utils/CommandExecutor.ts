import { CommandOrigins } from './CommandOrigins';

export abstract class CommandExecutor {
	abstract invoke(origins: CommandOrigins): void;
}

export interface AnonymousCommandExecutor {
	(origins: CommandOrigins): void;
}
