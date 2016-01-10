
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

    if (req.session && req.session.callbackParams) {
      // do auth
      let authorizeSession = playlist.authorize(req.session.callbackParams.code);

      return authorizeSession.then(auth => {
        // save auth for later
        req.session.auth = auth;

        return response({
          auth
        }, 201);
      }).catch(error => {
        if (error.message.match(/^invalid_grant\W/)) {
          // auth code was invalid, erase it from the store for next reload
          delete req.session.callbackParams;
        }

        throw error;
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

    response({
      error: 'auth fell through'
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
