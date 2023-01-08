/* eslint-disable import/prefer-default-export */
/* 
Disconnect mongoDB and Redis connection and stop the server
*/

import { LEVEL, LOG } from './logger';
import { disconnectMongo } from './mongoConnect';
import { disconnectRedis } from './redisClient';

export const stopAppFlow = async () => {
	await disconnectMongo();
	await disconnectRedis();
	LOG('Disconnected from MongoDB and Redis', {
		level: LEVEL.INFO,
		reqId: 'Stopping-App',
	});
	process.exit(0);
};
