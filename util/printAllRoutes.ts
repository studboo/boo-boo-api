/* eslint-disable no-continue */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
import { Express } from 'express';
import { LOG } from './logger';

function getParentRoute(inputString: string): string {
	const arr = inputString.split('/');

	const output = arr
		.filter((item, i) => {
			if (i !== arr.length - 1) {
				// return item starts with any alphabet
				return item.match(/^[a-zA-Z]/);
			}
			return false;
		})
		.map(
			// remove last character
			(item) => item.slice(0, -1),
		)
		.join('/');
	return output;
}

// print out all paths and their methods
function printRoutes(app: Express) {
	const serverAddress = `http://localhost:${process.env.PORT || 3000}`;

	const productionRoutes = [];
	for (let i = 0; i < app._router.stack.length; i++) {
		if (app._router.stack[i].name === 'router') {
			const parentRoute = getParentRoute(app._router.stack[i].regexp.toString());
			LOG(parentRoute, { reqId: 'ROUTES-PARENT' });

			const routes = app._router.stack[i].handle.stack;

			let counter = 0;

			for (let j = 0; j < routes.length; j++) {
				const route = routes[j];

				// if route.route is undefined, it means it is a middleware
				if (!route.route) {
					continue;
				}

				counter++;

				const method = route.route.stack[0].method.toUpperCase();
				const { path } = route.route;
				productionRoutes.push({ method, path: `${serverAddress}/${parentRoute}${path}` });
				LOG(`${method} - ${parentRoute}${path}`, { reqId: `ROUTE-${counter}` });
			}
			console.table(productionRoutes);
		}
	}
}

export default printRoutes;
