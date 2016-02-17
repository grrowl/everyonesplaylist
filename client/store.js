import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

import { browserHistory, createMemoryHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

export default function configureStore(initialState = {}) {
  let middlewares = [ promiseMiddleware() ];
  let reduxRouterMiddleware;

  // add routing middleware
  if (typeof window === 'undefined') {
    let location = initialState
      && initialState.routing
      && initialState.routing.location
      && initialState.routing.location.pathname;

    // server render
    if (!location)
      throw new Error('Location pathname missing during server render');

    let history = createMemoryHistory(location);
    reduxRouterMiddleware = syncHistory(history);
  } else {
    // browser render
    reduxRouterMiddleware = syncHistory(browserHistory);
  }

  if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger')();

    middlewares.push(logger);
  }

  // Hot reload reducers (requires Webpack HMR to be enabled)
  // TOOD: enable webpack HMR. :|
  // if (module.hot) {
  //   module.hot.accept('./reducers', () =>
  //     store.replaceReducer(require('./reducers'))
  //   );
  // }

  const finalCreateStore = compose(
    applyMiddleware(...middlewares),
    (typeof window === 'object' && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f),
    )(createStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (process.env.NODE_ENV === 'development') {
    // support replaying actions
    reduxRouterMiddleware.listenForReplays(store)
  }

  return store;
}
