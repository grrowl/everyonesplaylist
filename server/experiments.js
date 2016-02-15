
// <https://github.com/thelinmichael/spotify-web-api-node>

import DB from './db';

class Experiment {
  constructor(api) {
    this.api = api
    this.debug = {}
    this.active = true
    this.result = "Unknown result"
  }

  async run() {
    throw new Error("Bad experiment");
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
        // playlists,
        playlist,
        playlistExisted = true;

    for (playlist of playlists.items) {
      if (playlist.name == options.name) {
        break;
      }
    }

    if (!playlist) {
      playlist = await api.createPlaylist(user.id, options.name, { public: false });
      playlistExisted = false;
    }

    return {
      playlist,
      result: (
        playlistExisted
        ? `Playlist active ${options.name}: ${playlist.tracks.total} tracks`
        : "Playlist created")
    }

  }

  async doesPlaylistExist() {
    let playlists = await this.api.getUserPlaylists()
  }
}

