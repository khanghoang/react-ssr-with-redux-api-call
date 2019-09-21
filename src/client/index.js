import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { middleware as apiMiddleware, reducers as apiReducers } from 'redux-api-call';
import { Provider } from 'react-redux';

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

export { FooComponent };
