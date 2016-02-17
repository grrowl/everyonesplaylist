import { combineReducers } from 'redux';
import session from './session';
import playlists from './playlists';
import { routeReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routeReducer,
  session,
  playlists
});

export default rootReducer;
