import fetch from 'node-fetch';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

global.fetch = fetch;

import { getInitialProps, FooComponent, makeStore } from '../client';

const app = express();
const port = 3000;

/**
 * Zzzzzzzz
 *
 * @returns Promise<void>
 */
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

/**
 * Wait until all of the requests are done
 *
 * @returns Promise<boolean>
 */
const waitUtilDone = store => {
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

app.get('/', async (_, res) => {
  const store = makeStore({});
  getInitialProps().forEach(store.dispatch);
  await waitUtilDone(store);
  const str = ReactDOMServer.renderToString(
    <Provider store={store}>
      <FooComponent />
    </Provider>
  );
  return res.send(str);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
