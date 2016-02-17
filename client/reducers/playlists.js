import { actionTypes } from '../actions/playlists';

const defaultState = {
  pending: false,
  items: null
}

export default function playlists(state = {}, action) {
  let name = action && action.payload && action.payload.name;

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
      items: action.payload || []
    };

  case actionTypes.FETCH_PLAYLISTS_FAILED:
    return {
      ...state,
      pending: false,
      items: action.payload || []
    };

  default:
    return state;
  }

}
