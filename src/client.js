
require("babel-polyfill");

function request(path) {
  return fetch(`/api/${path}`, {
      credentials: 'same-origin'
    })
    .then(response => response.json())
    // .then(response => {
    //   if (response.error)
    //     throw new Error(response.error);
    //   else
    //     return response;
    // })
    .catch(error => {
      console.log('api error:', error);
      throw error;
    });
}


class API {
  static getSession() {
    return request('session');
  }

  static getPlaylist() {
    return request('playlist');
  }
}

class Handlers {
  static session() {
    let sessionStatus = document.querySelector('#sessionStatus');

    return API.getSession()
      .then(session => {
        let authorizeLink = sessionStatus.querySelector('.authorizeLink'),
            state = sessionStatus.querySelector('.state');

        // Check for authorizeURL (not authed yet)
        if (session.authorizeURL) {
          authorizeLink.href = session.authorizeURL;
          authorizeLink.innerText = 'Authorize with Spotify';
          state.innerText = 'Waiting for callback';

        } else if (session.user) {
          // check for auth object (authenticated)

          console.log('welcome', session.user);
          sessionStatus.classList.add('done');
          state.innerText = JSON.stringify(`Sup ${session.user.display_name}`);
        }
      })
      .catch(error => {
        let authorizeLink = sessionStatus.querySelector('.authorizeLink'),
            state = sessionStatus.querySelector('.state'),
            // { error, authorizeURL } = response;
            authorizeURL,
            error = response;

        state.innerText = String((error && error.message) || error);

        if (authorizeURL) {
          authorizeLink.href = authorizeURL;
          authorizeLink.innerText = 'Authorize with Spotify';
        }
      })
  }

  static playlist() {
    let playlistStatus = document.querySelector('#playlistStatus');

    API.getPlaylist()
      .then(playlists => {
        let exist = playlistStatus.querySelector('.exist');
        exist.innerText = JSON.stringify(playlists);
      })
      .catch(error => {
        let exist = playlistStatus.querySelector('.exist');
        exist.innerText = String(error);
      })
  }
}

(function() {

  console.log('hey bro');

  Promise.resolve()
    .then(Handlers.session)
    .then(Handlers.playlist)
    .then(value => {
      console.log('done', value);
    })


  function getQueryVariable(variable)
  {
     var query = window.location.search.substring(1);
     var vars = query.split("&");
     for (var i=0;i<vars.length;i++) {
       var pair = vars[i].split("=");
       if (pair[0] == variable){
        return pair[1];
      }
     }
     return(false);
  }

})();
