// client/app
// bootstraps the app on the client and starts render

import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import Router, { browserHistory } from 'react-router';

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import Root from './containers/root';
import createStore from './store';
import * as Actors from './actors'

const store = createStore(/* initial state */);

// activate each actor
for (let [actorName, actor] of Object.entries(Actors)){
  actor(store);
}

ReactDOM.render(
  <Root store={ store } history={ browserHistory } />,
  document.getElementById('content')
);

console.log('hey bro');
