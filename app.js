
import "babel-polyfill";

import connect from 'connect';
import http from 'http';

import compression from 'compression';
import session from 'express-session';
import sessionStore from 'nedb-session-store';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';

import clientMiddleware from './client/middleware.js'
import serverMiddleware from './server/middleware.js'

const PORT = process.env['PORT'] || 3000;

export default function app() {
  let server = connect();

  // gzip/deflate outgoing responses
  server.use(compression());

  // store session state server-side
  server.use(session({
    store: new sessionStore(session)(),
    resave: false, // don't thrash the cookieStore with no-change append saves
    rolling: true, // sets cookie on every response, keeps session from timing out
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 200 // 200 days
    },
    secret: '07123e1f482356c415f684407a3b8723e10b2cbbc0b8fcd6282c49d37c9c1abc'
  }));

  // serve static files
  server.use(serveStatic('static'));

  // parse urlencoded request bodies into req.body
  server.use(bodyParser.urlencoded({
    extended: false
  }));

  // respond to api requests and handle /api 404s
  server.use(serverMiddleware)

  // respond to page requests and handle other 404s
  server.use(clientMiddleware)

  //create node.js http server and listen on port
  http.createServer(server).listen(PORT, () => {
    console.log('maybe listening on ', PORT);
  })
}

