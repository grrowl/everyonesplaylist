
class API {
  static getSession() {
    return fetch('/api/session')
      .then(result => {
        console.log('result', result);
      })
      .catch(error => {
        console.log('error', error);
      });
  }
}

(function() {

  console.log('hey bro');

  API.getSession();

  var code = document.getElementById('code'),
      state = document.getElementById('state');

  code.innerText = getQueryVariable('code');
  state.innerText = new Date(getQueryVariable('state') * 1000);

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
