
import url from 'url';

import Playlist from './playlist';
import DB from './db';

function response(response, code = 200, headers) {
  try {
    response = JSON.stringify(response)
  } catch (e) {}

  return {
    response,
    code,
    headers
  };
}

function queryParams(req) {
  return url.parse(req.url, true).query
}

class Controllers {
  static authorize(req) {
    let playlist = new Playlist(),
        { code, state } = queryParams(req)

    // transform the auth callback's code into a real access_token
    return playlist.authorize(code)
      .then(token => {
        // save token for later
        req.session.spotifyAuth = token

        return token
      })
      .then(() => {
        // bounce back to home
        return response({ '🚕': '💨' }, 302, { Location: '/' })
      })
  }

  static async session(req) {
    // check session for access token
    // if exist, validate it (getUser) and continue
    // if not or getUser fails, send authorizeURL

    let playlist = new Playlist(req.session),
        { spotifyApi } = playlist;

    // short-circuit if we have no auth
    // this is a bit hacky -- fucks the seperation of concerns between
    // this controller and playlist (which shouldn't have to deal with the
    // session implementation directly ugh)
    if (!req.session.spotifyAuth) {
      return response({
        authorizeURL: playlist.getAuthorizeURL()
      })
    }

    // Attempt validation of token
    try {
      // await spotifyApi.refreshAccessToken();

      let user = (await spotifyApi.getMe()).body;

      return response({
        user
      });

    } catch (error) {
      console.log('spotifyAuth: failed', error);

      // returns a non-error (such as 401) status code since the frontend
      // is intended to consume the response (and display authURL)
      return response({
        error,
        authorizeURL: playlist.getAuthorizeURL()
      })
    }
  }

  static async playlist(req) {
    // `playlist0` is a terrible shitty hack while we refactor
    let playlist0 = new Playlist(req.session),
        { spotifyApi } = playlist0,
        user = (await spotifyApi.getMe()).body;

    console.log('a user?', user);

    // get the current user
    // if good,

    return spotifyApi.getUserPlaylists(user.id)
      .then(data => {
        console.log('> getUserPlaylists(me):', data.body);

        let found = false;

        // this doesn't account for paging, so we'll get 20 max (as indicated
        // by data.body.href)
        for (let playlist0 of data.body.items) {
          if (playlist0.title == PLAYLIST_TITLE) {
            found = true;
          }
        }

        if (!found)
          return ::this.createPlaylist;

      }, (err) => {
        console.log('ensurePlaylist: Something went wrong!', err);
        throw err; // rethrow error
      });

    return response({
      api: 'apiPlaylist'
    })
  }

  static playlistCreate(req) {
    return response({
      api: 'apiPlaylistCreate'
    })
  }
}

export default Controllers;
