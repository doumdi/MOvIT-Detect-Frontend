/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../../redux/applicationReducer';
import { T } from '../../utilities/translator';
import ConfirmationPopup from '../popups/confirmationPopup';

class DbActions extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
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
    await axios.post(`${URL}simulateDatabase`, this.props.header);
  }

  async resetDatabase() {
    this.setState({ showResetConfirmation: false });
    await axios.post(`${URL}resetDatabase`, this.props.header);
  }

  render() {
    return (
      <div className="row ml-2">
        <div className="mr-3 mb-2">
          <button id="simulate-data-button" type="button" onClick={() => this.confirmDataSimulation()} className="btn btn-lg">
            {T.translate(`database.simulate.${this.props.language}`)}
          </button>
        </div>
        <div className="mr-3 mb-2">
          <button id="reset-data-button" type="button" onClick={() => this.confirmDatabaseReset()} className="btn btn-lg">
            {T.translate(`database.reset.${this.props.language}`)}
          </button>
        </div>
        <ConfirmationPopup
          title={T.translate(`database.warning.title.${this.props.language}`)}
          body={T.translate(`database.warning.message.${this.props.language}`)}
          show={this.state.showSimulationConfirmation}
          onConfirm={this.simulateData.bind(this)}
          onClose={this.cancelDataSimulation.bind(this)}
        />
        <ConfirmationPopup
          title={T.translate(`database.warning.title.${this.props.language}`)}
          body={T.translate(`database.warning.message.${this.props.language}`)}
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
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(DbActions);
