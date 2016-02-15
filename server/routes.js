
export const routes = {
  authorize: 'GET /api/authorize',

  session: 'GET /api/session',

  experiment: 'GET /api/experiment/:name',

  playlist: 'GET /api/playlist',
  playlistCreate: 'POST /api/playlist'
}

export const aliases = {
  'GET /authorize': 'authorize'
}
