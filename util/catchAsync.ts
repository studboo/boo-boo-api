/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';

const functionWrapper = (fn: Function) => (Model: any, req: Request, res: Response, next: NextFunction) => {
	fn(Model, req, res, next).catch(next);
};

export default functionWrapper;
