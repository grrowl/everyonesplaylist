
import url from 'url';
import promisify from 'promisify-node';

// <https://github.com/thelinmichael/spotify-web-api-node>
import SpotifyWebApi from 'spotify-web-api-node';

import db from './db';

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

class NoAuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoAuthError';
  }
}

// Set up api accessor with the session's token
// @param (optional): req, the request. if omitted will return unauthed api
function authedApi(req) {
  let session = req && req.session,
      auth = (session ? session.spotifyAuth : null),
      spotifyApi = new SpotifyWebApi({
        clientId: 'a3fef0a1ab9e4bcb911b8c7d0df8b8c7',
        clientSecret: '563d76469a4f45bd93f73d9e0e845340',
        redirectUri: process.env.NODE_ENV === 'development'
          ? `http://localhost:3000/authorize`
          : `http://playlist.chillidonut.com/authorize`
      });


  // throw if req was supplied but there is no token saved
  if (!auth) {
    if (req)
      throw new Error(noAuthErrorMessage);
    else
      return spotifyApi;
  }

  // auth should be in the shape:
  // { expiresIn, accessToken, refreshToken }
  spotifyApi.setAccessToken(auth.accessToken)
  spotifyApi.setRefreshToken(auth.refreshToken)

  return spotifyApi;
}

class Controllers {
  static async authorize(req) {
    // fire this before we await others
    let spotifyApi = authedApi(),
        { code, state } = queryParams(req),
        tokens = (await spotifyApi.authorizationCodeGrant(code)).body,
        { expires_in, access_token, refresh_token } = tokens,
        grantTime = parseInt(state);

    console.log(`grandTime: ${new Date(grantTime)} from ${grantTime}`);
    console.log(`Authorizing with code ${code.substr(0,10)}...${code.substr(-7)}`);

    req.session.spotifyAuth = {
      grantTime,
      authorizeTime: new Date(),
      expiresIn: expires_in,
      accessToken: access_token,
      refreshToken: refresh_token
    };

    await db.authTokens.insert(req.session.spotifyAuth);

    return response({ '🚕': '💨' }, 302, { Location: '/' })
  }

  static async session(req) {
    // check session for access token
    // if exist, validate it (getUser) and continue
    // if not or getUser fails, send authorizeURL

    try {
      let spotifyApi = authedApi(req),
          { spotifyAuth = {} } = req.session,
          user = (await spotifyApi.getMe()).body;

      // let refreshedTokens = await spotifyApi.refreshAccessToken();
      // console.log('token refreshed', refreshedTokens);
      // refreshed tokens don't save to session or database yet!

      db.authTokens.update(
        { accessToken: spotifyAuth.accessToken },
        { $inc: 'sessionCount' })

      db.users.update(
        { id: user.id },
        user, { upsert: true })

      db.users.update(
        { id: user.id },
        { $inc: 'sessionCount' });

      return response({
        auth: spotifyAuth,
        user
      });

    } catch (e) {
      // make sure we're handling a "NoAuthError" (no access_token exists)
      // or "WebapiError" (couldn't getMe(), token may have expired)
      if (e.name !== 'WebapiError' && e.name !== 'NoAuthError')
        throw e;

      let spotifyApi = authedApi(),
          scopes = [
            'playlist-read-private',
            'playlist-read-collaborative',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-library-read',
            // 'user-read-email'
          ],
          state = Date.now(),
          authorizeURL = spotifyApi.createAuthorizeURL(scopes, state)

      console.log('Error fetching session:', e.name, e.message);

      // Create the authorization URL
      return response({
        authorizeURL
      })
    }
  }

  // fetch known playlists from the DB
  static async playlists(req, options) {
    let playlists = await db.playlists.find({}).exec();

    console.log('playlists', playlists);

    if (playlists) {
      return response(playlists)
    }

    return response({
      result: "No playlists found"
    })
  }

  // fetch user playlists from spotify
  static async userPlaylists(req, options) {
    let spotifyApi = authedApi(req),
        user = (await spotifyApi.getMe()).body,
        playlists = (
          await spotifyApi.getUserPlaylists(user.id, { limit: 50 })
        ).body;

    console.log('userPlaylists', playlists);

    if (playlists) {
      return response(playlists)
    }

    return response({
      result: "No playlists found"
    })
  }
}

export default Controllers;
