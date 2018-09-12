import { updateIn, constant } from 'updeep';

export const SET_STATE = 'SET_STATE';
export const MERGE_STATE = 'MERGE_STATE';

export function setState(key, payload) {
  return {
    type: SET_STATE,
    key,
    payload,
  };
}

export function mergeState(key, payload) {
  return {
    type: MERGE_STATE,
    key,
    payload,
  };
}

export function createReducer(initialState) {
  return function reducer(state = initialState, action) {
    switch (action.type) {
      case SET_STATE:
        return updateIn(action.key, constant(action.payload), state);
      case MERGE_STATE:
        return updateIn(action.key, action.payload, state);
      default:
        return state;
    }
  };
}
