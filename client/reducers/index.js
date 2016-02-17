import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'

import session from './session';
import playlists from './playlists';
import userPlaylists from './userplaylists';

const rootReducer = combineReducers({
  routing: routeReducer,
  session,
  playlists,
  userPlaylists
});

export default rootReducer;
