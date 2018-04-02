import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../index';


class SumbitButtons extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className="col-sm-9 text-right">
        <button onClick={() => this.props.onCancel()} className="btn btn-lg">
          {T.translate(`cancel.${this.props.language}`)}
        </button>
        &nbsp;
        <button onClick={() => this.props.onSave()} className="btn btn-lg">
          {T.translate(`save.${this.props.language}`)}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}
export default connect(mapStateToProps)(SumbitButtons);
