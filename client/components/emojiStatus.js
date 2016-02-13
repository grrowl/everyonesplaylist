import React, { Component, PropTypes } from 'react';

import { containerStyle, emojiStyle, contentStyle } from './emojiStatus.css';

export default class EmojiStatus extends Component {
  render() {
    const { emoji, children } = this.props;

    return (
      <div className={ containerStyle }>
        <div className={ emojiStyle }>
          { emoji }
        </div>
        <div className={ contentStyle }>
          { children }
        </div>
      </div>
    );
  }
}

EmojiStatus.propTypes = {
  emoji: PropTypes.node,
  children: PropTypes.node
};

EmojiStatus.defaultProps = {
  emoji: '💤',
  children: '...'
};

export default EmojiStatus;
