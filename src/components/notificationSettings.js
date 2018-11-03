/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';

class NotificationSettings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLedBlinkingEnabled: true,
      isVibrationEnabled: true,
    };
    this.load();
  }

  load() {
    axios.get(`${URL}notificationSettings`, this.props.header)
      .then(response => this.mapData(response.data))
      .catch(console.log);
  }

  mapData(settings) {
    this.setState({
      isLedBlinkingEnabled: settings.isLedBlinkingEnabled,
      isVibrationEnabled: settings.isVibrationEnabled
    });
  }

  enableLedBlinking() {
    this.setState({isLedBlinkingEnabled: !this.state.isLedBlinkingEnabled});
    axios.post(`${URL}notificationSettings`, {
      isLedBlinkingEnabled: this.state.isLedBlinkingEnabled,
    }, this.props.header)
      .then(console.log)
      .catch(console.log);
  }

  enableVibration() {
    this.setState({isVibrationEnabled: !this.state.isVibrationEnabled});
    axios.post(`${URL}notificationSettings`, {
      isVibrationEnabled: this.state.isVibrationEnabled,
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
            checked={this.state.isLedBlinkingEnabled}
          />
          <label htmlFor="enableLedBlinking">{T.translate(`debug.notificationSettings.enableLedBlinking.${this.props.language}`)}</label>
        </div>
        <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6" >
          <Checkbox
            id="enableVibration" 
            onChange={() => this.enableVibration()}
            checked={this.state.isVibrationEnabled}
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
  };
}

export default connect(mapStateToProps)(NotificationSettings);
