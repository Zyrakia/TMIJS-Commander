import { Commander } from '../Exporter';

export enum LogLevel {
	FATAL = 'FATAL',
	ERROR = 'ERROR',
	WARN = 'WARN',
	INFO = 'INFO',
}

export class Logger {
	constructor(private commander: Commander) {}

	public log(msg: string, level: LogLevel = LogLevel.INFO) {
		if (!this.commander.getLogging()) return;
		console.log(`${level}:${this.commander.getID()}: ${msg}`);
	}

	public fatal(msg: string) {
		this.log(msg, LogLevel.FATAL);
	}

	public error(msg: string) {
		this.log(msg, LogLevel.ERROR);
	}

	public warn(msg: string) {
		this.log(msg, LogLevel.WARN);
	}

	public info(msg: string) {
		this.log(msg, LogLevel.INFO);
	}
}
