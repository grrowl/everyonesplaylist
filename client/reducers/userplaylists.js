import { actionTypes } from '../actions/userplaylists';

const defaultState = {
  pending: false,
  items: null
}

export default function userPlaylists(state = {}, action) {
  // Reducer replaces `.items` wholesale with the action's result
  switch (action.type) {
  case actionTypes.FETCH_USER_PLAYLISTS_PENDING:
    return {
      ...state,
      pending: true
    };

  case actionTypes.FETCH_USER_PLAYLISTS_FULFILLED:
    console.log('hello oooh', action.payload, action.payload.items.length)
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
