# everyone's playlist

## development

Server: `forever index.js --watch`
Client: `npm run watch` or `webpack --progress --watch`

## to do

* it would be nice to implement redux and a simple router so the ui can
  actually progress. just on the client. serve index.html for all matching
  requests (add them to routes.js) (gotta finish redux)

* getPlaylists in experiements return max 20 results. need to implement paging


* ~~`req.callbackParams` will be set as long as there's things in the URL, but
  those params will only work for one auth -- we need to redirect the user back
  to `/` when they're validated~~


### dumb-level priority

* `client/store.js` supports hot-reloading. add support for starting the HMR
  server (in app.js, when dev)

## application structure

### server

- app.js is terrible but handles the lower-level piping
- routes.js defines the routes, which app.js will call from:
- controllers.js defines the controllers. MUST respond with something that
  resolves to a `{ response, code }`-shaped object (either object itself or a
  promise which resolves to the value)


## credits

We've adapted much of the bootstrapping code from the wonderful
simple-redux-boilerplate repo.
