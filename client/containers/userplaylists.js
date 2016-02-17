import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as UserPlaylistActions from '../actions/userplaylists';

import EmojiStatus, { transitionStyles } from '../components/emojiStatus';
import Button from '../components/button';
import Summary from '../components/summary';

export default class Playlists extends Component {
  renderPlaylists() {
    let { session, userPlaylists } = this.props;

    if (!session.user) {
      return (
        <EmojiStatus emoji="💤" key="userplaylists.inactive">
          who are you? who who? who who?
        </EmojiStatus>
      );
    }

    if (userPlaylists.pending) {
      return (
        <EmojiStatus emoji="💬" key="userplaylists.pending">
          fetching your playlists, hold tight…
        </EmojiStatus>
      );
    }

    if (!Array.isArray(userPlaylists.items) || userPlaylists.items.length === 0) {
      return (
        <EmojiStatus emoji="💤" key="userplaylists.inactive">
          no playlists found 😢
        </EmojiStatus>
      );
    }

    const indexEmoji = [ '🍕', '🐡', '🐓', '👽', '👹', '🚶' ],
          indexEmojiLength = indexEmoji.length;

    return userPlaylists.items.map((playlist, index) =>
      <EmojiStatus emoji={ indexEmoji[1 % indexEmojiLength] }
        key="userplaylists.result">
        <h3>{ playlist.name }</h3>
        <Summary>
          <dt>tracks</dt>
            <dd>{ playlist.tracks.total }</dd>
          <dt>public</dt>
            <dd>{ playlist.public }</dd>
          {
            !playlist.public
            && [
              <dt>collaborative</dt>,
              <dd>{ playlist.collaborative }</dd>
              ]
          }
        </Summary>
      </EmojiStatus>
    );
  }

  render() {
    const { session } = this.props,
          transitionOptions = {
            transitionEnterTimeout: 1000,
            transitionLeaveTimeout: 1000,
            transitionName: transitionStyles
          };

    return (
      <CSSTransitionGroup {...transitionOptions}>
        <EmojiStatus emoji="👇">
          <h2>Pick your playlists</h2>
        </EmojiStatus>
        { this.renderPlaylists() }
      </CSSTransitionGroup>
    );
  }
}

Playlists.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    userPlaylists: state.userPlaylists
  };
}

export default connect(
  mapStateToProps
)(Playlists);
