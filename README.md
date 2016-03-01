# everyone's playlist

## development

Server: `npm run` or `npm run dev`
Client: `npm run client` or `webpack --progress --watch`

## to do

* [immediate] "discoverable playlists" by default
  1. visit site, must be authed
  2. list all playlists tracked on-site (from db.playlists) along with metadata
      and discovery tools
  3. "play" "follow" this playlist

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

* descriptions and auto-tagging
  * mine for the most commonly occurring words and synonyms, they become the
    tags
  * piror art: the playlist miner

* on-site favourites/likes/follows.
  * check feasability a user experience like soundcloud. browse around, find
    something you're in the mood for, hit play and it goes forever (finish one
    playlist starts a related playlist). users' like data helps enable this, as
    well as description tagging, above.

### lower-level priority

* `client/store.js` supports hot-reloading. add support for starting the HMR
  server (in app.js, when dev)

* the Buttons are naff. make them cooler, emojiStatus style.
  <https://www.youtube.com/watch?v=ryOR-lU6x7E>

* all playlists are public. therefore anyone can publish any playlist (even though
  following it first). so anyone could unpublish any playlist. I guess we can
  just disable unpublish, or have a specific "undo" (i like this)

* cross-browser/OS test, emoji font support is all over the place. shim for
  images?

## terms

* "follow playlist": Spotify user follows a playlist to view it a lot.
* "publish playlist": Application tracks a playlist.

## directional musings

Overall "press butan[s], get music".

* aim: get locally published playlists: is only "published" playlists from people
    on-site.
* aim: "Search public playlists"
  * get public spotify playlists: broad! but we can only rely on the title.
* aim: "radio-like experience"
  * spotify radio sucks: it picks a few hot artists from your playlist, picks
    a few similar artists, and puts their popular songs in the mix. it's not
    representative of the playlist mood as a whole
  * if playlist A is a [set^a], and playlist B is a [set^b], and those sets
    have significant overlap, then it would seem [set^b]'s songs may be
    similar to the "feel" of [set^a]
  * kind of a reverse playlist miner
* aim: interesting "discovery" or "similarity network" ui? (d3-like?)
  * prior art <http://www.billdwhite.com/wordpress/2013/12/02/d3-force-layout-with-pan-and-zoom-minimap/>
  * force graph examples <http://bl.ocks.org/mbostock/1080941> <http://bl.ocks.org/mbostock/1021841>
  * radar overlay chart <http://bl.ocks.org/nbremer/6506614> (axis could be
    artists, graph could be playlists)

* social discovery and collaboration
  * how to enable interaction on the same playlist or music "topic"
    * last.fm seemed to have a vibrant community, but how ?
    * sidenote last.fm is dope again and plays songs from the UI! (no "are you
      sure you want to follow links" thing either)

* Collaborative playlists exist and are nice but a bit shit to follow and stuff.
  * maybe it'd be nice to have a "preview" page with a big fat "follow playlist"
    button

* playlist miner is really nice. it does it's own thing for sure.

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

There's a bit of swearing in the places that need improvement. Watch out if you're not a fan of it.
