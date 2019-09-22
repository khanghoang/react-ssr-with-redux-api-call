## React Server Side Rendering with Redux-API-call

### The Server-Client contract
* Server and client use the same babelrc.
* Client exposes Root Component, create store function.
* Client bundle with only one chunk.
* All the inital requests are returned by the ``RootComponent.getInitialProps``

### Run the project
* Install dependencies by `npm install`
* Start dev server by `npm run dev`
* Start webpack with `npm run webpack`
* Go to `http://localhost:3000`

### Read more
* `https://odino.org/eval-no-more-understanding-vm-vm2-nodejs/`
