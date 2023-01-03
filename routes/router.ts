/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { Request, Response, Router } from 'express';
import * as DB from '../controller/default';
import AUTH from '../util/auth';
import { LEVEL, LOG } from '../util/logger';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
	res.json({
		note: 'Welcome to the API V1 Routes',
		info: 'The Following /*/*/*/* URL paths are dymatically generated',
	});
});

// 1. list of model files location
const folder = './DB';

// 2. model array to define models
const CRUDMODEL: any[] = [];

// 3. read all model files and generate all CRUD routes
fs.readdirSync(folder).forEach((file, index) => {
	const extname = path.extname(file);
	const filename = path.basename(file, extname);
	const absolutePath = path.resolve(folder, file);

	/**
	 * You can use if or switch for dynamic routes
	 *
	 * e.g.
	 * if (filename === 'test') {
	 * 	routes.get(`/${filename}/more_fun`, (req, res, next) => {
	 * 		res.json({
	 * 			note: 'This is a more fun route',
	 * 		});
	 * 	});
	 * }
	 *
	 * another example
	 * switch (filename) {
	 * 	case 'test':
	 * 		routes.use(auth);
	 * 		break;
	 * 	default:
	 * 		break;
	 * }
	 * here auth is a middleware for authentication
	 *
	 */

	// Dynamically load the model files
	// eslint-disable-next-line import/no-dynamic-require
	CRUDMODEL[index] = require(`${absolutePath}`);

	/**
	 * Example of the above snippet comment
	 */

	// if (filename === 'test') {
	// 	LOG(`Generating CRUD routes for ${filename} with Auth`, { level: LEVEL.WARN, reqId: 'Starting-App' });
	// 	routes.get(`/${filename}withAuth`, AUTH, (req, res, next) => {
	// 		DB.getAll(CRUDMODEL[index], req, res, next);
	// 	});
	// 	routes.get(`/${filename}withAuth/:id`, AUTH, (req, res, next) => {
	// 		DB.getOne(CRUDMODEL[index], req, res, next);
	// 	});
	// 	routes.post(`/${filename}withAuth`, AUTH, (req, res, next) => {
	// 		DB.createOne(CRUDMODEL[index], req, res, next);
	// 	});
	// 	routes.put(`/${filename}withAuth/:id`, AUTH, (req, res, next) => {
	// 		DB.updateOne(CRUDMODEL[index], req, res, next);
	// 	});
	// 	routes.delete(`/${filename}withAuth/:id`, AUTH, (req, res, next) => {
	// 		DB.deleteOne(CRUDMODEL[index], req, res, next);
	// 	});
	// }

	// add file name to the res.locals.file and method to the res.locals.method
	routes.use((req, res, next) => {
		res.locals.file = filename;
		res.locals.method = req.method;
		next();
	});

	// Dynamically generate CRUD routes
	LOG(`Generating CRUD routes for ${chalk.bold.green.bgWhite(` ${filename} `)} ✅`, {
		level: LEVEL.INFO,
		reqId: 'Starting-App',
	});
	routes.get(`/${filename}`, (req, res, next) => {
		DB.getAll(CRUDMODEL[index], req, res, next);
	});
	routes.get(`/${filename}/:id`, (req, res, next) => {
		DB.getOne(CRUDMODEL[index], req, res, next);
	});
	routes.post(`/${filename}`, (req, res, next) => {
		DB.createOne(CRUDMODEL[index], req, res, next);
	});
	routes.put(`/${filename}/:id`, (req, res, next) => {
		DB.updateOne(CRUDMODEL[index], req, res, next);
	});
	routes.delete(`/${filename}/:id`, (req, res, next) => {
		DB.deleteOne(CRUDMODEL[index], req, res, next);
	});
});

export default routes;
