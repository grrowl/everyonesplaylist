import { actionTypes } from '../actions/userplaylists';

const defaultState = {
  pending: false,
  pendingIds: [],
  items: null
}

export default function userPlaylists(state = {}, action) {

  switch (action.type) {
  // fetch
  case actionTypes.FETCH_USER_PLAYLISTS_PENDING:
    return {
      ...state,
      pending: true
    };

  case actionTypes.FETCH_USER_PLAYLISTS_FULFILLED:
    return {
      ...state,
      pending: false,
      items: action.payload.items || []
    };

  case actionTypes.FETCH_USER_PLAYLISTS_FAILED:
    // silent fail, yes. (shit)
    return {
      ...state,
      pending: false
    };

  // publish/unpublish
  case actionTypes.PUBLISH_USER_PLAYLIST_PENDING:
  case actionTypes.UNPUBLISH_USER_PLAYLISTS_PENDING:
    return {
      ...state,
      // pendingIds: [...state.pendingIds, action.payload.id]
    };

  case actionTypes.PUBLISH_USER_PLAYLIST_FULFILLED:
  case actionTypes.UNPUBLISH_USER_PLAYLISTS_FULFILLED:
    return {
      ...state,
      // pendingIds: state.pendingIds.filter(id => id === action.payload.id)
    };

  default:
    return state;
  }

}
