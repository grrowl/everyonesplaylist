
export const routes = {
  index: 'GET /',
  authorize: 'GET /authorize',

  apiSession: 'GET /api/session',

  apiPlaylist: 'GET /api/playlist',
  apiPlaylistCreate: 'POST /api/playlist'
}

export const aliases = {
  'GET /': 'index'
}
