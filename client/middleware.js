
// client/middleware
// pre-renders the app on the server

import React from 'react';
import ReactDOM from 'react-dom/server'; // middleware is server
import { match, createMemoryHistory } from 'react-router';

import createStore from './store';
import Root from './containers/root';
import Document from './containers/document';

export default function clientMiddleware(req, res) {
  // create store
  const store = createStore({}, req);

  // render page
  let html = ReactDOM.renderToString(
    <Root
      store={ store }
      history={ createMemoryHistory(req.url) } />
  );

  // return inside document
  const documentHtml = '<!doctype html>' + ReactDOM.renderToStaticMarkup(
    <Document content={ html } store={ store } />
  );

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(documentHtml, 'utf-8');
}
