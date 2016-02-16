
import Datastore from 'nedb';

const defaultConfig = {
  // nedb options, if any
};

export default {
  sessions: new Datastore(defaultConfig),
  experiments: new Datastore(defaultConfig)
};
