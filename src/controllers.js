
import Playlist from './playlist';
import DB from './db';

function renderView(filename) {
  return fs.readFileSync(filename, "utf8");
}

function response(response, code = 200) {
  try {
    response = JSON.stringify(response)
  } catch (e) {}

  return {
    response,
    code
  };
}

class Controllers {
  static index(req) {
    return response({
      api: 'hello'
    })
  }

  static api(req) {
    return response({
      api: 'hello'
    })
  }

  static apiSession(req) {
    // check req.session for auth
    // if none, return auth link
    // attempt authorize
    // if fail, reutrn auth link

    let playlist = new Playlist(),
        authorized = false;

    console.log('req.session: ', req.session);

    if (req.session.callbackParams) {
      // do auth
      let authorizeSession = playlist.authorize(req.session.callbackParams.code);

      return authorizeSession.then(auth => {
        // use the code up
        delete req.session.callbackParams;

        // save auth for later
        req.session.auth = auth;

        return response({
          callbackParamsExpired: true,
          auth
        }, 201);
      })

    } else if (req.session.auth) {
      return response({
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
