/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// deault mongoose function pass model name as collection name with req res next

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../error/globalErrorHandler';
import catchAsync from '../util/catchAsync';

/**
 * @param {string} id
 * @param {any} Model
 * @returns {Promise<false | any>}
 *
 * @description
 * check if id is valid and return document
 * if id is not valid throw error
 * if document is not found throw error
 * if document is found return document
 *
 * @example
 * const doc = await checkIfIdIsValid(req.params.id, Model);
 */
async function checkIfIdIsValid(id: string, Model: any): Promise<false | any> {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		throw new AppError(`Invalid MongoDB ID ${id}`, 404);
	}
	const doc = await Model.default.findById(id);
	if (!doc) {
		throw new AppError(`No document found with that ID ${id}`, 404);
	}
	return doc;
}

export const createOne = catchAsync(async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await Model.default.create(req.body);
	res.status(201).json({
		status: 'success',
		data: doc,
	});
});

export const getAll = catchAsync(async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await Model.default.find();
	res.status(200).json({
		status: 'success',
		data: doc,
	});
});

export const getOne = catchAsync(async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await checkIfIdIsValid(req.params.id, Model);
	res.status(200).json({
		status: 'success',
		data: doc,
	});
});

export const updateOne = catchAsync(async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const { body } = req;

	// check if body is empty
	if (Object.keys(body).length === 0) {
		throw new AppError('No data provided', 400);
	}

	let doc = await checkIfIdIsValid(req.params.id, Model);
	doc = await Model.default.findByIdAndUpdate(req.params.id, body, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: doc,
	});
});

export const deleteOne = catchAsync(async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	await checkIfIdIsValid(req.params.id, Model);
	await Model.default.findByIdAndDelete(req.params.id);
	// 204 means no content
	res.sendStatus(204);
});
