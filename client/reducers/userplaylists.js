import { actionTypes } from '../actions/userplaylists';

const defaultState = {
  pending: false,
  items: null
}

export default function userPlaylists(state = {}, action) {
  let name = action && action.payload && action.payload.name;

  // Reducer replaces `.items` wholesale with the action's result

  switch (action.type) {
  case actionTypes.FETCH_USER_PLAYLISTS_PENDING:
    return {
      ...state,
      pending: true
    };

  case actionTypes.FETCH_USER_PLAYLISTS_FULFILLED:
    // early bail for actions not fitting criteria
    if (!action.payload.items)
      return state;

    return {
      ...state,
      pending: false,
      items: action.payload.items || []
    };

  case actionTypes.FETCH_USER_PLAYLISTS_FAILED:
    return {
      ...state,
      pending: false,
      items: action.payload || []
    };

  default:
    return state;
  }

}
