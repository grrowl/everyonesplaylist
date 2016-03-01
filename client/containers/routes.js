
import React from 'react';
import { IndexRoute, Route } from 'react-router'

import App from './app';
// import Playlists from './playlists';
import About from './about';
import UserPlaylists from './userplaylists';
import Playlist from './playlist';

import Test from './test';

const Routes = (
  <Route path="/" component={ App }>
    <Route path="me" component={ UserPlaylists } />
    <Route path="playlist/:id" component={ Playlist } />
    <Route path="test" component={ Test } />
    {/* <IndexRoute component={ Playlists } /> */}
    <IndexRoute component={ About } />
  </Route>
);

export default Routes;
