import { CommandOrigins } from './CommandOrigins';

export interface CommandExecutor {
	invoke(origins: CommandOrigins): void;
}
