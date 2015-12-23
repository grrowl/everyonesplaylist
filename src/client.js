
class API {
  static getSession() {
    return fetch('/api/session')
      .then(response => response.json())
      .catch(error => {
        console.error('getSession error:', error);
        return error;
      });
  }
}

(function() {

  console.log('hey bro');

  API.getSession()
    .then(session => {
      console.info('session got', session);
      if (session.authorizeURL) {
        authorizeLink.href = session.authorizeURL;
        authorizeLink.innerText = 'Authorize with Spotify';
      }
      // code.innerText = JSON.stringify(session);
    })
    .catch(result => {
      console.error('session result', result);
    })

  // code.innerText = getQueryVariable('code');
  // state.innerText = new Date(getQueryVariable('state') * 1000);

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
