
import connect from 'connect';
import http from 'http';
import uniloc from 'uniloc';
import { default as qs } from 'qs';
import DB from './src/db';

import compression from 'compression';
import session from 'express-session';
import sessionStore from 'nedb-session-store';
import serveStatic  from 'serve-static';
import bodyParser from 'body-parser';

import routes from './src/routes';
import controllers from './src/controllers';

const PORT = process.env['PORT'] || 3000;

export default function app() {
  let server = connect();

  // gzip/deflate outgoing responses
  server.use(compression());

  // store session state server-side
  // i'm so sick of reading "session"
  let store = sessionStore(session);
  server.use(session({
    store: new store(),
    resave: false, // resaves after every access, keeps session from timing out
    saveUninitialized: false,
    secret: 'a very complex and secret secret'
  }));

  // Save authorization params to the session
  server.use(function (req, res, next) {
    let search = /\?(.+)$/.exec(req.url),
        params = qs.parse(search && search[1]),
        { code, state } = params;

    if (code && state) {
      console.log('set callbackParams', code, state)
      req.session.callbackParams = { code, state }
    }

    next();
  });

  // serve static files
  server.use(serveStatic('static'));

  // parse urlencoded request bodies into req.body
  server.use(bodyParser.urlencoded({
    extended: false
  }));

  // respond to all requests
  server.use(function(req, res, next){
    let { lookup, generate } = uniloc(routes),
        { name, options } = lookup(req.url, req.method),
        response, responseCode,
        render = ({ response, code }) => {
          console.log('rendering', req.url, code, response);
          res.writeHead(code);
          res.end(response);
        };

    console.log()
    if (typeof controllers[name] === 'function') {
      // reply returns { response, code } or a Promise which resolves to such
      let reply = controllers[name].call(this, req);

      console.log(name, 'promise?', typeof reply, reply instanceof Promise)
      // if (reply instanceof Promise) {
      if (reply.then) {
        reply.then(({ response, code }) => {
          render({ response, code });
        })
      } else {
        let {
          response = 'Internal Server Error',
          code = 500
        } = reply;

        // reply should be of shape { response, code }
        render({ response, code });
      }

    } else {
      render({
        response: 'Not Found',
        responseCode: 404
      })
    }

  })

  //create node.js http server and listen on port
  http.createServer(server).listen(PORT, () => {
    console.log('maybe listening on ', PORT);
  })
}

