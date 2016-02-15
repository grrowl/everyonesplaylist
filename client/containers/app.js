import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import * as SessionActions from '../actions/session';

import EmojiStatus from '../components/emojiStatus';

export default class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;

    // on app start, fetch the session
    dispatch(SessionActions.fetch());
  }

  renderSession(session) {
    if (session.authorizeURL) {
      return (
        <EmojiStatus emoji="🤔">
          <a href={ session.authorizeURL }>Connect with Spotify plz?</a>
        </EmojiStatus>
      )
    } else if (session.user) {
      let emoji = '🤔';

      if (session.user.images && session.user.images.length)
        emoji = <img src={ session.user.images[0].url } />;

      return (
        <EmojiStatus emoji={ emoji }>
          Welcome back, { session.user.display_name }
        </EmojiStatus>
      )
    }

    return (
      <EmojiStatus emoji="💀">
        Unknown session state
      </EmojiStatus>
    )
  }

  renderExperiment(name) {
    let { experiments = {} } = this.props,
        experiment = experiments[name];

    if (!experiment) {
      return (
        <EmojiStatus emoji="💬">
          { name } waiting…
        </EmojiStatus>
      );
    }

    if (experiment.pending) {
      return (
        <EmojiStatus emoji="💤">
          { name } checking…
        </EmojiStatus>
      );
    }

    if (!experiment.active) {
      return (
        <EmojiStatus emoji="💤">
          { name } not active.
        </EmojiStatus>
      );
    }

    return (
      <EmojiStatus emoji="💘">
        { experiment.result }
      </EmojiStatus>
    )
  }

  renderPlaylist(playlist) {
    let { session } = this.props;

    if (!session.user) {
      return (
        <EmojiStatus>
          Waiting for session...
        </EmojiStatus>
      )
    }

    if (playlist.length) {
      return (
        <EmojiStatus emoji="🔊">
          We know things about playlists here
          { JSON.stringify(playlist) }
        </EmojiStatus>
      )
    }

    return (
      <EmojiStatus emoji="🙄">
        No playlists found
      </EmojiStatus>
    )
  }

  render() {
    const { session, playlist } = this.props;

    return (
      <div className="statusContainer">
        { this.renderSession(session) }
        { /*this.renderPlaylist(playlist)*/ }
        { this.renderExperiment('matchmaker') }
        <blockquote>
          { JSON.stringify(this.props.state) }
        </blockquote>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    playlist: state.playlist,
    experiments: state.experiments,
    state: state
  };
}

export default connect(
  mapStateToProps
)(App);
