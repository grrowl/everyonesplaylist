import SpotifyWebApi from 'spotify-web-api-node';

const PLAYLIST_TITLE = `Everybody's playlist`;

class Playlist {
  constructor(session) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: 'a3fef0a1ab9e4bcb911b8c7d0df8b8c7',
      clientSecret: '563d76469a4f45bd93f73d9e0e845340',
      redirectUri: process.env.NODE_ENV === 'development'
        ? `http://localhost:3000/authorize`
        : `http://playlist.chillidonut.com/authorize`
    });

    if (session && session.spotifyAuth)
      this.setSession(session.spotifyAuth);
  }

  setSession(auth) {
    // auth should be in the shape:
    // { expires_in, access_token, refresh_token }
    if (!auth || !auth.access_token)
      return false;

    this.spotifyApi.setAccessToken(auth.access_token)
    this.spotifyApi.setRefreshToken(auth.refresh_token)
  }

  createPlaylist() {
    return this.spotifyApi.createPlaylist(
        parseUsername(this.user.uri),
        PLAYLIST_TITLE,
        { 'public' : false }
      )
      .then(function(data) {
        console.log(`Created ${PLAYLIST_TITLE} playlist!'`);
      }, function(err) {
        console.log('createPlaylist: Something went wrong!', err);
        throw err; // rethrow error
      });
  }

  getUser() {
    throw new Error('depreciated');
  }

  authorize(code) {
    console.log('Authorizing with code '+ trunc(code));

    return this.spotifyApi.authorizationCodeGrant(code)
      .then(data => {
        let { expires_in, access_token, refresh_token } = data.body

        // Set the access token on the API object to use it in later calls
        this.spotifyApi.setAccessToken(access_token);
        this.spotifyApi.setRefreshToken(refresh_token);

        return {
          expires_in,
          access_token,
          refresh_token
        }
      })
  }

  getAuthorizeURL() {
    var scopes = [
          'playlist-read-private',
          'playlist-read-collaborative',
          'playlist-modify-public',
          'playlist-modify-private',
          'user-library-read',
          // 'user-read-email'
        ],
        state = Date.now();

    // Create the authorization URL
    var authorizeURL = this.spotifyApi.createAuthorizeURL(scopes, state);

    // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
    return authorizeURL;
  }
}

// Utility methods

function parseUsername(uri) {
  return /^spotify:user:(.+)$/.exec(uri)[1];
}

function trunc(code) {
  return code.substr(0,10) +'...'+ code.substr(-7);
}


export default Playlist;

