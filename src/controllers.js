
import Playlist from './playlist';
import DB from './db';

function renderView(filename) {
  return fs.readFileSync(filename, "utf8");
}

function render(response, code = 200) {
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
    return render({
      api: 'hello'
    })
  }

  static api(req) {
    return render({
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

    if (req.session && req.session.authCallback) {
      // do auth
      console.log('? getting auth with code', req.session.authCallback.code);
      let logIn = playlist.authorize(req.session.authCallback.code);

      return logIn.then(auth => {
        this.session.auth = auth;
        authorized = true;
      })
    }
    if (playlist) {
      render({
        authorizeURL: playlist.getAuthorizeURL()
      }, 401)
    }

    return render({
      api: 'session not found i guess'
    }, 404)
  }

  static apiPlaylist(req) {
    return render({
      api: 'apiPlaylist'
    })
  }

  static apiPlaylistCreate(req) {
    return render({
      api: 'apiPlaylistCreate'
    })
  }
}

export default Controllers;
