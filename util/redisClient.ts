import chalk from 'chalk';
import { createClient } from 'redis';
import { GetENV, UpdateEnv } from './env';
import { LEVEL, LOG } from './logger';

let client = createClient({
	url: GetENV('REDIS_URL'),
});

const redisClient = async () => {
	// connect to redis
	await client.connect();

	return client;
};

function redisEvents() {
	client.on('connect', () => {
		LOG('Connected to Redis Cache ✅', {
			level: LEVEL.INFO,
			reqId: 'Starting-App',
		});
	});

	let ECONNREFUSED = 0;
	client.on('error', async (error) => {
		if (error.message.includes('ECONNREFUSED')) {
			ECONNREFUSED += 1;

			if (ECONNREFUSED > 2) {
				LOG('Redis connection was refused', {
					reqId: 'REDIS-ERROR',
					level: LEVEL.ERROR,
				});
				client.disconnect();
				ECONNREFUSED = 0;

				// eslint-disable-next-line no-use-before-define
				await reconnectRedis();
			}

			return;
		}

		LOG(`REDIS-ERROR: ${error}`, {
			reqId: 'REDIS-ERROR',
			level: LEVEL.ERROR,
		});
	});
}

/**
 * @description
 * This function will called if redis is disconnected due to any reason
 * it try to reconnect to redis exponentially with a delay of 2^n seconds infinitely
 *
 * @param {number} n - number of times redis has been disconnected
 * @returns {Promise<void>}
 *
 * @example
 * await reconnectRedis(1);
 */
let redisClientExpontial = 1;
const reconnectRedis = async (): Promise<void> => {
	redisClientExpontial += 1;
	const delay = 2 * redisClientExpontial;
	LOG(`Redis disconnected, trying to reconnect in ${delay} seconds`, {
		reqId: 'Redis-Error',
		level: LEVEL.ERROR,
	});

	// set timeout to reconnect to redis
	setTimeout(async () => {
		// update env variables
		UpdateEnv();
		LOG(`New URL: ${GetENV('REDIS_URL')}`, {
			reqId: 'Redis-Error',
		});
		client = createClient({
			url: GetENV('REDIS_URL'),
		});
		try {
			await client.connect();
			LOG('Redis reconnected 🛠️', {
				reqId: 'Redis-Fix',
				level: LEVEL.INFO,
			});
		} catch (error) {
			// check if error is object and has message property
			if (error instanceof Error && error.message) {
				if (error.message.includes('ECONNREFUSED')) {
					LOG(`${chalk.red('ECONNREFUSED')} Unable to connect to redis`, {
						reqId: 'Redis-Error',
						level: LEVEL.ERROR,
					});
					await reconnectRedis();
					return;
				}

				LOG(`Redis connection error: ${error}`, {
					reqId: 'Redis-Error',
					level: LEVEL.ERROR,
				});
			}
		}
	}, delay * 1000);
};

redisEvents();

const disconnectRedis = async () => {
	await client.quit();
};

export { redisClient, disconnectRedis };
