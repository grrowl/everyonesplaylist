import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as SessionActions from '../actions/session';

import EmojiStatus, { transitions } from '../components/emojiStatus';

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
      let emoji = '🤔';

      if (session.user.images && session.user.images.length)
        emoji = <img src={ session.user.images[0].url } />;

      return (
        <EmojiStatus emoji={ emoji } key="session.welcome">
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

  renderExperiment(name) {
    let { experiments = {} } = this.props,
        experiment = experiments[name];

    //

    if (!experiment) {
      return (
        <EmojiStatus emoji="💬" key={ `${name}.waiting` }>
          { name } waiting…
        </EmojiStatus>
      );
    }

    if (experiment.pending) {
      return (
        <EmojiStatus emoji="💬" key={ `${name}.pending` }>
          { name } checking…
        </EmojiStatus>
      );
    }

    if (!experiment.active) {
      return (
        <EmojiStatus emoji="💤" key={ `${name}.inactive` }>
          { name } not active.
        </EmojiStatus>
      );
    }

    return (
      <EmojiStatus emoji="💘" key={ `${name}.result` }>
        { experiment.result }
      </EmojiStatus>
    )
  }

  render() {
    const { session } = this.props,
          transitionOptions = {
            transitionEnterTimeout: 750,
            transitionLeaveTimeout: 750,
            transitionName: transitions
          };

    return (
      <div className="statusContainer">
        <CSSTransitionGroup {...transitionOptions}>
          { this.renderSession(session) }
          { this.renderExperiment('matchmaker') }
        </CSSTransitionGroup>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    experiments: state.experiments,
    state: state
  };
}

export default connect(
  mapStateToProps
)(App);
