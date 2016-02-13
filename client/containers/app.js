import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import * as SessionActions from '../actions/session';

import EmojiStatus from '../components/emojistatus';

export default class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;

    // on app start, fetch the session
    dispatch(SessionActions.fetch());
  }

  aThing(ev) {
    let { dispatch } = this.props;

    console.log('a thing!');
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

  render() {
    const { state, session, actions } = this.props;

    return (
      <div className="statusContainer">
        { this.renderSession(session) }
        <marquee><h1>yeah boiiiiii</h1></marquee>
        <blockquote onClick={ ::this.aThing }>
          { JSON.stringify(state) }
        </blockquote>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    state: state
  };
}

export default connect(
  mapStateToProps
)(App);
