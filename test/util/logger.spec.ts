import { expect } from 'chai';
import GetENV from '../../util/env';
import { NextRequestId } from '../../util/generator.helper';
import { LOG, LEVEL } from '../../util/logger';

describe('LOGGER UTILITIES TEST', () => {
	it('should return the correct environment variables', () => {
		const env = GetENV('NODE_ENV');

		// should return 'development' or 'production'
		expect(['development', 'production'].includes(env)).equal(true);
	});
	it('should log info message', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.INFO };
		LOG(message, logOptions);
	});
	it('should log debug message', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.DEBUG };
		LOG(message, logOptions);
	});
	it('should log warn message', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.WARN };
		LOG(message, logOptions);
	});
	it('should log error message', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.ERROR };
		LOG(message, logOptions);
	});
	it('should log trace message', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.TRACE };
		LOG(message, logOptions);
	});
	it('should log fatal message', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.FATAL };
		LOG(message, logOptions);
	});
	it('should log info message with request id', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.INFO, reqId: NextRequestId() };
		LOG(message, logOptions);
	});
	it('should log debug message with request id', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.DEBUG, reqId: NextRequestId() };
		LOG(message, logOptions);
	});
	it('should log warn message with request id', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.WARN, reqId: NextRequestId() };
		LOG(message, logOptions);
	});
	it('should log error message with request id', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.ERROR, reqId: NextRequestId() };
		LOG(message, logOptions);
	});
	it('should log trace message with request id', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.TRACE, reqId: NextRequestId() };
		LOG(message, logOptions);
	});
	it('should log fatal message with request id', () => {
		const message = 'Hello World';
		const logOptions = { level: LEVEL.FATAL, reqId: NextRequestId() };
		LOG(message, logOptions);
	});
	it('should log message without request id and level', () => {
		const message = 'Hello World';
		LOG(message);
	});
	it('should log message without level', () => {
		const message = 'Hello World';
		const logOptions = { reqId: NextRequestId() };
		LOG(message, logOptions);
	});
});
