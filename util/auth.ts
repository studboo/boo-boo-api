// authorization middleware

import { Request, Response, NextFunction } from 'express';

const AUTH = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;
	if (authorization === 'Bearer 123') {
		next();
	} else {
		res.status(401).json({
			error: 'Unauthorized',
			message: 'You are not authorized to access this resource',
			fix: 'Please use ✅ >>Bearer 123<< ✅ as your authorization token',
		});
	}
};

export default AUTH;
