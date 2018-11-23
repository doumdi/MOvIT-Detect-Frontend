import '../../styles/components/message.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../../utilities/translator';

class NoDataMessage extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="mt-2">
        <center>
          <h6 className="warning">
            <i className="fa fa-exclamation-circle" />&nbsp;
            {T.translate(`noData.${this.props.language}`)}
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

export default connect(mapStateToProps)(NoDataMessage);
