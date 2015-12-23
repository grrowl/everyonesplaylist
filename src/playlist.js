import SpotifyWebApi from 'spotify-web-api-node';

const DEBUG = true;
const PLAYLIST_TITLE = `Everybody's playlist`;

class Playlist {
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId : 'a3fef0a1ab9e4bcb911b8c7d0df8b8c7',
      clientSecret : '563d76469a4f45bd93f73d9e0e845340',
      redirectUri : 'http://playlist.chillidonut.com/'
    });
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
      });
  }

  ensureUser() {
    return this.spotifyApi.getMe()
      .then((data) => {
        this.user = data.body;

        if (DEBUG) console.log('>getMe: ', data.body);
        console.log(`Logged in! Hey ${data.body.display_name} 🚀`);
      }, (err) => {
        console.log('ensureUser: Something went wrong!', err);
      });
  }

  ensurePlaylist() {
    return this.spotifyApi.getUserPlaylists(parseUsername(this.user.uri))
      .then((data) => {
        if (DEBUG) console.log('> getUserPlaylists(me):', data.body);

        let found = false;

        // this doesn't account for paging, so we'll get 20 max (as indicated
        // by data.body.href)
        for (let playlist of data.body.items) {
          if (playlist.title == PLAYLIST_TITLE) {
            found = true;
          }
        }

        if (!found)
          return ::this.createPlaylist;

      }, (err) => {
        console.log('ensurePlaylist: Something went wrong!', err);
      });
  }

  authorize(code) {
    console.log('Authenticating with code '+ trunc(code));

    return this.spotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        let { expires_in, access_token, refresh_token } = data.body

        // console.log('The token expires in ' + data.body['expires_in']);
        // console.log('The access token is ' + data.body['access_token']);
        // console.log('The refresh token is ' + data.body['refresh_token']);

        console.log(
          `Beep beep boop ${trunc(access_token)}`,
          `01010 ${trunc(refresh_token)}`,
          `active for ${expires_in / 60} minutes`);

        // Set the access token on the API object to use it in later calls
        this.spotifyApi.setAccessToken(access_token);
        this.spotifyApi.setRefreshToken(refresh_token);

        return {
          expires_in,
          access_token,
          refresh_token
        }
      }, (err) => {
        console.log('authenticate: Something went wrong!', err);
      });
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

