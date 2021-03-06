import '../../styles/components/message.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../../utilities/translator';

class ErrorMessage extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="mt-2">
        <center>
          <h6 className="error">
            <i className="fa fa-times-circle" />&nbsp;
            {T.translate(`error.${this.props.language}`)}
          </h6>
        </center>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(ErrorMessage);
