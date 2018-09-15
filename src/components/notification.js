/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../redux/applicationReducer';
import { T } from '../utilities/translator';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }
  turnOnNotification() {
    axios.get(`${URL}alert?State=on`, this.props.header)
      .then(response => console.log(response));
  }

  turnOffNotification() {
    axios.get(`${URL}alert?State=off`, this.props.header)
      .then(response => console.log(response));
  }

  calibrate() {
    axios.get(`${URL}calibrate`, this.props.header)
      .then(response => console.log(response));
  }
  render() {
    return (
      <div className="row m-3 mt-5" >
        <div className="mb-2 mr-3" >
          <button onClick={() => this.calibrate()} className="btn btn-lg">
            {T.translate(`calibrate.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button onClick={() => this.turnOnNotification()} className="btn btn-lg">
            {T.translate(`alert.on.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button onClick={() => this.turnOffNotification()} className="btn btn-lg">
            {T.translate(`alert.off.${this.props.language}`)}
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(Notification);
