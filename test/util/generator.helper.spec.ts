import { expect } from 'chai';
import { NextRequestId, reqIdIterator } from '../../util/generator.helper';

describe('NextRequestId', () => {
	it('should return a string', () => {
		expect(typeof NextRequestId()).equal('string');
	});
	it('should return a string of length 10', () => {
		expect(NextRequestId().length).equal(10);
	});
	it('should return a string of hexadecimal digits', () => {
		expect(/^[0-9a-f]+$/.test(NextRequestId())).equal(true);
	});
	it('should return a string of hexadecimal digits with value 0000000003', () => {
		expect(NextRequestId()).equal('0000000003');
	});

	it('should return same string 0000000001 after 0xffffffffff iterations', () => {
		const request = reqIdIterator(0xffffffffff);
		expect(request.next().value).equal('ffffffffff');
		expect(request.next().value).equal('0000000001');
	});
});
