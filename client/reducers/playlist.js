import { actionTypes } from '../actions/session';

export default function playlist(state = [], action) {
  switch (action.type) {
  case actionTypes.FETCH_PLAYLIST_FULFILLED:
    return state = { ...state, ...action.payload };

  default:
    return state;
  }
}
