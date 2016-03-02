import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';

// we're not accepting initialState yet so no rehydration can happen (yet)
export default function configureStore() {
  let middlewares = [ promiseMiddleware() ];

  if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger')();

    middlewares.push(logger);
  }

  // Hot reload reducers (requires Webpack HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    );
  }

  const finalCreateStore = compose(
    applyMiddleware(...middlewares),
    (typeof window === 'object' && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f),
    )(createStore);

  return finalCreateStore(rootReducer);
  // return finalCreateStore(rootReducer, initialState);, perhaps?
}
