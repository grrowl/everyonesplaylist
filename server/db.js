
import Datastore from 'nedb';

let defaultConfig = {
  // nedb options
};

export default {
  defaultConfig: defaultConfig,
  sessions: new Datastore(defaultConfig)
};
