import { combineReducers } from 'redux';
import session from './session';
import playlist from './playlist';
import experiments from './experiments';

const rootReducer = combineReducers({
  session,
  playlist,
  experiments
});

export default rootReducer;
