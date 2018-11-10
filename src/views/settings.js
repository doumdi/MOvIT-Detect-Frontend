/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../styles/card.css';

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemoryUsage from '../components/settings/memoryUsage';
import Notification from '../components/settings/notification';
import NotificationSettings from '../components/settings/notificationSettings';
import Permissions from '../components/settings/permissions';
import { T } from '../utilities/translator';
import UpdatesManager from '../components/settings/updatesManager';

class Settings extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    const header = (
      <div className="ui-card-title header">
        {T.translate(`settings.system.${this.props.language}`)}
      </div>
    );
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="header text-center">{T.translate(`settings.${this.props.language}`)}</h2>
            <Notification />
            <NotificationSettings />
            <Permissions />
            <div className="container">
              <div className="card">
                <Card header={header}>
                  <h6>{T.translate(`settings.system.memory.${this.props.language}`)}</h6>
                  <MemoryUsage />
                  <br />
                  <h6>{T.translate(`settings.system.update.${this.props.language}`)}</h6>
                  <UpdatesManager />
                </Card>
              </div>
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
  };
}

export default connect(mapStateToProps)(Settings);
