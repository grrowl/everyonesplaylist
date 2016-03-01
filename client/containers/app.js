import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Handler, Link } from 'react-router';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as SessionActions from '../actions/session';

import EmojiStatus from '../components/emojiStatus';
import { transitionOptions, emojiFor } from '../components/emojiStyle';
import Button from '../components/button';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      sessionLinkClicked: false
    };
  }

  componentDidMount() {
    let { dispatch } = this.props;

    // on app start, fetch the session
    dispatch(SessionActions.fetch());
  }

  // Hides (with animation) the session link once it's been clicked. If the
  // browser hasn't navigated away after a little while, put it back cos
  // something might have gone wrong.
  onSessionLinkClick() {
    this.setState({
      sessionLinkClicked: true
    })

    setTimeout(() => {
      this.setState({
        sessionLinkClicked: false
      })
    }, 2000);
  }

  renderSession(session) {
    let { sessionLinkClicked } = this.state;

    // we're hopefully waiting on the browser to navigate
    if (sessionLinkClicked)
      return null;

    if (session.authorizeURL) {
      return (
        <EmojiStatus emoji="🤔" key="session.connect">
          <a onClick={ ::this.onSessionLinkClick }
            href={ session.authorizeURL }>Connect with Spotify plz?</a>
        </EmojiStatus>
      )
    } else if (session.user) {
      let emoji = '🤔',
          addLink = (
            location.pathname.match(/^\/?me$/) === null
            ? <Link to="/me">
                👉
                playlists
              </Link>
            : null
          );

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
    const { session, children, location } = this.props;

    return (
      <div>
        <CSSTransitionGroup component="div" {...transitionOptions}>
          <EmojiStatus emoji="🌏"
            action={
              location.pathname.match(/^\/?$/) === null
              ? <Button href="/">🔙</Button>
              : null }>
            <h1>Everyone's Playlist</h1>
          </EmojiStatus>

          { this.renderSession(session) }
        </CSSTransitionGroup>
        { children }
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(
  mapStateToProps
)(App);
