import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import transitionStyles, { containerStyle, emojiStyle, actionStyle, contentStyle } from './emojiStatus.css';

const numberOfThemes = 3; // between 1...n

export default class EmojiStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themeStyle: transitionStyles[`theme${~~(Math.random() * numberOfThemes) + 1}`]
    }
  }

  render() {
    const { emoji, action, children, onClick } = this.props,
          { themeStyle } = this.state;

    return (
      <div className={ cx(containerStyle, themeStyle) } onClick={ onClick }>
        <div className={ emojiStyle }>
          { emoji }
        </div>
        <div className={ contentStyle }>
          { children }
        </div>
        {
          action
          ? <div className={ actionStyle }>
              { action }
            </div>
          : null
        }
      </div>
    );
  }
}

EmojiStatus.propTypes = {
  emoji: PropTypes.node,
  action: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func
};

EmojiStatus.defaultProps = {
  emoji: '💤',
  children: '...'
};

export default EmojiStatus;
export { transitionStyles };
