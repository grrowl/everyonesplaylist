import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

import { browserHistory, createMemoryHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

// @param initialState (object): state of the store
// @param req (object): server request object. only for server rendering.
export default function configureStore(initialState = {}, req) {
  let middlewares = [ promiseMiddleware() ];
  let reduxRouterMiddleware;

  // add routing middleware
  if (typeof window === 'undefined') {
    // server render
    if (!req)
      throw new Error('Request missing during server render');

    let history = createMemoryHistory(req.url);
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
