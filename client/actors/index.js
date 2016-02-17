
import * as PlaylistActions from '../actions/playlists';

export function playlists(store) {
  let isDispatched = false;

  store.subscribe(() => {
    let { session = {}, playlists = {} } = store.getState();

    if (!isDispatched && session.user) {
      isDispatched = true;
      store.dispatch(PlaylistActions.fetch('playlists'))
    }
  })
}
