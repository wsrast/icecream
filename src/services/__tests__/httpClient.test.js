import axios from 'axios';
import send, {
	buildRequest,
	makeRequest,
	getResponse,
	delay,
} from '../httpClient';

jest.mock('axios');

// Mock console errors so that we don't see errors during test runs
global.console.error = jest.fn();
// Mock the other console methods we call so we can test for them.
global.console.info = jest.fn();
const logger = console;

let expectationsMet;
const mockedResponse = { data: 'good' };
process.env.DEV_USER = '';

describe('httpClient service', () => {
	beforeEach(() => {
		jest.resetAllMocks();
		axios.mockImplementation(
			() => new Promise(resolve => resolve(mockedResponse))
		);
		expectationsMet = jest.fn();
	});

	afterEach(() => {
		expect(expectationsMet).toBeCalled();
	});

	describe('buildApiRequest', () => {
		afterEach(() => {
			expect(logger.error).not.toBeCalled();
		});

		it('should pass through a simple GET request when passed one', () => {
			const expected = { url: 'http://example.com' };
			const actual = buildRequest({ url: 'http://example.com' });
			expect(actual).toEqual(expected);
			expectationsMet();
		});

		it('should pass through a complete POST request when passed one', () => {
			const expected = {
				url: 'http://example.com',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				data: { foo: 'bar' },
			};
			const actual = buildRequest(expected);
			expect(actual).toEqual(expected);
			expectationsMet();
		});

		it('should add a Content-Type header to a POST request that does not have one', () => {
			const expected = {
				url: 'http://example.com',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				data: { foo: 'bar' },
			};
			const actual = buildRequest({
				url: 'http://example.com',
				method: 'POST',
				data: { foo: 'bar' },
			});
			expect(actual).toEqual(expected);
			expectationsMet();
		});
	});

	describe('makeRequest', () => {
		afterEach(() => {
			expect(logger.error).not.toBeCalled();
		});

		it('should pass the request object to axios', () => {
			makeRequest({ url: 'http://example.com' }).then(response => {
				expect(axios).toHaveBeenCalledWith({ url: 'http://example.com' });
				expect(response).toEqual(mockedResponse);
				expectationsMet();
			});
		});
	});

	describe('getResponse', () => {
		afterEach(() => {
			expect(logger.error).not.toBeCalled();
		});

		it("should return the response's data", () => {
			const expected = mockedResponse.data;
			const actual = getResponse(mockedResponse);
			expect(actual).toEqual(expected);
			expectationsMet();
		});
	});

	describe('delay', () => {
		it('should return a promise', () => {
			// Change the ms value to watch it wait.
			// Jest timer mocks do not work with Promises, so we cannot programmatically
			// verify how long it is waiting.
			const ms = 1;
			return delay(ms).then(actual => {
				expect(actual).toEqual(`delay ${ms} ms`);
				expectationsMet();
			});
		});
	});

	describe('send', () => {
		it('should make a successful GET request', () => {
			return send('https://httpbin.org/get').then(response => {
				expect(response).toEqual('good');
				expect(axios).toHaveBeenCalledTimes(1);
				expect(logger.error).not.toBeCalled();
				expectationsMet();
			});
		});

		it('should recognize, log, and throw 404 errors', () => {
			const err = new Error('fail');
			err.request = 'some request object';
			err.response = {
				data: { foo: 'test data' },
				status: 404,
				statusText: 'not found',
				headers: { foo: 'test headers' },
				config: {},
				request: 'some request object',
			};
			axios.mockImplementationOnce(
				() => new Promise((resolve, reject) => reject(err))
			);
			return send('https://httpbin.org/get')
				.then(() => {})
				.catch(() => {
					expect(axios).toHaveBeenCalledTimes(1);
					expect(
						logger.error
					).toHaveBeenCalledWith(
						'Unretryable error response',
						{ foo: 'test data' },
						404,
						{ foo: 'test headers' }
					);
					expectationsMet();
				});
		});

		it('should recognize, log, and throw CORS errors', () => {
			const err = new Error('fail');
			err.request = 'some request object';
			// err.response is missing for CORS errors.  That's what makes them special.
			axios.mockImplementationOnce(
				() => new Promise((resolve, reject) => reject(err))
			);
			return send('https://httpbin.org/get')
				.then(() => {})
				.catch(() => {
					expect(axios).toHaveBeenCalledTimes(1);
					expect(logger.error).toHaveBeenCalledWith(
						'HTTP Error with no response. Is CORS configured?',
						'some request object'
					);
					expectationsMet();
				});
		});

		it('should log and throw unanticipated errors', () => {
			const err = new Error('stars misaligned');
			axios.mockImplementationOnce(
				() => new Promise((resolve, reject) => reject(err))
			);
			return send('https://httpbin.org/get')
				.then(() => {})
				.catch(() => {
					expect(axios).toHaveBeenCalledTimes(1);
					expect(logger.error).toHaveBeenCalledWith(
						'Unknown error: stars misaligned'
					);
					expectationsMet();
				});
		});
	});
});
