
import connect from 'connect';
import http from 'http';
import uniloc from 'uniloc';

import compression from 'compression';
import session from 'express-session';
import serveStatic  from 'serve-static';
import bodyParser from 'body-parser';

import routes from './src/routes';
import controllers from './src/controllers';

const PORT = 3000;

export default function app() {
  let server = connect();

  // gzip/deflate outgoing responses
  server.use(compression());

  // serve static files
  server.use(serveStatic('static'));

  // store session state server-side
  server.use(session({
    resave: true, // resaves after every access, keeps session from timing out
    saveUninitialized: false,
    secret: 'a very complex and secret secret'
  }));

  // parse urlencoded request bodies into req.body
  server.use(bodyParser.urlencoded({
    extended: false
  }));

  // respond to all requests
  server.use(function(req, res){
    let { lookup, generate } = uniloc(routes),
        { name, options } = lookup(req.url, req.method),
        response, responseCode;

    if (typeof controllers[name] === 'function') {
      let reply = controllers[name].call(this, req);
      response = reply.response;
      responseCode = reply.code;

    } else {
      response = 'Not Found';
      responseCode = 404;
    }

    res.writeHead(responseCode);
    res.end(response);
  })

  //create node.js http server and listen on port
  http.createServer(server).listen(PORT)
}

