/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';
import Notification from '../components/notification';
import NotificationSettings from '../components/notificationSettings';
import UpdatesManager from '../components/updatesManager';

class Debug extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="header text-center">{T.translate(`debug.state.${this.props.language}`)}</h2>
            <Notification />
            <NotificationSettings />
            <UpdatesManager />
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
