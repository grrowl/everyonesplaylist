import { actionTypes } from '../actions/experiments';

export default function experiment(state = {}, action) {
  let name = action && action.payload && action.payload.name;

  switch (action.type) {
  case actionTypes.FETCH_EXPERIMENT_PENDING:
    return {
      ...state,
      [name]: {
        pending: true
      }
    };

  case actionTypes.FETCH_EXPERIMENT_FULFILLED:
    return {
      ...state,
      [name]: {
        ...action.payload,
        pending: false
      }
    };

  case actionTypes.FETCH_EXPERIMENT_FAILED:
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
