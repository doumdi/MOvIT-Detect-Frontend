/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../styles/components/notificationSettings.css'

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { DebugActions } from '../redux/debugReducer';
import PropTypes from 'prop-types';
import { Spinner } from 'primereact/components/spinner/Spinner';
import { T } from '../utilities/translator';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { URL } from '../redux/applicationReducer';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const MINIMUM_SNOOZE_TIME = 0;
const MAXIMUM_SNOOZE_TIME = 60;

class NotificationSettings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    snoozeTime: PropTypes.number,
    minimumSnoozeTime: PropTypes.number,
    maximumSnoozeTime: PropTypes.number,
    isLedBlinkingEnabled: PropTypes.bool,
    isVibrationEnabled: PropTypes.bool,
    changeSnoozeTime: PropTypes.func,
    changeIsLedBlinkingEnabled: PropTypes.func,
    changeIsVibrationEnabled: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.load();
  }

  async load() {
    const settings = await this.getSettings();
    this.mapData(settings);
  }

  async getSettings() {
    try {
      const response = await axios.get(`${URL}notificationSettings`, this.props.header);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  mapData(settings) {
    this.props.changeIsLedBlinkingEnabled(settings.isLedBlinkingEnabled);
    this.props.changeIsVibrationEnabled(settings.isVibrationEnabled);
    this.props.changeSnoozeTime(settings.snoozeTime);
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

  changeSnoozeTime(snoozeTime) {
    if (!snoozeTime || !parseInt(snoozeTime)) {
      return;
    }
    this.props.changeSnoozeTime(parseInt(snoozeTime, 10));
  }

  saveSnoozeTime(snoozeTime) {
    axios.post(`${URL}notificationSettings`, {
      snoozeTime: this.props.snoozeTime,
    }, this.props.header)
      .then(console.log)
      .catch(console.log);
  }

  render() {
    const header = (
      <div className="ui-card-title header">
        {T.translate(`debug.notificationSettings.${this.props.language}`)}
      </div>
    );

    return (
      <div className="container">
        <div className="card">
          <Card header={header}>
            <div>
              <Checkbox
                id="enableLedBlinking"
                onChange={() => this.enableLedBlinking()}
                checked={this.props.isLedBlinkingEnabled}
              />
              <label htmlFor="enableLedBlinking">{T.translate(`debug.notificationSettings.enableLedBlinking.${this.props.language}`)}</label>
            </div>
            <div>
              <Checkbox
                id="enableVibration" 
                onChange={() => this.enableVibration()}
                checked={this.props.isVibrationEnabled}
              />
              <label htmlFor="enableVibration">{T.translate(`debug.notificationSettings.enableVibration.${this.props.language}`)}</label>
            </div>
            <div>
              <span>
                <i id="snoozeTimeToolTip" className="fa fa-info-circle" />&nbsp;
                {T.translate(`debug.notificationSettings.snoozeTime.${this.props.language}`)}:&nbsp;&nbsp;
              </span>
              <Tooltip
                for="#snoozeTimeToolTip"
                title={T.translate(`debug.notificationSettings.snoozeTimeToolTip.${this.props.language}`)}
              />
              <Spinner
                id="value"
                type="number"
                onChange={event => this.changeSnoozeTime(event.value)}
                onBlur={event => this.saveSnoozeTime(event.value)}
                value={this.props.snoozeTime}
                min={this.props.minimumSnoozeTime || MINIMUM_SNOOZE_TIME}
                max={this.props.maximumSnoozeTime || MAXIMUM_SNOOZE_TIME}
                maxlength={2}
              />
              <span>&nbsp;&nbsp;{T.translate(`time.minutes.${this.props.language}`)}</span>
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
    snoozeTime: state.debugReducer.snoozeTime,
    isLedBlinkingEnabled: state.debugReducer.isLedBlinkingEnabled,
    isVibrationEnabled: state.debugReducer.isVibrationEnabled,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeIsLedBlinkingEnabled: DebugActions.changeIsLedBlinkingEnabled,
    changeIsVibrationEnabled: DebugActions.changeIsVibrationEnabled,
    changeSnoozeTime: DebugActions.changeSnoozeTime,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSettings);
