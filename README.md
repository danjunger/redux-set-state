Redux Set State
=============

A generic reducer and action creator for Redux.

```js
yarn add @djunger02/redux-set-state
```

## What is it?

This package provides a generic reducer function and its associated action creator.


## Motivation

Redux is great, and I'm a big fan of it, but some folks get very tired of creating distinct actions and their corresponding reducer cases for every interaction in your app.  For example, I have seen many projects that have many action creators that look like these:

```js
const TOGGLE_THING = 'TOGGLE_THING'
function toggleThing() {
  return {
    type: TOGGLE_THING
  }
}
```

```js
const INCREMENT_COUNTER = 'INCREMENT_COUNTER'
function increment() {
  return {
    type: INCREMENT_COUNTER
  }
}
```

```js
const LOGIN_USER = 'LOGIN_USER'
function login(userMeta) {
  return {
    type: LOGIN_USER,
    payload: userMeta
  }
}
```

These actions are highly specific and not re-usable, so they quickly accumulate and generate a lot of cruft.  However, what they all have in common is that they each want to set a piece of data to a specific part of the Redux store.  This module provides a single reducer and action creator that can be used for all of these cases and many more.


## Do I Need This?

If you’re not sure whether you need it, you probably don’t.  If you're tired of creating unique action creators and reducer cases for every action in your app, give it a try.


## Installation

```
yarn add @djunger02/redux-set-state
```

Then, add the reducer to your app:

```js
import { createStore } from 'redux';
import { createReducer } from '@djunger02/redux-set-state';

const initialState = {
  todos: {},
  isLoggedIn: false
};
const reducer = createReducer(initialState);
const store = createStore(
  reducer,
  /* applyMiddleware(...) */
);
```

Then, whenever you have a need to update a part of the store, use the provided action creator:

```js
dispatch(setState('isLoggedIn', true)); // set the top level property 'isLoggedIn' to true
dispatch(setState('user', { email: 'user@example.com', name: 'Jane User' })); // merge the email and name properties onto the user object
dispatch(setState('models', { '3': {id: 3, ...}, '4': {id: 4, ...} })); // merge a number of models into the store
dispatch(setState('models.3', { id: 3, ... })); // merge/overwrite a single model into the store
dispatch(setState('foos.3.bars.4', { id: 3, ... })); // merge/overwrite a single nested model into the store

```

## Caveats

This module works best if you avoid using arrays in your store data structure because then you would have to care about array indexes while merging data.  The reducer uses the excellent library [updeep](https://github.com/substantial/updeep) to perform immutable updates to your store object.  Updeep handles deeply nested merges, so you never have to worry about whether part of your store path exists or not!


## License

MIT
