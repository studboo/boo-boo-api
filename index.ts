/** ******************************
 * While developing this app, use of comments is necessary 📝
 *
 * //// Console logs statements DEVELOPMENT ENV ONLY //////////////////////////////////
 * In console if you see 🟥 (RED) then there is an error 🔥
 * In console if you see 🟦 (BLUE) then there is a warning 🔥
 * In console if you see 🟩 (GREEN) then there is a success 🔥
 *
 *
 * //// Production environment ///////////////////////////////////////////////////////
 * In production environment, all development console logs statements are removed 📝
 *
 * //// Incoming and outgoing data logs ///////////////////////////////////////////////
 * Every incoming and outgoing data is logged to the console 📝
 */
// Import the required packages
import chalk from 'chalk';
import express, { Response } from 'express';
import morgan from 'morgan';
import { globalErrorHandler } from './error/globalErrorHandler';
import routes from './routes/router';
import GetENV from './util/env';
import { NextRequestId } from './util/generator.helper';
import { LEVEL, LOG } from './util/logger';
import mongoConnect from './util/mongoConnect';
import printRoutes from './util/printAllRoutes';

const app = express();

// ⭐🔴 Development logging middleware
LOG(`Environment: ${GetENV('NODE_ENV').toUpperCase()}`, { reqId: 'Starting-App', level: LEVEL.INFO });

// ⭐🔴 Express middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// MongoDB connection
mongoConnect();

// requestId is a unique identifier for each request
app.use((req, res, next) => {
	// check incoming request for requestId
	res.locals.reqId = req.headers['x-request-id'] || NextRequestId();

	// add requestId to response headers
	res.setHeader('x-request-id', res.locals.reqId);
	LOG(req.body, { reqId: res.locals.reqId });
	next();
});

if (GetENV('NODE_ENV') === 'development') {
	morgan.token('reqId', (_req, res: Response) => res.locals.reqId);
	app.use(
		morgan(':method :url :status :response-time ms - :res[content-length] x_reqId_x :reqId', {
			stream: {
				write: (msg) => {
					const msgArr = msg.split('x_reqId_x');
					LOG(msgArr[0], { reqId: msgArr[1].trim() });
				},
			},
		}),
	);
}

// router Import
app.use('/api/v1', routes);

// Sending to pages not found
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`,
	});
});

app.use(globalErrorHandler);

app.listen(GetENV('EXPRESS_PORT'), () => {
	LOG(`Server started on port ${chalk.cyanBright(GetENV('EXPRESS_PORT'))}`, {
		reqId: 'Starting-App',
		level: LEVEL.INFO,
	});
	printRoutes(app);
});
