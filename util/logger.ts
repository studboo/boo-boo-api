/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
// console log logger function

import util from 'util';
import chalk from 'chalk';
import GetENV from './env';

// different levels of logging
// trace, debug, info, warn, error and fatal.
enum LEVEL {
	INFO = 'info',
	DEBUG = 'debug',
	WARN = 'warn',
	ERROR = 'error',
	TRACE = 'trace',
	FATAL = 'fatal',
}

type LogOptions = { level?: LEVEL; reqId?: string };

// get current date and time logging in IST and format it as DD-MM HH:MM 12hr format
/**
 * Get current date and time
 * @returns {string} - current date and time
 * @example
 * getDateTime();
 * returns 'DD-MM HH:MM 12hr'
 */
function getDateTime(): string {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	const hours12 = hours % 12;
	const day = date.getDate();
	const month = date.getMonth() + 1;
	return `${day}-${month} ${hours12}:${minutes} ${ampm}`;
}

/**
 * Logger function
 * @param {string} message - message to log
 * @param {string} logOptions - level of message
 * @returns {void}
 * @example
 * LOG('Hello World', { level: LEVEL.INFO });
 */
function LOG(message: string, logOptions?: LogOptions): void {
	const { reqId = '----------', level } = logOptions || {};

	let outputMsg = '';
	if (!level) {
		outputMsg = util.inspect(message, false, null, true /* enable colors */);
	} else {
		outputMsg = message;
	}

	// use tab space to align the log message
	const log = `\t[${getDateTime()}]\t[${reqId}]\t${outputMsg}`;
	switch (level) {
		case 'info':
			console.info(`${chalk.bold.blue('[INFO]')}${log}`);
			break;

		case 'debug':
			console.debug(`${chalk.bold.magenta('[DEBUG]')}${log}`);
			break;

		case 'warn':
			console.warn(`${chalk.bold.yellow('[WARN]')}${log}`);
			break;

		case 'error':
			console.error(`${chalk.bold.red('[ERROR]')}${log}`);
			break;

		case 'trace':
			console.log(`${chalk.bold.cyan('[TRACE]')}${log}`);
			break;

		case 'fatal':
			console.error(`${chalk.bold.red('[FATAL]')}${log}`);
			break;

		default:
			if (GetENV('NODE_ENV') !== 'production') {
				console.log(`${chalk.bold.green('[DEV]')} ${log}`);
			}
			break;
	}
}

export { LOG, LEVEL, LogOptions };
