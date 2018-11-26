/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { Button } from 'primereact/components/button/Button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationPopup from '../popups/confirmationPopup';
import Countdown from '../popups/countdown';
import CustomCard from '../shared/card';
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
    const buttons = (
      <div>
        <div className="row mb-3">
          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <Button
              id="calibrate-button"
              type="button"
              onClick={() => this.calibrate()}
              className="p-button-secondary"
              label={T.translate(`calibrateMat.${this.props.language}`)}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <Button
              id="calibrateIMU-button"
              type="button"
              onClick={() => this.openModal()}
              className="p-button-secondary"
              label={T.translate(`calibrateIMU.${this.props.language}`)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <Button
              id="turn-on-button"
              type="button"
              onClick={() => this.turnOnNotification()}
              className="p-button-secondary"
              label={T.translate(`alert.on.${this.props.language}`)}
            />
          </div>
          <div className="col-12 col-sm-6 col-md-4 mb-2">
            <Button
              id="turn-off-button"
              type="button"
              onClick={() => this.turnOffNotification()}
              className="p-button-secondary"
              label={T.translate(`alert.off.${this.props.language}`)}
            />
          </div>
        </div>
      </div>
    );
    const header = (
      <div className="ui-card-title">
        {T.translate(`calibNotif.${this.props.language}`)}
      </div>
    );
    return (
      <div className="mt-5">
        <CustomCard
          header={header}
          element={buttons}
        />
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
