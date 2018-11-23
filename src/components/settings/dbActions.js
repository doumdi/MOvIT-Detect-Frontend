/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmationPopup from '../popups/confirmationPopup';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';
import { post } from '../../utilities/secureHTTP';

class DbActions extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showSimulationConfirmation: false,
      showResetConfirmation: false,
    };
    this.simulateData = this.simulateData.bind(this);
    this.resetDatabase = this.resetDatabase.bind(this);
  }

  confirmDataSimulation() {
    this.setState({ showSimulationConfirmation: true });
  }

  confirmDatabaseReset() {
    this.setState({ showResetConfirmation: true });
  }

  cancelDataSimulation() {
    this.setState({ showSimulationConfirmation: false });
  }

  cancelDatabaseReset() {
    this.setState({ showResetConfirmation: false });
  }

  async simulateData() {
    this.setState({ showSimulationConfirmation: false });
    await post(`${URL}simulateDatabase`);
  }

  async resetDatabase() {
    this.setState({ showResetConfirmation: false });
    await post(`${URL}resetDatabase`);
  }

  render() {
    return (
      <div className="row ml-2">
        <div className="mr-3 mb-2">
          <button id="simulate-data-button" type="button" onClick={() => this.confirmDataSimulation()} className="btn btn-lg">
            {T.translate(`settings.database.simulate.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button id="reset-data-button" type="button" onClick={() => this.confirmDatabaseReset()} className="btn btn-lg">
            {T.translate(`settings.database.reset.${this.props.language}`)}
          </button>
        </div>
        <ConfirmationPopup
          title={T.translate(`settings.database.warning.title.${this.props.language}`)}
          body={T.translate(`settings.database.warning.message.${this.props.language}`)}
          show={this.state.showSimulationConfirmation}
          onConfirm={this.simulateData.bind(this)}
          onClose={this.cancelDataSimulation.bind(this)}
        />
        <ConfirmationPopup
          title={T.translate(`settings.database.warning.title.${this.props.language}`)}
          body={T.translate(`settings.database.warning.message.${this.props.language}`)}
          show={this.state.showResetConfirmation}
          onConfirm={this.resetDatabase.bind(this)}
          onClose={this.cancelDatabaseReset.bind(this)}
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

export default connect(mapStateToProps)(DbActions);
