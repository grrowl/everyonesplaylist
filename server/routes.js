
export const routes = {
  authorize: 'GET /api/authorize',

  session: 'GET /api/session',

  playlists: 'GET /api/playlists',
  userPlaylists: 'GET /api/playlists/me',
  addPlaylist: 'POST /api/playlists/me',

  experiment: 'GET /api/experiment/:name'
}

export const aliases = {
  'GET /authorize': 'authorize'
}
