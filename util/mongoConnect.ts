import chalk from 'chalk';
import mongoose from 'mongoose';
import { GetENV } from './env';
import { LEVEL, LOG } from './logger';

const mongoConnect = async (MONGO_DB_CONFIG: string) => {
	try {
		let CONNECTION;
		/* MONGO_DB_CONFIG is a string that is set in the .env file
		it can be either 'LOCAL' or 'TEST' or 'PROD' or 'DEV', etc depending on the environment
		if you are using a different environment, then you need to add a case for that environment 
		in the switch statement ("util\mongoConnect.ts) */
		switch (MONGO_DB_CONFIG) {
			case 'LOCAL':
				CONNECTION = GetENV('MONGO_DB_URL_LOCAL');
				break;
			case 'TEST':
				CONNECTION = GetENV('MONGO_DB_URL_TEST')
					.replace('<username>', GetENV('MONGO_DB_USER_TEST'))
					.replace('<password>', GetENV('MONGO_DB_PASSWORD_TEST'));
				break;
			case 'PROD':
				CONNECTION = GetENV('MONGO_DB_URL_PROD')
					.replace('<username>', GetENV('MONGO_DB_USER_PROD'))
					.replace('<password>', GetENV('MONGO_DB_PASSWORD_PROD'));
				break;
			case 'DEV':
				CONNECTION = GetENV('MONGO_DB_URL_DEV')
					.replace('<username>', GetENV('MONGO_DB_USER_DEV'))
					.replace('<password>', GetENV('MONGO_DB_PASSWORD_DEV'));
				break;
			default:
				CONNECTION = GetENV('MONGO_DB_URL_LOCAL');
				break;
		}

		await mongoose.connect(CONNECTION);

		LOG(`Connected to MongoDB with ${chalk.bold.whiteBright.bgGray(` ${MONGO_DB_CONFIG} `)} Config ✅`, {
			level: LEVEL.INFO,
			reqId: 'Starting-App',
		});
	} catch (error) {
		LOG(`Error connecting to MongoDB: ${error}, File: util\\mongoConnect.ts`, {
			reqId: 'Starting-App-Error',
			level: LEVEL.ERROR,
		});
		process.exit(0);
	}
};

const disconnectMongo = async () => {
	await mongoose.disconnect();
};

export { mongoConnect, disconnectMongo };
