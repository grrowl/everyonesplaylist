import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { containerStyle, contentStyle } from './emojiStatus.css';
import { emojiBox, iconBox, actionBox } from './emojiStyle.css';
import { themeStyles } from './emojiStyle';

export default class EmojiStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      themeStyle: themeStyles[~~(Math.random() * themeStyles.length)]
    }
  }

  render() {
    const { emoji, action, children, onClick } = this.props,
          { themeStyle } = this.state;

    return (
      <div className={ cx(containerStyle, themeStyle) } onClick={ onClick }>
        <div className={ cx(emojiBox, iconBox) }>
          { emoji }
        </div>
        <div className={ contentStyle }>
          { children }
        </div>
        {
          action
          ? <div className={ cx(emojiBox, actionBox) }>
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
