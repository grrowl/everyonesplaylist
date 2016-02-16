# everyone's playlist

## development

Server: `npm run` or `npm run dev`
Client: `npm run client` or `webpack --progress --watch`

## to do

* periodic tasks to:
  * refresh user's `access_token`s with their `refresh_token`s before they expire
  * run each active experiment, update playlists and databases

* small-scale experiment, proof-of-concept (1-5 users range)
  * super-charged collaborative playlists
  * lovers collaborative playlist
  * playlist publishing (would be nice to have its own route for public display)

* getPlaylists in experiements return max 20 results. need to implement paging

* react router, or any front-end routes implementation; for linking to individal
  playlists or experiments

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
- experiments.js are experiments fired by the `experiment` controller


## credits

We've adapted much of the bootstrapping code from the wonderful
simple-redux-boilerplate repo.
