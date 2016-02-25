
import React from 'react';
import { IndexRoute, Route } from 'react-router'

import App from './app';
import Playlists from './playlists';
import UserPlaylists from './userplaylists';

import Test from './test';

const Routes = (
  <Route path="/" component={ App }>
    <Route path="me" component={ UserPlaylists } />
    <Route path="test" component={ Test } />
    <IndexRoute component={ Playlists } />
  </Route>
);

export default Routes;
