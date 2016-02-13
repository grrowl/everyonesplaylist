import { actionTypes } from '../actions/counterActions';

export default function counter(state = 0, action) {
  switch (action.type) {
  case actionTypes.INCREMENT_COUNTER:
    return state + 1;
  case actionTypes.DECREMENT_COUNTER:
    return state - 1;
  default:
    return state;
  }
}
