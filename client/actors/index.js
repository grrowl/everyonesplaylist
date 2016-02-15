
import * as ExperimentActions from '../actions/experiments';

export function experiments(store) {
  let isDispatched = false;

  store.subscribe(() => {
    let { session = {}, experiments = {} } = store.getState();

    if (!isDispatched && session.user) {
      isDispatched = true;
      store.dispatch(ExperimentActions.fetch('matchmaker'))
    }
  })
}
