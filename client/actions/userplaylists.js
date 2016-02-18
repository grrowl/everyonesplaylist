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
  ...promisedActions('FETCH_USER_PLAYLISTS'),
  ...promisedActions('PUBLISH_USER_PLAYLIST'),
  ...promisedActions('UNPUBLISH_USER_PLAYLISTS')
}

export function fetch(id = 'me') {
  return {
    type: actionTypes.FETCH_USER_PLAYLISTS,
    payload: {
      promise: apiRequest(`playlists/${id}`)
    }
  }
}

export function publish(user, id) {
  return {
    type: actionTypes.PUBLISH_USER_PLAYLIST,
    payload: {
      promise: apiRequest(`playlists/${user}/${id}/publish`, 'POST'),
      data: { user, id }
    }
  }
}

export function unpublish(user, id) {
  return {
    type: actionTypes.UNPUBLISH_USER_PLAYLISTS,
    payload: {
      promise: apiRequest(`playlists/${user}/${id}/unpublish`, 'POST'),
      data: { user, id }
    }
  }
}
