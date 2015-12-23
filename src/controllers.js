
import Playlist from './playlist';
import DB from './db';
import { default as qs } from 'qs';

function renderView(filename) {
  return fs.readFileSync(filename, "utf8");
}

function query(req) {
  let search = /\?(.+)$/.exec(req.url),
      params = qs.parse(search && search[1]);

  return params;
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

    console.log('get callbackParams', req.session.callbackParams);
    console.log('query?', query(req));

    if (req.session && req.session.callbackParams) {
      // do auth
      let logIn = playlist.authorize(req.session.callbackParams.code);

      return logIn.then(auth => {
        this.session.auth = auth;
        render({
          auth
        }, 201)
      })

    } else if (req.session.auth) {
      return render({
        auth: req.session.auth
      })

    } else {
      return render({
        authorizeURL: playlist.getAuthorizeURL()
      }, 401)
    }

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
