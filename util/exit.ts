import chalk from 'chalk';
import { LEVEL, LOG } from './logger';

// exit app if any environment variable is missing
export default function exitAppIfMissingEnv(key: string): void {
	if (!process.env[key]) {
		// line with error message with red bold in console
		LOG(`---------------${chalk.red.bold(`${key} is missing`)}----------------`, {
			reqId: 'Starting-App',
			level: LEVEL.ERROR,
		});
		LOG(`Missing environment variable: ${key}`, { reqId: 'Exiting-App', level: LEVEL.ERROR });
		process.exit();
	}
}
