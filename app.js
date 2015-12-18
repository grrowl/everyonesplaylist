import SpotifyWebApi from 'spotify-web-api-node';

class Playlist {
  constructor() {
    let accessToken = process.argv[2];
    console.log('init, connecting to spotify...');

    this.spotifyApi = new SpotifyWebApi({
      clientId : 'a3fef0a1ab9e4bcb911b8c7d0df8b8c7',
      clientSecret : '563d76469a4f45bd93f73d9e0e845340',
      redirectUri : 'http://chillidonut.com/junk/spotifycallback.html'
    });

    if (!accessToken)
      return this.authenticatePrompt();

    // the real desl

    this.authenticate(accessToken)
      .then(::this.ensureUser);

    ;
    // this.ensurePlaylist();

  }

  ensureUser() {
    return this.spotifyApi.getMe()
      .then((data) => {
        this.user = data.body;
        console.log('Some information about the authenticated user', data.body);
      }, (err) => {
        console.log('ensureUser: Something went wrong!', err);
      });
  }

  ensurePlaylist() {
    return this.spotifyApi.getUserPlaylists(this.user)
      .then((data) => {
        console.log('Retrieved playlists', data.body);
      }, (err) => {
        console.log('ensurePlaylist: Something went wrong!', err);
      });
  }

  authenticate(code) {
    let truncCode = code.substr(0,10) +'...'+ code.substr(-7);
    console.log('Authenticating with code '+ truncCode);

    return this.spotifyApi.authorizationCodeGrant(code)
      .then((data) => {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        this.spotifyApi.setAccessToken(data.body['access_token']);
        this.spotifyApi.setRefreshToken(data.body['refresh_token']);
      }, (err) => {
        console.log('authenticate: Something went wrong!', err);
      });
  }

  authenticatePrompt() {
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
    console.log("Visit this URL to authorize:\n")
    console.log(authorizeURL);
    console.log("")
    console.log("And re-run supplying whatever argument or whatever");
  }
}


function app() {
  let cool_sync = new Playlist();
}


export default app;

