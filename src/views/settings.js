/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomCard from '../components/shared/card';
import MemoryUsage from '../components/settings/memoryUsage';
import ModuleStatus from '../components/settings/moduleStatus';
import Notification from '../components/settings/notification';
import NotificationSettings from '../components/settings/notificationSettings';
import Permissions from '../components/settings/permissions';
import { T } from '../utilities/translator';
import UpdatesManager from '../components/settings/updatesManager';
import Wifi from '../components/settings/wifi';
import DbActions from '../components/settings/dbActions';

class Settings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    const element = (
      <div>
        <h6>{T.translate(`settings.system.memory.${this.props.language}`)}</h6>
        <MemoryUsage />
        <br />
        <h6>{T.translate(`settings.system.update.${this.props.language}`)}</h6>
        <UpdatesManager />
      </div>
    );
    return (
      <div className="mt-3">
        <h2 className="header text-center">{T.translate(`settings.${this.props.language}`)}</h2>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2">
            <Notification />
            <DbActions />
            <CustomCard
              header={<span className="ui-card-title">{T.translate(`settings.modules.${this.props.language}`)}</span>}
              element={<ModuleStatus />}
            />
            <CustomCard
              header={<span className="ui-card-title">{T.translate(`settings.notification.${this.props.language}`)}</span>}
              element={<NotificationSettings />}
            />
            <CustomCard
              header={<span className="ui-card-title">{T.translate(`settings.wifi.${this.props.language}`)}</span>}
              element={<Wifi />}
            />
            <CustomCard
              header={<span className="ui-card-title">{T.translate(`settings.permissions.${this.props.language}`)}</span>}
              element={<Permissions />}
            />
            <CustomCard
              header={<span className="ui-card-title">{T.translate(`settings.system.${this.props.language}`)}</span>}
              element={element}
            />
          </div>
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

export default connect(mapStateToProps)(Settings);
