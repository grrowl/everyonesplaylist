import { combineReducers } from 'redux';
import session from './session';
import playlists from './playlists';

const rootReducer = combineReducers({
  session,
  playlists
});

export default rootReducer;
