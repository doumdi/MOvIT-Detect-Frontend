/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import { DebugActions } from '../redux/debugReducer';

class NotificationSettings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    isLedBlinkingEnabled: PropTypes.bool,
    isVibrationEnabled: PropTypes.bool,
    changeIsLedBlinkingEnabled: PropTypes.func,
    changeIsVibrationEnabled: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.load();
  }

  load() {
    axios.get(`${URL}notificationSettings`, this.props.header)
      .then(response => this.mapData(response.data))
      .catch(console.log);
  }

  mapData(settings) {
    this.props.changeIsLedBlinkingEnabled(settings.isLedBlinkingEnabled);
    this.props.changeIsVibrationEnabled(settings.isVibrationEnabled);
  }

  enableLedBlinking() {
    this.props.changeIsLedBlinkingEnabled(!this.props.isLedBlinkingEnabled);
    axios.post(`${URL}notificationSettings`, {
      isLedBlinkingEnabled: this.props.isLedBlinkingEnabled,
    }, this.props.header)
      .then(console.log)
      .catch(console.log);
  }

  enableVibration() {
    this.props.changeIsVibrationEnabled(!this.props.isVibrationEnabled);
    axios.post(`${URL}notificationSettings`, {
      isVibrationEnabled: this.props.isVibrationEnabled,
    }, this.props.header)
      .then(console.log)
      .catch(console.log);
  }

  render() {
    return (
      <div className="row">
        <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6">
          <h5>{T.translate(`debug.notificationSettings.${this.props.language}`)}:</h5>
        </div>
        <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6" >
          <Checkbox
            id="enableLedBlinking"
            onChange={() => this.enableLedBlinking()}
            checked={this.props.isLedBlinkingEnabled}
          />
          <label htmlFor="enableLedBlinking">{T.translate(`debug.notificationSettings.enableLedBlinking.${this.props.language}`)}</label>
        </div>
        <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6" >
          <Checkbox
            id="enableVibration" 
            onChange={() => this.enableVibration()}
            checked={this.props.isVibrationEnabled}
          />
          <label htmlFor="enableVibration">{T.translate(`debug.notificationSettings.enableVibration.${this.props.language}`)}</label>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    isLedBlinkingEnabled: state.debugReducer.isLedBlinkingEnabled,
    isVibrationEnabled: state.debugReducer.isVibrationEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeIsLedBlinkingEnabled: DebugActions.changeIsLedBlinkingEnabled,
    changeIsVibrationEnabled: DebugActions.changeIsVibrationEnabled,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
