import { actionTypes } from '../actions/session';

export default function session(state = {}, action) {
  switch (action.type) {
  case actionTypes.FETCH_SESSION_FULFILLED:
    return state = { ...state, ...action.payload };
    // return Object.assign({}, state, action.payload);

  default:
    return state;
  }
}
