import { updateIn } from 'updeep';

export const SET_STATE = 'SET_STATE';

export function setState(key, payload) {
  return {
    type: SET_STATE,
    key,
    payload,
  };
}

export function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    if (action.type === SET_STATE) {
      return updateIn(action.key, action.payload, state);
    }

    return state;
  };
}
