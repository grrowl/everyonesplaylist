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
  ...promisedActions('FETCH_PLAYLIST')
}

export function fetch() {
  return {
    type: actionTypes.FETCH_PLAYLIST,
    payload: {
      promise: apiRequest('playlist')
    }
  }
}
