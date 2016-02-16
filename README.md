# everyone's playlist

## development

Server: `npm run` or `npm run dev`
Client: `npm run client` or `webpack --progress --watch`

## to do

* [immediate] "discoverable playlists" by default
  1. visit site, must be authed
  2. list all playlists tracked on-site (from db.playlists) along with metadata
      and discovery tools
  3. "play this playlist"

* periodic tasks to:
  * refresh user's `access_token`s with their `refresh_token`s before they expire
  * run each active experiment, update playlists and databases

* small-scale experiment, proof-of-concept (1-5 users range)
  * super-charged collaborative playlists
  * lovers collaborative playlist
  * playlist publishing (would be nice to have its own route for public display)

* add spotify developer terms-of-use things
  * "log in with spotify" styling <https://developer.spotify.com/design/>
  * add "not affiliated or endorsed by spotify"
  * <https://developer.spotify.com/developer-terms-of-use/>
    * pre-launch requirements
    * V.8. "You must provide all users with a working mechanism to disconnect their Spotify Account from your application at any time and provide clear instructions on how to do so. [...] you agree to delete and no longer request or process any of that Spotify user’s data."
    * V.10. "You must have an end user agreement and privacy policy."

* getPlaylists in experiements return max 20 results. need to implement paging helper methods

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
