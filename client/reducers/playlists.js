import { actionTypes } from '../actions/playlists';

export default function playlists(state = {}, action) {
  let name = action && action.payload && action.payload.name;

  switch (action.type) {
  case actionTypes.FETCH_PLAYLISTS_PENDING:
    return {
      ...state,
      [name]: {
        pending: true
      }
    };

  case actionTypes.FETCH_PLAYLISTS_FULFILLED:
    return {
      ...state,
      [name]: {
        ...action.payload,
        pending: false
      }
    };

  case actionTypes.FETCH_PLAYLISTS_FAILED:
    return {
      ...state,
      [name]: {
        pending: false,
        ...action.payload
      }
    };

  default:
    return state;
  }

}
