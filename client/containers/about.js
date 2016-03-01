import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Handler, Link } from 'react-router';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as SessionActions from '../actions/session';

import EmojiStatus from '../components/emojiStatus';
import { transitionOptions } from '../components/emojiStyle';
import Button from '../components/button';

import { flexibleContainerStyle, contentStyle } from '../components/emojiStatus.css';

export default class About extends Component {

  render() {
    return (
      <CSSTransitionGroup component="div" {...transitionOptions}>
        <EmojiStatus emoji="🎧">
          <h1>This one's for you</h1>
        </EmojiStatus>

        <div className={ flexibleContainerStyle }>
          <div className={ contentStyle }>
            <h1>A playlist for everyblobby</h1>
            <p>
              Hey dude this is all about how my life got flipturned upsidedown
            </p>
          </div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default About;
