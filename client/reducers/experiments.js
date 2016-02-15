import { actionTypes } from '../actions/session';

const defaultState = {
  fetched: false
}

export default function experiment(state = defaultState, action) {
  switch (action.type) {
  case actionTypes.FETCH_EXPERIMENT_PENDING:
    return {
      ...state,
      pending: true
    };

  case actionTypes.FETCH_EXPERIMENT_FULFILLED:
    return {
      ...state,
      pending: false,
      [action.name]: action.payload
    };

  case actionTypes.FETCH_EXPERIMENT_FAILED:
    return {
      ...state,
      pending: false
    };

  default:
    return state;
  }

}
