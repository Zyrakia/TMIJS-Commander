enum LogLevel {
	INFO = 'INFO',
	WARN = 'WARN',
	ERR = 'ERR',
}

function log(msg: string, lvl: LogLevel = LogLevel.INFO, loggerID: number, shouldLog: boolean) {
	if (shouldLog) console.log(loggerID + ' ' + lvl + ': ' + msg);
}

export function info(msg: string, loggerID: number, shouldLog: boolean) {
	log(msg, LogLevel.INFO, loggerID, shouldLog);
}

export function warn(msg: string, loggerID: number, shouldLog: boolean) {
	log(msg, LogLevel.WARN, loggerID, shouldLog);
}

export function err(msg: string, loggerID: number, shouldLog: boolean) {
	log(msg, LogLevel.ERR, loggerID, shouldLog);
}
