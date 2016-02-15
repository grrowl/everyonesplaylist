
import url from 'url';
import uniloc from 'uniloc';

import DB from './db';
import { routes, aliases } from './routes';
import controllers from './controllers';

export default function(req, res, next) {
  let session = req.session,
      { lookup, generate } = uniloc(routes, aliases),
      { name, options } = lookup(req.url, req.method),
      response, responseCode,
      render = ({ response, code, headers }) => {
        if (!response)
          throw new Error('Render Error: response missing')

        if (!code)
          throw new Error('Render Error: code missing');

        console.log('rendering', req.url, code, response, headers);
        res.writeHead(code, {
          'Content-Type': 'application/json',
          ...headers
        });
        res.end(response, 'utf-8');
      };

  if (name === undefined) {
    // didn't match any route, fall through
    next();
    return;
  }

  // this async function will become a promise, which means our handler's
  // execution will continue (and very shortly, end)
  (async function () {
    try {
      if (typeof controllers[name] !== 'function')
        throw new Error('Controller not a function');

      // reply returns { response, code } or a Promise which resolves to such
      let value = await Promise.resolve(controllers[name].call(this, req, options))

      if (!value)
        throw new Error(`${name} resolved without value`)
      if (!value.response || !value.code)
        throw new Error(`${name} resolved without ${!value.response ? 'response' : 'code'}`)

      render(value); // { response, code, headers }

    } catch (error) {
      let errorMessage = error.stack || error || 'Unknown error';
      console.log(`Error in controller ${name}: ${errorMessage}`);

      render({
        response: JSON.stringify({ error: String(error) }),
        code: 500
      });
    }
  })();

};
