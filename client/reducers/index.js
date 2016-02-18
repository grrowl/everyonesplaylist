import { combineReducers } from 'redux';
import { locationReducer } from 'redux-history';

import session from './session';
import playlists from './playlists';
import userPlaylists from './userplaylists';

const rootReducer = combineReducers({
  location: locationReducer,
  session,
  playlists,
  userPlaylists
});

export default rootReducer;
