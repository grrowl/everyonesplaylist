
// <https://github.com/thelinmichael/spotify-web-api-node>

import DB from './db';

class Experiment {
  constructor(api) {
    this.api = api
    this.debug = {}
    this.active = true
    this.result = "Unknown result"

    // just while we don't have proper cron support
    this.check();
  }

  // run the experiment. called on user visit
  async run() {
    throw new Error("Bad experiment");
  }

  // periodically update the database
  async check() {
    return false;
  }
}

export class MatchMaker extends Experiment {
  constructor(api) {
    super(api);

    this.options = {
      name: "MatchMaker 💘"
    }
  }

  async run() {
    let { api, options } = this,
        user = (await api.getMe()).body,
        playlists = (await api.getUserPlaylists(user.id)).body,
        playlist,
        playlistExisted = true;

    for (let thisPlaylist of playlists.items) {
      if (thisPlaylist.name == options.name) {
        playlist = thisPlaylist;
        break;
      }
    }

    if (!playlist) {
      playlist = await api.createPlaylist(user.id, options.name, { public: false });

      return {
        playlist,
        result: "Playlist created"
      }
    }

    return {
      playlist,
      result: `Playlist active ${options.name}: ${playlist.tracks.total} tracks`
    }
  }

  async check() {

  }
}

