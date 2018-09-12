import { createReducer, setState, mergeState } from '../src';

describe('mergeState', () => {
  test('merging a simple key', () => {
    const initialState = {
      location: {
        country: 'USA',
        state: 'CA',
        city: 'San Francisco',
      },
    };
    const reducer = createReducer();
    const action = mergeState('location.city', 'Los Angeles');
    expect(reducer(initialState, action)).toEqual({
      location: {
        country: 'USA',
        state: 'CA',
        city: 'Los Angeles',
      },
    });
  });

  test('merging nested keys', () => {
    const initialState = {
      foos: {
        11: {
          bars: {
            23: { id: 23, name: 'bar23' },
          },
        },
      },
    };
    const reducer = createReducer();
    const action = mergeState('foos.11.bars.24', { id: 24, name: 'bar24' });
    expect(reducer(initialState, action)).toEqual({
      foos: {
        11: {
          bars: {
            23: { id: 23, name: 'bar23' },
            24: { id: 24, name: 'bar24' },
          },
        },
      },
    });
  });
});

describe('setState', () => {
  test('setting a simple key', () => {
    const initialState = {};
    const reducer = createReducer();
    const action = setState('location', {
      country: 'USA',
      state: 'CA',
      city: 'Los Angeles',
    });
    expect(reducer(initialState, action)).toEqual({
      location: {
        country: 'USA',
        state: 'CA',
        city: 'Los Angeles',
      },
    });
  });

  test('overwriting an entire value', () => {
    const initialState = {
      foos: {
        11: {
          bars: {
            23: { id: 23, name: 'bar23' },
            24: { id: 24, name: 'bar24' },
          },
        },
      },
    };
    const reducer = createReducer();
    const action = setState('foos.11.bars', {
      23: { id: 23, name: 'bar23' },
    });
    expect(reducer(initialState, action)).toEqual({
      foos: {
        11: {
          bars: {
            23: { id: 23, name: 'bar23' },
          },
        },
      },
    });
  });
});
