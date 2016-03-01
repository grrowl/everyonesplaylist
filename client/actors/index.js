
import * as PlaylistActions from '../actions/playlists';

export function playlists(store) {
  let isDispatched = false;

  store.subscribe(() => {
    let { session = {} } = store.getState();

    if (!isDispatched && session.auth) {
      isDispatched = true;
      store.dispatch(PlaylistActions.fetch('playlists'))
    }
  })
}

export function userPlaylists(store) {
  let isDispatched = false;

  store.subscribe(() => {
    let { session = {}, location = {} } = store.getState();

    if (!isDispatched && session.auth && location.pathname === '/me') {
      isDispatched = true;
      store.dispatch(PlaylistActions.fetchUser('me'))
    }
  })
}

