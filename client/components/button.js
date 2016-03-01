import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import { actionButton } from './emojiStyle.css';

export default class Button extends Component {
  render() {
    const { href, icon, onClick, children } = this.props,
          Handler = ( href ? Link : 'a' );

    return (
      <Handler to={ href } className={ actionButton } onClick={ onClick }>
        { icon }
        { icon ? ' ' : null }
        { children }
      </Handler>
    );
  }
}

Button.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {};

export default Button;
