import mongoose from 'mongoose';
import GetENV from './env';
import { LEVEL, LOG } from './logger';

// Get MONGO_DB_URL, MONGO_DB_USER, MONGO_DB_PASSWORD from .env file
const MONGO_DB_URL = GetENV('MONGO_DB_URL');
const MONGO_DB_USER = GetENV('MONGO_DB_USER');
const MONGO_DB_PASSWORD = GetENV('MONGO_DB_PASSWORD');

const CONNECTION = MONGO_DB_URL.replace('<username>', MONGO_DB_USER).replace('<password>', MONGO_DB_PASSWORD);

const mongoConnect = async () => {
	try {
		await mongoose.connect(CONNECTION);
		LOG('Connected to MongoDB ✅', { level: LEVEL.INFO, reqId: 'Starting-App' });
	} catch (error) {
		LOG(`Error connecting to MongoDB: ${error}, File: util\\mongoConnect.ts`, {
			reqId: 'Starting-App-Error',
			level: LEVEL.ERROR,
		});
		process.exit(0);
	}
};

export default mongoConnect;
