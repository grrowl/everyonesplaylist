import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { buttonStyle } from './button.css';

export default class Button extends Component {
  render() {
    const { icon, children } = this.props;

    return (
      <a className={ buttonStyle }>
        { icon }
        { icon ? ' ' : null }
        { children }
      </a>
    );
  }
}

Button.propTypes = {
  icon: PropTypes.node,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {};

export default Button;
