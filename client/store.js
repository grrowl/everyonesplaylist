import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger')();

    middlewares.push(logger);
  }

  // Hot reload reducers (requires Webpack HMR to be enabled)
  // TOOD: enable webpack HMR. :|
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers'))
    );
  }

  const store = compose(
    applyMiddleware(...middlewares),
    (typeof window === 'object' && window.devToolsExtension
      ? window.devToolsExtension()
      : f => f)
  )(createStore)(rootReducer);

  return store;
}
