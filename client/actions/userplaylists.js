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
  ...promisedActions('FETCH_USER_PLAYLISTS')
}

export function fetch(id = 'me') {
  return {
    type: actionTypes.FETCH_USER_PLAYLISTS,
    payload: {
      promise: apiRequest(`playlists/${id}`)
    }
  }
}
