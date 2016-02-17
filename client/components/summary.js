import React from 'react';

import { summaryStyle } from './summary.css';

export default function Summary(props) {
  let { children } = props;

  return (
    <dl className={ summaryStyle }>
      { children }
    </dl>
  )
}
