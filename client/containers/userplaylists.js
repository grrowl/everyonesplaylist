import React, { Component, PropTypes, createFragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import CSSTransitionGroup from 'react-addons-css-transition-group';

import * as PlaylistActions from '../actions/playlists';

import EmojiStatus from '../components/emojiStatus';
import { transitionOptions, emojiFor } from '../components/emojiStyle';
import Button from '../components/button';
import Summary from '../components/summary';

export default class UserPlaylists extends Component {

  constructor() {
    super();

    this.state = {
      pendingIds: {}
    };
  }

  publishPlaylist(playlist) {
    let { dispatch } = this.props,
        { pendingIds } = this.state;

    this.setPlaylistPending(playlist, true);

    var publishAction =
      dispatch(PlaylistActions.publish(playlist.owner.id, playlist.id));

    // ehh it feels dirty to jump through the hoops.
    // not sure if "return payload.promise from the promise middleware" is
    // strictly nice.
    publishAction.payload.promise.then(() =>
      this.setPlaylistPending(playlist, true));
  }

  unpublishPlaylist(playlist) {
    let { dispatch } = this.props,
        { pendingIds } = this.state;

    this.setPlaylistPending(playlist, true);

    var unpublishAction =
      dispatch(PlaylistActions.unpublish(playlist.owner.id, playlist.id));

    // see above
    unpublishAction.payload.promise.then(() =>
      this.setPlaylistPending(playlist, true));
  }

  setPlaylistPending(playlist, isPending) {
    let { pendingIds } = this.state;

    // Mark this playlist's id as pending maybe
    this.setState({
      pendingIds: {
        ...pendingIds,
        [playlist.id]: isPending
      }
    });
  }

  renderPlaylists() {
    let { session, playlists } = this.props,
        { pendingIds } = this.state;

    if (!session.user) {
      return (
        <EmojiStatus emoji="💤" key="userplaylists.inactive">
          who are you? who who? who who?
        </EmojiStatus>
      );
    }

    if (playlists.pending) {
      return (
        <EmojiStatus emoji="💬" key="userplaylists.pending">
          hold tight while we fetch your playlists…
        </EmojiStatus>
      );
    }

    // if there's non-user playlists in the store, they'll render too, unless
    // you add a flag to the playlist objects.
    if (!Array.isArray(playlists.items) || playlists.items.length === 0) {
      return (
        <EmojiStatus emoji="💤" key="userplaylists.inactive">
          no playlists found 😢
        </EmojiStatus>
      );
    }

    /*
    const renderPublishButton = (playlist) => (
            playlists.publishedIds.include(playlist.id)
            ? <Button onClick={ this.publishPlaylist.bind(this, playlist) }>
              🗣</Button>
            : <Button onClick={ this.unpublishPlaylist.bind(this, playlist) }>
              💔</Button>
          );
    */

    const renderPublishButton = (playlist) => {
      var { pendingIds } = this.state;

      // If this playlist has a pending action, display a solemn stone head to
      // indicate they must exercise the patience of gods
      if (pendingIds[playlist.id])
        return <Button>🗿</Button>;

      return (
        <Button href={ `/playlist/${playlist.id}` }>
          { playlist.id }
        </Button>
      );
    }

    return playlists.items.map((playlist, index) =>
      <EmojiStatus emoji={ emojiFor(index) }
        action={ renderPublishButton(playlist) }
        key={ `userplaylists.${playlist.id}` }
        onClick={ this.publishPlaylist.bind(this, playlist) }>
        <h3>{ playlist.name }</h3>
        <Summary>
          <dt>tracks</dt>
            <dd>{ playlist.tracks.total }</dd>
          <dt>public</dt>
            <dd>{ playlist.public ? '✅' : '❌' }</dd>
          {
            !playlist.public
            && [
              <dt>collaborative</dt>,
              <dd>{ playlist.collaborative ? '✅' : '❌' }</dd>
              ]
          }
        </Summary>
      </EmojiStatus>
    );

  }

  render() {
    const { session } = this.props;

    return (
      <CSSTransitionGroup component="div" {...transitionOptions}>
        <EmojiStatus emoji="👇">
          <h2>Pick your playlists</h2>
        </EmojiStatus>

        { this.renderPlaylists() }
      </CSSTransitionGroup>
    );
  }
}

UserPlaylists.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    playlists: state.playlists
  };
}

export default connect(
  mapStateToProps
)(UserPlaylists);
