
import url from 'url';

// <https://github.com/thelinmichael/spotify-web-api-node>
import SpotifyWebApi from 'spotify-web-api-node';

import Playlist from './playlist';
import DB from './db';

import { MatchMaker } from './experiments';

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

// Set up api accessor with the session's token
function authedApi(req) {
  let { session } = req,
      auth = (session ? session.spotifyAuth : null),
      spotifyApi = new SpotifyWebApi({
        clientId: 'a3fef0a1ab9e4bcb911b8c7d0df8b8c7',
        clientSecret: '563d76469a4f45bd93f73d9e0e845340',
        redirectUri: process.env.NODE_ENV === 'development'
          ? `http://localhost:3000/authorize`
          : `http://playlist.chillidonut.com/authorize`
      });


  if (!auth.access_token) {
    throw new Error("No auth")
  }

  // auth should be in the shape:
  // { expires_in, access_token, refresh_token }
  spotifyApi.setAccessToken(auth.access_token)
  spotifyApi.setRefreshToken(auth.refresh_token)

  return spotifyApi;
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

  static async experiment(req, options) {
    let api = authedApi(req),
        experiment;

    switch (options.name) {
      case 'matchmaker':
        experiment = new MatchMaker(api);
        break;

      default:
        throw new Error('Unknown experiment')
    }

    ;
    console.log(`experiment ${options.name}: ${JSON.stringify(experiment.debug)}`)

    return response({
      name: options.name,
      active: experiment.active,
      result: experiment.result,
      ...(await experiment.run())
    })
  }

// --- old code

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
