
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
        unauthorized = false;

    return render(req.session);

    if (req.session && req.session.auth) {
      // do auth
      return render(req.session.auth);
    }

    return render({
      api: 'session not found i guess'
    })
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
