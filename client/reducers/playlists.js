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

  default:
    return state;
  }

}
