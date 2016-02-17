
import Nedb from 'nedb';
import Promisify from 'promisify-me';

const promisedNedb = Promisify(Nedb, 'nedb'),
      create = (name) =>
        new promisedNedb({
          filename: `./data/${name}.db`,
          autoload: true
        });

export default {
  authTokens: create('authTokens'),
  users: create('users'),
  playlists: create('playlists')
}
