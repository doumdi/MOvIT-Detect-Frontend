/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../styles/components/updatesManager.css'

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import ConfirmationPopup from './popups/confirmationPopup';
import Countdown from './countdown';
import { DebugActions } from '../redux/debugReducer';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { URL } from '../redux/applicationReducer';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const POLLING_INTERVAL = 10000;
const COUNTDOWN_TIME = 10;

class UpdatesManager extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      isAvailable: true,
      date: null,
      isPopupOpened: false,
    }
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateData();
  }

  componentDidMount() {
    this.poll(); 
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  toggleModal() {
    this.setState({
      isPopupOpened: !this.state.isPopupOpened
    });
  }

  poll() {
    this.timer = setInterval(async () => {
      this.updateData();
    }, POLLING_INTERVAL);
  }

  mapData(response) {
    const date = new Date(response.date);
    date.setUTCHours(0, date.getTimezoneOffset(), 0, 0);

    this.setState({
      'isAvailable': response.isAvailable,
      'date': date.toISOString().split('T')[0],
    });
  }
  
  async updateData() {
    const status = await this.getUpdateData();
    this.mapData(status);
  }

  async getUpdateData() {
    try {
      const response = await axios.get(`${URL}updates`, this.props.header);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async triggerUpdate() {
    try {
      await axios.post(`${URL}updates`, this.props.header);
    } catch (error) {
      console.log(error);
    }
    this.toggleModal();
  }

  render() {
    const header = (
      <div className="ui-card-title header">
        {T.translate(`debug.update.${this.props.language}`)}
      </div>
    );
    return (
      <div className="container">
        <div className="card">
          <Card header={header}>
            <div>
              <button
                id="updateButton"
                className={`btn ui-button-secondary ${this.state.isAvailable ? 'btn-danger' : 'btn-default'}`}
                disabled={!this.state.isAvailable}
                onClick={() => this.toggleModal()}>
                  <i className="fa fa-2x fa-refresh" />
              </button>
              <div>
                {T.translate(`debug.update.last.${this.props.language}`)}:&nbsp;
                {this.state.date}
              </div>
            </div>
          </Card>
        </div>
        <ConfirmationPopup
          title={T.translate(`debug.update.${this.props.language}`)}
          body={T.translate(`debug.update.confirmation.${this.props.language}`)}
          show={this.state.isPopupOpened}
          onConfirm={this.triggerUpdate}
          onClose={this.toggleModal}>
        </ConfirmationPopup>
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

export default connect(mapStateToProps)(UpdatesManager);
