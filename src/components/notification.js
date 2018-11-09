/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../redux/applicationReducer';
import { T } from '../utilities/translator';
import Countdown from './countdown';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCountdown: false,
    };
    this.calibrationCompleted = this.calibrationCompleted.bind(this);
  }

  async turnOnNotification() {
    const response = axios.get(`${URL}alert?State=on`, this.props.header);
    console.log(response);
  }

  async turnOffNotification() {
    const response = await axios.get(`${URL}alert?State=off`, this.props.header);
    console.log(response);
  }

  async calibrate() {
    await axios.get(`${URL}calibrate`, this.props.header);
    this.setState({ ...this.state, showCountdown: true });
  }

  calibrationCompleted() {
    this.setState({ ...this.state, showCountdown: false });
  }

  render() {
    return (
      <div className="row m-3 mt-5 ml-md-5">
        <div className="mb-2 mr-3">
          <button id="calibrate-button" type="button" onClick={() => this.calibrate()} className="btn btn-lg">
            {T.translate(`calibrate.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button id="turn-on-button" type="button" onClick={() => this.turnOnNotification()} className="btn btn-lg">
            {T.translate(`alert.on.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button id="turn-off-button" type="button" onClick={() => this.turnOffNotification()} className="btn btn-lg">
            {T.translate(`alert.off.${this.props.language}`)}
          </button>
        </div>
        {this.state.showCountdown
          && (
          <Countdown
            time={10}
            title={T.translate(`calibrating.${this.props.language}`)}
            onComplete={this.calibrationCompleted}
          />
          )}
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
