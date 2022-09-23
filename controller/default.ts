/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// deault mongoose function pass model name as collection name with req res next

import { NextFunction, Request, Response } from 'express';

export const createOne = async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await Model.default.create(req.body);
	res.status(201).json({
		status: 'success',
		data: doc,
	});
};

export const getAll = async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await Model.default.find();
	res.status(200).json({
		status: 'success',
		data: doc,
	});
};

export const getOne = async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await Model.default.findById(req.params.id);
	res.status(200).json({
		status: 'success',
		data: doc,
	});
};

export const updateOne = async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	const doc = await Model.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
	res.status(200).json({
		status: 'success',
		data: doc,
	});
};

export const deleteOne = async (Model: any, req: Request, res: Response, _next: NextFunction) => {
	await Model.default.findByIdAndDelete(req.params.id);
	// 204 means no content
	res.sendStatus(204);
};
