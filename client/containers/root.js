import React from 'react';
import { Provider } from 'react-redux';
import App from './app';

export default function Root(props) {
  return (
    /**
     * Provider is a component provided to us by the 'react-redux' bindings that
     * wraps our app - thus making the Redux store/state available to our 'connect()'
     * calls in component hierarchy below.
     */
    <Provider store={ props.store }>
      <App />
    </Provider>
  );
}
