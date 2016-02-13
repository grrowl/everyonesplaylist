import apiRequest from '../apiRequest';

function promisedActions(type) {
  return {
    [type]: type,
    [`${type}_PENDING`]: `${type}_PENDING`,
    [`${type}_FULFILLED`]: `${type}_FULFILLED`,
    [`${type}_REJECTED`]: `${type}_REJECTED`
  }
}

export const actionTypes = {
  ...promisedActions('FETCH_SESSION')
}

export function fetch() {
  return {
    type: actionTypes.FETCH_SESSION,
    payload: {
      promise: apiRequest('session')
    }
  }
}
