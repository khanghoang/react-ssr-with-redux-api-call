import React from "react";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  middleware as apiMiddleware,
  reducers as apiReducers
} from "redux-api-call";
import { Provider } from "react-redux";
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";

import Foo, { todoAPI } from "./component";
import { HTML } from "./html";

const rootReducer = combineReducers({
  ...apiReducers
});

const middlewares = applyMiddleware(apiMiddleware);

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
  return [actionCreator()];
};

export const render = () => {
  const store = makeStore(window.__INITIAL_DATA__);

  // Allow the passed state to be garbage-collected
  delete window.__INITIAL_DATA__;

  ReactDOM.hydrate(
    <Provider store={store}>
      <FooComponent />
    </Provider>,
    document.getElementById('root')
  );
};

/**
 * Wait until all of the requests are done
 *
 * @returns Promise<boolean>
 */
export const waitUtilDone = store => {
  return new Promise(resolve => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      const keys = Object.keys(state.api_calls);
      const firstPendingRequestIdx = keys.findIndex(k => {
        return !state.api_calls[k].data;
      });
      if (firstPendingRequestIdx === -1) {
        unsubscribe();
        resolve();
      }
    });
  });
};

export { FooComponent };
export { ReactDOMServer };
export { React };
export { Provider };
export { HTML };
