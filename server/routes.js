
export const routes = {
  authorize: 'GET /api/authorize',

  session: 'GET /api/session',

  playlists: 'GET /api/playlists',
  userPlaylists: 'GET /api/playlists/me',

  publishPlaylist: 'POST /api/playlists/:user/:id/publish',
  unpublishPlaylist: 'POST /api/playlists/:user/:id/unpublish'
}

export const aliases = {
  'GET /authorize': 'authorize'
}
