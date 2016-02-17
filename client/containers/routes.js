
import React from 'react';
import { IndexRoute, Route } from 'react-router'

import App from './app';
import Playlists from './playlists';
import UserPlaylists from './userplaylists';

const Routes = (
  <Route path="/" component={ App }>
    <Route path="add" component={ UserPlaylists } />
    <IndexRoute component={ Playlists } />
  </Route>
);

export default Routes;
