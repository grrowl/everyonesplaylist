
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

class Controllers {
  static authorize(req) {
    return response({ '🚕': '💨' }, 302, { Location: '/' });
  }

  static apiSession(req) {
    // check req.session for auth
    // if none, return auth link
    // attempt authorize
    // if fail, reutrn auth link

    let playlist = new Playlist(),
        authorized = false,
        sessionCreated = null; // for the reply

    console.log('req.session: ', req.session);

    // if the ?callbackParams have been set by the stupid code in server, it's
    // a stupid way to do it.
    // ugh and we have no idea if we're overwriting existing session.auth or
    // if we should be overwriting. the clinet will just keep sending these.
    // ugh fff
    if (req.session.callbackParams) {
      // do auth
      let authorizeCode = playlist.authorize(req.session.callbackParams.code)
        .then(auth => {
          // save auth for later
          req.session.auth = auth;
        })

      // stop the code from persisting
      delete req.session.callbackParams;

      return authorizeCode
    }

    if (req.session.auth) {
      return response({
        callbackConsumed,
        auth: req.session.auth
      })

    } else {
      return response({
        authorizeURL: playlist.getAuthorizeURL()
      }, 401)
    }

    return response({
      error: 'auth fell through (this shouldnt happen)',
      session: req.session
    }, 500)

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
