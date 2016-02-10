
import url from 'url';

import Playlist from './playlist';
import DB from './db';

function renderView(filename) {
  return fs.readFileSync(filename, "utf8");
}

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

    // do auth
    return playlist.authorize(code)
      .then(auth => {
        // save auth for later
        req.session.spotifyAuth = auth

        return auth
      })
      .then(auth => {
        // bounce back to home
        return response({ '🚕': '💨', ...auth }, 302, { Location: '/' })
      })
  }

  static apiSession(req) {
    // check req.session for auth
    // if none, return auth link
    // attempt authorize
    // if fail, reutrn auth link

    let playlist = new Playlist(),
        { spotifyAuth } = req.session,
        tokenPromise = Promise.reject();

    console.log('spotifyAuth: ', spotifyAuth);

    if (spotifyAuth && spotifyAuth.code) {
      // check it works
      tokenPromise = playlist.authorize(spotifyAuth.code)

    } else if (spotifyAuth && spotifyAuth.access_token) {
      // just pass it through, should be in the shape:
      // { expires_in, access_token, refresh_token }
      tokenPromise = Promise.resolve(spotifyAuth)
    }

    return tokenPromise
      .then(spotifyAuth => {
        return response(spotifyAuth)
      })
      .catch(error => {
        return response({
          error,
          authorizeURL: playlist.getAuthorizeURL()
        }, 401)
      })
  }

  static apiPlaylist(req) {
    return response({
      api: 'apiPlaylist'
    })
  }

  static apiPlaylistCreate(req) {
    return response({
      api: 'apiPlaylistCreate'
    })
  }
}

export default Controllers;
