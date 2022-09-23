/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, Request, Response } from 'express';

export default (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
	fn(req, res, next).catch(next);
};
