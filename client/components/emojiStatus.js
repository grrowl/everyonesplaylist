import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import transitionStyles, { containerStyle, emojiStyle, contentStyle } from './emojiStatus.css';

const numberOfThemes = 2; // between 1...n

export default class EmojiStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeStyle: transitionStyles[`theme${~~(Math.random() * numberOfThemes) + 1}`]
    }
  }

  render() {
    const { emoji, children } = this.props,
          { themeStyle } = this.state;

    return (
      <div className={ cx(containerStyle, themeStyle) }>
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
export { transitionStyles };
