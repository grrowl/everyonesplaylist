require("babel-register")({
  presets: ['es2015', 'stage-0']
});
require("babel-polyfill");

// enable async stack traces, sometimes
if (process.env.NODE_ENV !== 'production'){
  console.log('installing async stacktrace support')
  process.env.longjohn = require('longjohn');
}

// load your app
var app = require("./app.js");

app.default();

console.log('💯');
