import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import EmojiStatus from '../components/emojiStatus';
import { transitionOptions } from '../components/emojiStyle';
import Button from '../components/button';
import Summary from '../components/summary';

export default class Playlist extends Component {
  renderPlaylistStatus() {
    let { playlists, tracks } = this.props;

    if (playlists.pending) {
      return (
        <EmojiStatus emoji="💬" key="playlists.pending">
          playlists checking…
        </EmojiStatus>
      );
    }

    if (!playlists.items) {
      return (
        <EmojiStatus emoji="💬" key="playlists.waiting">
          playlists waiting…
        </EmojiStatus>
      );
    }

    if (playlists.items && playlists.items.length === 0) {
      return (
        <EmojiStatus emoji="💤" key="playlists.inactive">
          no playlists found
        </EmojiStatus>
      );
    }

    const indexEmoji = [ '🍕', '🐡', '🐓', '👽', '👹', '🚶' ],
          indexEmojiLength = indexEmoji.length;

    return playlists.items.map((playlist, index) =>
      <EmojiStatus emoji={ indexEmoji[index % indexEmojiLength] }
        key={ `playlists.${playlist.id}` }>
        <h3>{ playlist.name }</h3>
        <Summary>
          <dt>tracks</dt>
            <dd>{ playlist.tracks.total }</dd>
          <dt>followers</dt>
            <dd>{ playlist.followers.total ? '✅' : '❌' }</dd>
          <dt>public</dt>
            <dd>{ playlist.public ? '✅' : '❌' }</dd>
          <dt>owner</dt>
            <dd>{ playlist.owner.id ? '✅' : '❌' }</dd>

        </Summary>
      </EmojiStatus>
    );
  }

  render() {
    const { session } = this.props;

    return (
      <CSSTransitionGroup component="div" { ...transitionOptions }>
        { this.renderPlaylistStatus() }
      </CSSTransitionGroup>
    );
  }
}

Playlist.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    playlists: state.playlists
  };
}

export default connect(
  mapStateToProps
)(Playlist);
