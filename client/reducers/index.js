import { combineReducers } from 'redux';
import { locationReducer } from 'redux-history';

import session from './session';
import playlists from './playlists';

const rootReducer = combineReducers({
  location: locationReducer,
  session,
  playlists
});

export default rootReducer;
