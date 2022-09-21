/* eslint-disable import/no-cycle */
import path from 'path';
import dotenv, { DotenvParseOutput } from 'dotenv';
import { LEVEL, LOG } from './logger';

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
	if (
		!env ||
		!env.NODE_ENV ||
		!env.EXPRESS_PORT ||
		!env.DB_URL ||
		!env.DB_USER ||
		!env.DB_PASSWORD ||
		!env.JWT_SECRET ||
		!env.JWT_EXPIRES_IN ||
		!env.JWT_REFRESH_TOKEN_SECRET ||
		!env.JWT_REFRESH_TOKEN_EXPIRES_IN
	) {
		LOG('Missing environment variables', { reqId: 'Starting-App-Error', level: LEVEL.ERROR });
		process.exit(1);
	}
	LOG('Environment variables loaded', { level: LEVEL.INFO, reqId: 'Starting-App' });
	return env;
}

const ENV = loadENV();

/**
 * Get the current environment
 * @returns {string} - current environment
 * @example
 * GetENV('NODE_ENV'); // returns 'development' or 'production'
 */
function GetENV(key: string): string {
	if (!ENV[key]) {
		LOG(`Missing environment variable: ${key}`, { reqId: 'Error-Missing-Env', level: LEVEL.ERROR });
		process.exit(1);
	}
	return ENV[key];
}

export default GetENV;
