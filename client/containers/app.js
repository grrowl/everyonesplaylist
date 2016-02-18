import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Handler, Link } from 'react-router';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as SessionActions from '../actions/session';

import EmojiStatus, { transitionStyles } from '../components/emojiStatus';
import Button from '../components/button';

export default class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;

    // on app start, fetch the session
    dispatch(SessionActions.fetch());
  }

  renderSession(session) {
    if (session.authorizeURL) {
      return (
        <EmojiStatus emoji="🤔" key="session.connect">
          <a href={ session.authorizeURL }>Connect with Spotify plz?</a>
        </EmojiStatus>
      )
    } else if (session.user) {
      let emoji = '🤔',
          addLink = <Link to="/add">add my playlists</Link>;

      if (session.user.images && session.user.images.length)
        emoji = <img src={ session.user.images[0].url } />;

      return (
        <EmojiStatus emoji={ emoji } key="session.welcome"
          action={ addLink }>
          Welcome back, { session.user.display_name }
        </EmojiStatus>
      )
    }

    return (
      <EmojiStatus emoji="💀" key="session.unknown">
        Unknown session state
      </EmojiStatus>
    )
  }

  renderPlaylistStatus() {
    let { playlists } = this.props;

    if (playlists.pending) {
      return (
        <EmojiStatus emoji="💬" key="playlists.pending">
          playlists checking…
        </EmojiStatus>
      );
    }

    if (!playlists.items) {
      return (
        <EmojiStatus emoji="💬" key="playlists.pending">
          playlists waiting…
        </EmojiStatus>
      );
    }

    if (playlists.items && playlists.items.length === 0) {
      return (
        <EmojiStatus emoji="💤" key="${name}.inactive">
          no playlists found
        </EmojiStatus>
      );
    }

    return (
      <EmojiStatus emoji="💘" key="${name}.result">
        platlists loaded my friend
      </EmojiStatus>
    )
  }

  render() {
    const { session, children } = this.props,
          transitionOptions = {
            transitionEnterTimeout: 1000,
            transitionLeaveTimeout: 1000,
            transitionName: transitionStyles
          };

    return (
      <div>
        <EmojiStatus emoji="🌏">
          <h1>Everyone's Playlist</h1>
        </EmojiStatus>
        <CSSTransitionGroup {...transitionOptions}>
          { this.renderSession(session) }
          { children }
        </CSSTransitionGroup>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    playlists: state.playlists,
    state: state
  };
}

export default connect(
  mapStateToProps
)(App);
