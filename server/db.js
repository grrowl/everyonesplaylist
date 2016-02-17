
import Nedb from 'nedb';
import Promisify from 'promisify-me';

const promisedNedb = Promisify(Nedb, 'nedb'),
      defaultConfig = {
        // nedb options, if any
        autoload: true
      };

export default function connectDatabase(name) {
  return new promisedNedb({
    filename: `./data/${name}.db`,
    ...defaultConfig
  });
}
