/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../styles/views/debug.css';

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MemoryUsage from '../components/memoryUsage';
import Notification from '../components/notification';
import NotificationSettings from '../components/notificationSettings';
import { T } from '../utilities/translator';
import UpdatesManager from '../components/updatesManager';

class Debug extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    const header = (
      <div className="ui-card-title header">
        {T.translate(`debug.system.${this.props.language}`)}
      </div>
    );
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="header text-center">{T.translate(`debug.state.${this.props.language}`)}</h2>
            <Notification />
            <NotificationSettings />
            <div className="container">
              <div className="card">
                <Card header={header}>
                  <h6>{T.translate(`debug.system.memory.${this.props.language}`)}</h6>
                  <MemoryUsage />
                  <br />
                  <h6>{T.translate(`debug.system.update.${this.props.language}`)}</h6>
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

export default connect(mapStateToProps)(Debug);
