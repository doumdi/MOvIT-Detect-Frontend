/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import PropTypes from 'prop-types';
import { Spinner } from 'primereact/components/spinner/Spinner';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { URL } from '../../redux/applicationReducer';
import { T } from '../../utilities/translator';
import { DebugActions } from '../../redux/debugReducer';
import { validateToken } from '../../utilities/validateToken';

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

  async getSettings() {
    validateToken();
    try {
      const response = await axios.get(`${URL}notificationSettings`, this.props.header);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async load() {
    const settings = await this.getSettings();
    this.mapData(settings);
  }


  mapData(settings) {
    this.props.changeIsLedBlinkingEnabled(settings.isLedBlinkingEnabled);
    this.props.changeIsVibrationEnabled(settings.isVibrationEnabled);
    this.props.changeSnoozeTime(settings.snoozeTime);
  }

  enableLedBlinking() {
    validateToken();
    this.props.changeIsLedBlinkingEnabled(!this.props.isLedBlinkingEnabled);
    axios.post(`${URL}notificationSettings`, {
      isLedBlinkingEnabled: this.props.isLedBlinkingEnabled,
    }, this.props.header)
      .then(console.log)
      .catch(console.log);
  }

  enableVibration() {
    validateToken();
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

  saveSnoozeTime() {
    validateToken();
    axios.post(`${URL}notificationSettings`, {
      snoozeTime: this.props.snoozeTime,
    }, this.props.header)
      .then(console.log)
      .catch(console.log);
  }

  render() {
    return (
      <div>
        <div>
          <Checkbox
            id="enableLedBlinking"
            onChange={() => this.enableLedBlinking()}
            checked={this.props.isLedBlinkingEnabled}
          />
          <label htmlFor="enableLedBlinking">{T.translate(`settings.notification.enableLedBlinking.${this.props.language}`)}</label>
        </div>
        <div>
          <Checkbox
            id="enableVibration"
            onChange={() => this.enableVibration()}
            checked={this.props.isVibrationEnabled}
          />
          <label htmlFor="enableVibration">{T.translate(`settings.notification.enableVibration.${this.props.language}`)}</label>
        </div>
        <div>
          <span>
            <i id="snoozeTimeToolTip" className="fa fa-info-circle" />
            &nbsp;
            {T.translate(`settings.notification.snoozeTime.${this.props.language}`)}
            :&nbsp;&nbsp;
          </span>
          <Tooltip
            for="#snoozeTimeToolTip"
            title={T.translate(`settings.notification.snoozeTimeToolTip.${this.props.language}`)}
          />
          <Spinner
            id="value"
            type="number"
            onChange={event => this.changeSnoozeTime(event.value)}
            onBlur={() => this.saveSnoozeTime()}
            value={this.props.snoozeTime}
            min={this.props.minimumSnoozeTime || MINIMUM_SNOOZE_TIME}
            max={this.props.maximumSnoozeTime || MAXIMUM_SNOOZE_TIME}
            maxlength={2}
            size="3"
          />
          <span>
            &nbsp;&nbsp;
            {T.translate(`time.minutes.${this.props.language}`)}
          </span>
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
