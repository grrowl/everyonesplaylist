require("babel-register")();
require("babel-polyfill");
require("css-modules-require-hook");

// enable async stack traces, sometimes
if (process.env.NODE_ENV === 'development'){
  process.env.longjohn = require('longjohn');
  console.log('👍  async stacktrace supported')
}

// load your app
var app = require("./app.js");

app.default();

console.log('💯');
