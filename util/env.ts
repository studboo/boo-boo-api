/* eslint-disable import/no-cycle */
import path from 'path';
import dotenv, { DotenvParseOutput } from 'dotenv';
import exitAppIfMissingEnv from './exit';
import { LEVEL, LOG } from './logger';

// ENUM for environment variables
export enum envEnums {
	NODE_ENV = 'NODE_ENV',
	EXPRESS_PORT = 'EXPRESS_PORT',
	DB_URL = 'DB_URL',
	DB_USER = 'DB_USER',
	DB_PASSWORD = 'DB_PASSWORD',
	JWT_SECRET = 'JWT_SECRET',
	JWT_EXPIRES = 'JWT_EXPIRES_IN',
	JWT_REFRESH = 'JWT_REFRESH',
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

/**
 * Get the ENV variables from .env file
 * @returns {DotenvParseOutput}
 */
function loadENV(): DotenvParseOutput {
	const env = dotenv.config({ path: path.resolve(__dirname, '../.env') }).parsed;

	// check ENV for the following variables:
	// - NODE_ENV
	// - EXPRESS_PORT
	// - DB_URL
	// - DB_USER
	// - DB_PASSWORD
	// - JWT_SECRET
	// - JWT_EXPIRES_IN
	// - JWT_REFRESH_TOKEN_SECRET
	// - JWT_REFRESH_TOKEN_EXPIRES_IN

	// if any of the above variables are missing, throw an error
	// change above code to switch case
	if (!env) {
		LOG('Missing environment variables', { reqId: 'Starting-App-Error', level: LEVEL.ERROR });
		process.exit(1);
	}

	exitAppIfMissingEnv('NODE_ENV');
	exitAppIfMissingEnv('EXPRESS_PORT');
	exitAppIfMissingEnv('DB_URL');
	exitAppIfMissingEnv('DB_USER');
	exitAppIfMissingEnv('DB_PASSWORD');
	exitAppIfMissingEnv('JWT_SECRET');
	exitAppIfMissingEnv('JWT_EXPIRES_IN');
	exitAppIfMissingEnv('JWT_REFRESH_TOKEN_SECRET');
	exitAppIfMissingEnv('JWT_REFRESH_TOKEN_EXPIRES_IN');

	switch (env.NODE_ENV) {
		case 'development':
			LOG('Environment: Development ⚙️', { reqId: 'Starting-App', level: LEVEL.INFO });
			break;
		case 'production':
			LOG('Environment: Production ✅', { reqId: 'Starting-App', level: LEVEL.INFO });
			break;
		default:
			LOG('Environment: Unknown ⁉️', { reqId: 'Starting-App', level: LEVEL.INFO });
			break;
	}

	return env;
}

const ENV = loadENV();

/**
 * Get the current environment
 * @param {string} key - environment variable
 * @returns {string} value - current environment
 * @example
 * GetENV('NODE_ENV'); // returns 'development' or 'production'
 */
function GetENV(key: envEnums | string): string {
	if (!ENV[key]) {
		LOG(`Missing environment variable: ${key}`, { reqId: 'Error-Missing-Env', level: LEVEL.ERROR });
		process.exit(1);
	}
	return ENV[key];
}

export default GetENV;
