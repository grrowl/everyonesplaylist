import SpotifyWebApi from 'spotify-web-api-node';

const DEBUG = true;

class Playlist {
  constructor() {
    console.log('init, 🔥  connecting to spotify...');

    this.spotifyApi = new SpotifyWebApi({
      clientId : 'a3fef0a1ab9e4bcb911b8c7d0df8b8c7',
      clientSecret : '563d76469a4f45bd93f73d9e0e845340',
      redirectUri : 'http://chillidonut.com/junk/spotifycallback.html'
    });

    this.authenticatePrompt()
      .then(code => {
        console.log('\nThanks 🍕');
        return code;
      })
      .then(::this.authenticate)
      .then(::this.ensureUser)
      .then(::this.ensurePlaylist);

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
    let username = /^spotify:user:(.+)$/.exec(this.user.uri)[1];

    return this.spotifyApi.getUserPlaylists(username)
      .then((data) => {
        if (DEBUG) console.log('> getUserPlaylists(me):', data.body);
      }, (err) => {
        console.log('ensurePlaylist: Something went wrong!', err);
      });
  }

  authenticate(code) {
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
    console.log("Paste the full code you recieve in here and press Enter:");

    return getInput();
  }
}

// Utility methods

function trunc(code) {
  return code.substr(0,10) +'...'+ code.substr(-7);
}

// getInput adapted from <https://github.com/cymen/node-promise-example>
var getInput = function() {
  return new Promise(function(resolve, reject) {
    var input = '';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
      input += chunk;

      // If input is Enter
      if (chunk.indexOf('\n') != -1) {
        input = input.replace('\n', '');
        process.stdin.pause();
        resolve(input);
      }
    });
  });
};


function app() {
  let cool_sync = new Playlist();
}


export default app;

