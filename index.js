require("babel-register");

// enable async stack traces, sometimes
if (process.env.NODE_ENV !== 'production'){
  var longjohn = require('longjohn');
}

// load your app
var app = require("./app.js");

app.default();

console.log('💯');
