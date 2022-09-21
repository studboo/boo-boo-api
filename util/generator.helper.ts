/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/**
 * yields a unique request id.
 * @returns {string}
 */
function* reqIdIterator(index: number): IterableIterator<string> {
	while (index < 0xffffffffff + 1) {
		// add padding to the left
		const paddedIndex = `0000000000${index.toString(16)}`.slice(-10);
		yield paddedIndex;

		if (index === 0xffffffffff) {
			index = 0;
		}
		index++;
	}
}

const request = reqIdIterator(0);

/**
 * Generates a unique request id.
 * @returns {string}
 */
function NextRequestId(): string {
	return request.next().value;
}

export { NextRequestId, reqIdIterator };
