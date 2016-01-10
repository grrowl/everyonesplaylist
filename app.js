
import connect from 'connect';
import http from 'http';
import url from 'url';
import uniloc from 'uniloc';
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
    resave: false, // don't thrash the cookieStore with no-change append saves
    rolling: true, // sets cookie on every response, keeps session from timing out
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 200 // 200 days
    },
    secret: 'a very complex and secret secret'
  }));

  // Save authorization params to the session
  server.use(function (req, res, next) {
    let params = url.parse(req.url, true).query,
        { code, state } = params,
        session = req.session;

    if (params.code && params.state) {
      session.callbackParams = { code, state }
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
    let session = req.session,
        { lookup, generate } = uniloc(routes),
        { name, options } = lookup(req.url, req.method),
        response, responseCode,
        render = ({ response, code }) => {
          if (!response)
            throw new Error('Render Error: response missing')

          if (!code)
            throw new Error('Render Error: code missing');

          console.log('rendering', req.url, code, response);
          res.writeHead(code);
          res.end(response, 'utf-8');
        };

    if (typeof controllers[name] === 'function') {
      // reply returns { response, code } or a Promise which resolves to such
      let reply = controllers[name].call(this, req);

      Promise.resolve(reply)
        .then(value => {
          if (!value)
            throw new Error(`${name} resolved without value`)
          if (!response || !code)
            throw new Error(`${name} resolved without ${!response ? 'response' : 'code'}`)

          return value;
        })
        .then(({ response, code }) => {
          render({ response, code });
        })
        .catch(error => {
          let errorMessage = error.stack || error || 'Unknown error';
          console.log(`Error in controller ${name}: ${errorMessage}`);

          render({
            response: JSON.stringify({ error: String(error) }),
            code: 500
          });
        });

    } else {
      render({
        response: 'Not Found',
        code: 404
      })
    }

  })

  //create node.js http server and listen on port
  http.createServer(server).listen(PORT, () => {
    console.log('maybe listening on ', PORT);
  })
}

