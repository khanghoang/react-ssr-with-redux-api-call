import fetch from "node-fetch";
import express from "express";
import { NodeVM } from "vm2";
import jsdom from "jsdom";

const app = express();
const port = 3000;

// we cannot import those React packages here on the server side because
// only one instance of React can exist at runtime, thanks for React's
// Hooks
let React;
let ReactDOMServer;
let Provider;

/**
 * Zzzzzzzz
 *
 * @returns Promise<void>
 */
const sleep = time => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

app.get("/", async (req, res) => {
  try {
    const bundle = await fetch("http://localhost:9000/dist/bundle.js").then(
      res => {
        return res.text();
      }
    );
    const { JSDOM } = jsdom;
    const { window } = new JSDOM(`<!DOCTYPE html>`);
    const { document } = window;
    const self = window;

    const vm = new NodeVM({
      sandbox: {
        window: window,
        document: window.document,
        self: window,
        fetch: fetch
      }
    });

    // execute the bundle
    vm.run(bundle);

    // getting those stuffs from the bundle
    const { FooComponent, makeStore, waitUtilDone, HTML } = window.Foo;
    React = window.Foo.React;
    ReactDOMServer = window.Foo.ReactDOMServer;
    Provider = window.Foo.Provider;

    const store = makeStore({});
    const initRequests = await FooComponent.getInitialProps(req);
    initRequests.forEach(req => store.dispatch(req));
    await waitUtilDone(store);

    const htmlTags = ReactDOMServer.renderToString(
      <HTML initialValues={JSON.stringify(store.getState())}>
        <Provider store={store}>
          <FooComponent />
        </Provider>
      </HTML>
    );

    return res.send(htmlTags);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
