import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Handler, Link } from 'react-router';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as SessionActions from '../actions/session';

import EmojiStatus from '../components/emojiStatus';
import { transitionOptions, emojiFor } from '../components/emojiStyle';
import Button from '../components/button';

export default class Test extends Component {
  constructor() {
    super();

    this.state = {
      number: 10,
      chance: 0.5
    }
  }

  componentDidMount() {
    let { dispatch } = this.props;

    // on app start, fetch the session
    dispatch(SessionActions.fetch());

    this.setState({
      changeTimer: setInterval(::this.forceUpdate, 10000),
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.changeTimer);
  }

  renderEmojiTest() {
    let { chance, number } = this.state,
        emojis = [];

    for (let i = 0; emojis.length < number; i++) {
      if (Math.random() > chance)
        continue; // randomly don't render some

      emojis.push(
        <EmojiStatus emoji={ emojiFor(i) } key={ `test.${i}` }>
          <h1>NUMBER TIME: { i }</h1>
        </EmojiStatus>
      )
    }

    return emojis;
  }

  render() {
    const { session, children, location } = this.props;

    return (
      <CSSTransitionGroup component="div" {...transitionOptions}>
        { this.renderEmojiTest() }
      </CSSTransitionGroup>
    );
  }
}

Test.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    playlists: state.playlists,
    state: state
  };
}

export default connect(
  mapStateToProps
)(Test);
