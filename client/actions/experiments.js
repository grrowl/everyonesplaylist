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
  ...promisedActions('FETCH_EXPERIMENT')
}

export function fetch(name) {
  return {
    type: actionTypes.FETCH_EXPERIMENT,
    name,
    payload: {
      promise: apiRequest(`experiment/${name}`)
    }
  }
}
