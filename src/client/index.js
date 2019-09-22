import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { middleware as apiMiddleware, reducers as apiReducers } from 'redux-api-call';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';

import Foo, { todoAPI } from './component';

const rootReducer = combineReducers({
  ...apiReducers,
});

const middlewares = applyMiddleware(
  apiMiddleware
);

export const store = createStore(rootReducer, {}, middlewares);
export const makeStore = (initialValues = {}) => {
  return createStore(rootReducer, initialValues, middlewares);
};

export default () => {
  return (
    <Provider store={store}>
      <Foo />
    </Provider>
  );
};

const FooComponent = Foo;

FooComponent.getInitialProps = async () => {
  const { actionCreator } = todoAPI;
  return [
    actionCreator()
  ]
};

export const waitUtilDone = store => {
  return new Promise((resolve) => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const keys = Object.keys(state.api_calls);
      const firstPendingRequestIdx = keys.findIndex((k) => {
        return !state.api_calls[k].data;
      })
      if (firstPendingRequestIdx === -1) {
        unsubscribe();
        resolve();
      }
    });
  });
}


export { FooComponent };
export { ReactDOMServer };
export { React };
export { Provider };
