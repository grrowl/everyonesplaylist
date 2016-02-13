import { combineReducers } from 'redux';
import session from './session';
import playlist from './playlist';

const rootReducer = combineReducers({
  session,
  playlist
});

export default rootReducer;
