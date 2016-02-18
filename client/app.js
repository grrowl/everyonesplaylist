// client/app
// bootstraps the app on the client and starts render

import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';

import { connectHistory } from 'redux-history';
import { createHistory, useQueries } from 'history';

import Root from './containers/root';
import createStore from './store';
import * as Actors from './actors'

const store = createStore();

const history = useQueries(createHistory)();
const unconnectHistory = connectHistory(history, store);

// activate each actor
for (let [actorName, actor] of Object.entries(Actors)){
  actor(store);
}

ReactDOM.render(
  <Root store={ store } history={ history } />,
  document.getElementById('content')
);

console.log('hey bro');
