
class API {
  static getSession() {
    return fetch('/api/session', {
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(response => {
        if (response.error)
          throw Error(response.error);
        else
          return response;
      })
      .catch(error => {
        console.log('getSession error:', error);
        throw error;
      });

    return sessionPromise;
  }
  static getPlaylist() {
    return fetch('/api/playlist', {
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(response => {
        if (response.error)
          throw Error(response.error);
        else
          return response;
      })
      .catch(error => {
        console.log('getPlaylist error:', error);
        throw error;
      });

    return sessionPromise;
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

        } else if (session.callbackParamsExpired) {
          // redirect to this page without the callbackParams
          window.location.search = '';

        } else if (session.auth) {
          // check for auth object (authenticated)

          sessionStatus.classList.add('done');
          state.innerText = JSON.stringify(session.auth);

        } else {
          console.log('session idk lol', session);
          state.innerText = 'Error getting session';
        }
      })
      .catch(error => {
        let state = sessionStatus.querySelector('.state');

        state.innerText = String(error);
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
