/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationPopup from '../popups/confirmationPopup';
import Countdown from '../popups/countdown';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';
import { get } from '../../utilities/secureHTTP';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCountdownMat: false,
      showCountdownIMU: false,
    };
    this.matCalibrationCompleted = this.matCalibrationCompleted.bind(this);
    this.IMUCalibrationCompleted = this.IMUCalibrationCompleted.bind(this);
  }

  async turnOnNotification() {
    const response = await get(`${URL}alert?State=on`);
    console.log(response);
  }

  async turnOffNotification() {
    const response = await get(`${URL}alert?State=off`);
    console.log(response);
  }

  async calibrate() {
    await get(`${URL}calibrate`);
    this.setState({ ...this.state, showCountdownMat: true });
  }

  async calibrateIMU() {
    await get(`${URL}calibrateIMU`);
    this.setState({
      ...this.state,
      showCountdownIMU: true,
      isPopupOpened: false,
    });
  }

  matCalibrationCompleted() {
    this.setState({ ...this.state, showCountdownMat: false });
  }

  IMUCalibrationCompleted() {
    this.setState({ ...this.state, showCountdownIMU: false });
  }

  openModal() {
    this.setState({ isPopupOpened: true });
  }

  closeModal() {
    this.setState({ isPopupOpened: false });
  }

  render() {
    return (
      <div className="row ml-2 mt-5">
        <div className="mr-3 mb-2">
          <button id="calibrate-button" type="button" onClick={() => this.calibrate()} className="btn btn-lg">
            {T.translate(`calibrateMat.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button id="calibrateIMU-button" type="button" onClick={() => this.openModal()} className="btn btn-lg">
            {T.translate(`calibrateIMU.${this.props.language}`)}
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
        {this.state.showCountdownMat
          && (
            <Countdown
              time={10}
              title={T.translate(`calibrating.${this.props.language}`)}
              onComplete={this.matCalibrationCompleted}
            />
          )}
        {this.state.showCountdownIMU
          && (
            <Countdown
              time={120}
              title={T.translate(`calibrating.${this.props.language}`)}
              onComplete={this.IMUCalibrationCompleted}
            />
          )}
        <ConfirmationPopup
          title={T.translate(`calibrateIMU.title.${this.props.language}`)}
          body={T.translate(`calibrateIMU.confirmation.${this.props.language}`)}
          show={this.state.isPopupOpened}
          onConfirm={() => this.calibrateIMU()}
          onClose={() => this.closeModal()}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(Notification);
