import { combineReducers } from 'redux';
import session from './session';
import experiments from './experiments';

const rootReducer = combineReducers({
  session,
  experiments
});

export default rootReducer;
