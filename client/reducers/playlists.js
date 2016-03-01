import { actionTypes } from '../actions/playlists';

const defaultState = {
  pending: false,
  items: null
}

export default function playlists(state = {}, action) {
  // Reducer replaces `.items` wholesale with the action's result

  switch (action.type) {
  case actionTypes.FETCH_PLAYLISTS_PENDING:
    return {
      ...state,
      pending: true
    };

  case actionTypes.FETCH_PLAYLISTS_FULFILLED:
    return {
      ...state,
      pending: false,
      items: action.payload.items  || []
    };

  case actionTypes.FETCH_PLAYLISTS_FAILED:
    return {
      ...state,
      pending: false
    };

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

  // publish/unpublish (doesn't hit store for now)
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
