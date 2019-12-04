import React from 'react';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';
import { createAction, handleActions } from 'redux-actions';
import useAsyncReducer from '../useAsyncReducer';

// Mock the error console in order to swallow the act() warnings
global.console.error = jest.fn();

const increment = createAction('INCREMENT');
const defaultRoute = '/testAsync';
const testAsync = createAction(
	'TEST_ASYNC',
	undefined,
	(route = defaultRoute) => ({ api: { route } })
);
const setTestValue = createAction('SET_TEST_VALUE');

// default values
const defaults = {
	count: 0,
	testValue: 'test value',
};

// reducers
const reducers = handleActions(
	{
		// reducerMap
		[increment](state) {
			return { ...state, count: state.count + 1 };
		},
		[setTestValue](state, { payload }) {
			return { ...state, testValue: payload };
		},
		// more reducers,
	},
	// The default state
	defaults
);

const asyncHandler = async (dispatch, action) => {
	const {
		meta: { api },
	} = action;
	await setTimeout(() => {}, 100);
	dispatch(setTestValue(api.route));
};

describe('useAsyncReducer Hook', () => {
	let TestComponent;

	beforeEach(() => {
		// eslint-disable-next-line react/prop-types
		TestComponent = ({ callback = () => {} }) => {
			const [state, dispatch] = useAsyncReducer(
				reducers,
				defaults,
				asyncHandler
			);
			callback(state, dispatch);
			return (
				<>
					<button
						type="button"
						onClick={() => dispatch(testAsync())}
						data-testvalue={state.testValue}
					>
						setTestValue
					</button>
					<button
						type="button"
						onClick={() => dispatch(increment())}
						data-testcount={state.count}
					>
						TestClick
					</button>
				</>
			);
		};
	});

	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
	});

	it('should return state, and dispatch functions', () => {
		const testHook = (state, dispatch) => {
			expect(state).not.toBeNull();
			expect(dispatch).not.toBeNull();
			expect(typeof state).toBe('object');
			expect(typeof dispatch).toBe('function');
		};
		render(<TestComponent callback={testHook} />);
	});

	it('should use defaults for optional arguments', () => {
		const TestComponentDefaults = ({ callback }) => {
			const ret = useAsyncReducer(reducers);
			callback(ret);
			return <div />;
		};

		const testHook = ([state, dispatch]) => {
			expect(state).not.toBeNull();
			expect(dispatch).not.toBeNull();
			expect(typeof state).toBe('object');
			expect(typeof dispatch).toBe('function');
		};
		render(<TestComponentDefaults callback={testHook} />);
	});

	it('should handle state normally when not async', () => {
		const { getByText } = render(<TestComponent />);
		const div = getByText(/TestClick/i);
		expect(div.getAttribute('data-testcount')).toBe('0');
		fireEvent.click(div);
		expect(div.getAttribute('data-testcount')).toBe('1');
	});

	it('should handle async dispatches', async () => {
		const { getByText } = render(<TestComponent />);
		const div = getByText(/setTestValue/i);
		expect(div.getAttribute('data-testvalue')).toBe(defaults.testValue);
		fireEvent.click(div);
		await wait(() => {
			expect(div.getAttribute('data-testvalue')).toBe(defaultRoute);
		});
	});
});
