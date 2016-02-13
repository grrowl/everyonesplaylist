import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect, dispatch } from 'react-redux';

import * as SessionActions from '../actions/session';

export default class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;

    // on app start, fetch the session
    dispatch(SessionActions.fetch());

    dispatch({
      type: 'FETCH_SESSION',
      data: 'heyyyy'
    })
  }

  aThing(ev) {
    let { dispatch } = this.props;

    console.log('a thing!');
    dispatch(SessionActions.fetch());
  }

  render() {
    const { state, session, actions } = this.props;

    return (
      <div>
        <marquee><h1>yeah boiiiiii</h1></marquee>
        <blockquote onClick={ ::this.aThing }>
          { JSON.stringify(state) }
        </blockquote>
      </div>
    );
  }
}

App.propTypes = {};

function mapStateToProps(state) {
  return {
    session: state.session,
    state: state
  };
}

export default connect(
  mapStateToProps
)(App);
