/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { Growl } from 'primereact/components/growl/Growl';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CustomCard from '../components/shared/card';
import DbActions from '../components/settings/dbActions';
import Loading from '../components/shared/loading';
import MemoryUsage from '../components/settings/memoryUsage';
import ModuleStatus from '../components/settings/moduleStatus';
import Notification from '../components/settings/notification';
import NotificationSettings from '../components/settings/notificationSettings';
import Permissions from '../components/settings/permissions';
import { SEC_IN_MIN } from '../utilities/constants';
import { SettingsActions } from '../redux/settingsReducer';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import UpdatesManager from '../components/settings/updatesManager';
import Wifi from '../components/settings/wifi';
import { get } from '../utilities/secureHTTP';

class Settings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    dataAgreement: PropTypes.bool.isRequired,
    totalMemory: PropTypes.number.isRequired,
    usedMemory: PropTypes.number.isRequired,
    snoozeTime: PropTypes.number.isRequired,
    isLedBlinkingEnabled: PropTypes.bool.isRequired,
    isVibrationEnabled: PropTypes.bool.isRequired,
    modulesStatus: PropTypes.object.isRequired,
    isUpdateAvailable: PropTypes.bool.isRequired,
    isWifiConnected: PropTypes.bool.isRequired,
    changeDataAgreement: PropTypes.func.isRequired,
    changeTotalMemory: PropTypes.func.isRequired,
    changeUsedMemory: PropTypes.func.isRequired,
    changeSnoozeTime: PropTypes.func.isRequired,
    changeIsLedBlinkingEnabled: PropTypes.func.isRequired,
    changeIsVibrationEnabled: PropTypes.func.isRequired,
    changeModulesStatus: PropTypes.func.isRequired,
    changeIsUpdateAvailable: PropTypes.func.isRequired,
    changeIsWifiConnected: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoaded: false,
      hasUpdateInfoErrors: false,
      hasModulesStatusErrors: false,
      hasMemoryUsageErrors: false,
      hasNotificationSettingsErrors: false,
      hasPermissionsErrors: false,
      hasWifiConnectionErrors: false,
    };
    this.load();
  }

  async load() {
    const promises = Promise.all([
      this.loadUpdateInfo(),
      this.loadModulesStatus(),
      this.loadMemoryUsage(),
      this.loadNotificationSettings(),
      this.loadPermissions(),
      this.loadWifiConnection(),
    ]);

    await promises;
    this.setState({ isLoaded: true });
  }

  async loadWifiConnection() {
    try {
      const response = await get(`${URL}wifi`);
      this.props.changeIsWifiConnected(response.data.connected);
    } catch (error) {
      this.setState({ hasWifiConnectionErrors: true });
    }
  }

  async loadUpdateInfo() {
    try {
      const response = await get(`${URL}updates`);
      this.props.changeIsUpdateAvailable(response.data.isAvailable);
    } catch (error) {
      this.setState({ hasUpdateInfoErrors: true });
    }
  }

  async loadModulesStatus() {
    try {
      const response = await get(`${URL}Debug`);
      this.props.changeModulesStatus(response.data);
    } catch (error) {
      this.setState({ hasModulesStatusErrors: true });
    }
  }

  async loadMemoryUsage() {
    try {
      const response = await get(`${URL}memory`);
      this.props.changeTotalMemory(response.data.total);
      this.props.changeUsedMemory(response.data.used);
    } catch (error) {
      this.setState({ hasMemoryUsageErrors: true });
    }
  }

  async loadNotificationSettings() {
    try {
      const response = await get(`${URL}notificationSettings`);
      this.props.changeIsLedBlinkingEnabled(response.data.isLedBlinkingEnabled);
      this.props.changeIsVibrationEnabled(response.data.isVibrationEnabled);
      this.props.changeSnoozeTime(response.data.snoozeTime / SEC_IN_MIN);
    } catch (error) {
      this.setState({ hasNotificationSettingsErrors: true });
    }
  }

  async loadPermissions() {
    try {
      const response = await get(`${URL}dataAgreement`);
      this.props.changeDataAgreement(response.data.dataAgreement);
    } catch (error) {
      this.setState({ hasPermissionsErrors: true });
    }
  }

  showSuccess() {
    this.growl.show({
      severity: 'success',
      summary: T.translate(`saveMessage.success.${this.props.language}`),
    });
  }

  showError() {
    this.growl.show({
      severity: 'error',
      summary: T.translate(`saveMessage.error.${this.props.language}`),
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <Loading key="loading" />;
    }
    return (
      <div>
        <Growl ref={(growl) => { this.growl = growl; }} position="topright" />
        <div className="mt-4">
          <h2 className="header text-center">{T.translate(`settings.${this.props.language}`)}</h2>
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2">
              <Notification />
              <DbActions />
              <CustomCard
                header={<span className="ui-card-title">{T.translate(`settings.modules.${this.props.language}`)}</span>}
                element={(
                  <ModuleStatus
                    moduleStatus={this.props.modulesStatus}
                    hasErrors={this.state.hasModulesStatusErrors}
                    changeModulesStatus={this.props.changeModulesStatus}
                  />
                )}
              />
              <CustomCard
                header={<span className="ui-card-title">{T.translate(`settings.notification.${this.props.language}`)}</span>}
                element={(
                  <NotificationSettings
                    snoozeTime={this.props.snoozeTime}
                    isLedBlinkingEnabled={this.props.isLedBlinkingEnabled}
                    isVibrationEnabled={this.props.isVibrationEnabled}
                    changeSnoozeTime={this.props.changeSnoozeTime}
                    changeIsLedBlinkingEnabled={this.props.changeIsLedBlinkingEnabled}
                    changeIsVibrationEnabled={this.props.changeIsVibrationEnabled}
                    hasErrors={this.state.hasNotificationSettingsErrors}
                    showSuccess={this.showSuccess.bind(this)}
                    showError={this.showSuccess.bind(this)}
                  />
                )}
              />
              <CustomCard
                header={<span className="ui-card-title">{T.translate(`settings.wifi.${this.props.language}`)}</span>}
                element={(
                  <Wifi
                    isConnected={this.props.isWifiConnected}
                    changeIsConnected={this.props.changeIsWifiConnected}
                    hasErrors={this.state.hasWifiConnectionErrors}
                  />
                )}
              />
              <CustomCard
                header={<span className="ui-card-title">{T.translate(`settings.permissions.${this.props.language}`)}</span>}
                element={(
                  <Permissions
                    dataAgreement={this.props.dataAgreement}
                    changeDataAgreement={this.props.changeDataAgreement}
                    hasErrors={this.state.hasPermissionsErrors}
                    showSuccess={this.showSuccess.bind(this)}
                    showError={this.showSuccess.bind(this)}
                  />
                )}
              />
              <CustomCard
                header={<span className="ui-card-title">{T.translate(`settings.system.${this.props.language}`)}</span>}
                element={(
                  <div>
                    <h6>{T.translate(`settings.system.memory.${this.props.language}`)}</h6>
                    <MemoryUsage
                      total={this.props.totalMemory}
                      used={this.props.usedMemory}
                      hasErrors={this.state.hasMemoryUsageErrors}
                    />
                    <br />
                    <h6>{T.translate(`settings.system.update.${this.props.language}`)}</h6>
                    <UpdatesManager
                      isUpdateAvailable={this.props.isUpdateAvailable}
                      changeIsUpdateAvailable={this.props.changeIsUpdateAvailable}
                      hasErrors={this.state.hasUpdateInfoErrors}
                    />
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    dataAgreement: state.settingsReducer.dataAgreement,
    totalMemory: state.settingsReducer.totalMemory,
    usedMemory: state.settingsReducer.usedMemory,
    snoozeTime: state.settingsReducer.snoozeTime,
    isLedBlinkingEnabled: state.settingsReducer.isLedBlinkingEnabled,
    isVibrationEnabled: state.settingsReducer.isVibrationEnabled,
    modulesStatus: state.settingsReducer.modulesStatus,
    isUpdateAvailable: state.settingsReducer.isUpdateAvailable,
    isWifiConnected: state.settingsReducer.isWifiConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeDataAgreement: SettingsActions.changeDataAgreement,
    changeTotalMemory: SettingsActions.changeTotalMemory,
    changeUsedMemory: SettingsActions.changeUsedMemory,
    changeIsLedBlinkingEnabled: SettingsActions.changeIsLedBlinkingEnabled,
    changeIsVibrationEnabled: SettingsActions.changeIsVibrationEnabled,
    changeSnoozeTime: SettingsActions.changeSnoozeTime,
    changeModulesStatus: SettingsActions.changeModulesStatus,
    changeIsUpdateAvailable: SettingsActions.changeIsUpdateAvailable,
    changeIsWifiConnected: SettingsActions.changeIsWifiConnected,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
