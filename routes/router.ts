/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import fs from 'fs';
import path from 'path';
import * as express from 'express';
import * as DB from '../controller/default';
import { LEVEL, LOG } from '../util/logger';

const routes = express.Router();

routes.get('/', (req, res) => {
	res.json({
		note: 'The Following /*/*/*/* URL paths are dymatically generated',
	});
});

// 1. list of model files location
const folder = './DB';

// 2. model array to define models
const CURDMODEL: any[] = [];

// 3. read all model files and generate all CURD routes
fs.readdirSync(folder).forEach((file, index) => {
	const extname = path.extname(file);
	const filename = path.basename(file, extname);
	const absolutePath = path.resolve(folder, file);

	console.log(`Loading model: ${absolutePath}`);
	// Dynamically load the model files
	// eslint-disable-next-line import/no-dynamic-require
	CURDMODEL[index] = require(`${absolutePath}`);

	LOG(`Generating CURD routes for ${filename}`, { level: LEVEL.INFO, reqId: 'Starting-App' });
	routes.get(`/${filename}`, (req, res, next) => {
		DB.getAll(CURDMODEL[index], req, res, next);
	});
	routes.get(`/${filename}/:id`, (req, res, next) => {
		DB.getOne(CURDMODEL[index], req, res, next);
	});
	routes.post(`/${filename}`, (req, res, next) => {
		DB.createOne(CURDMODEL[index], req, res, next);
	});
	routes.put(`/${filename}/:id`, (req, res, next) => {
		DB.updateOne(CURDMODEL[index], req, res, next);
	});
	routes.delete(`/${filename}/:id`, (req, res, next) => {
		DB.deleteOne(CURDMODEL[index], req, res, next);
	});
});

// CRUD using test model
// // create one
// routes.post('/test', DB.createOne(test));

// // get all
// routes.get('/test', DB.getAll(test));

// // get one
// routes.get('/test/:id', DB.getOne(test));

// // update one
// routes.patch('/test/:id', DB.updateOne(test));

// // delete one
// routes.delete('/test/:id', DB.deleteOne(test));

export default routes;