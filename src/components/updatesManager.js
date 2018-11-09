/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import ConfirmationPopup from './popups/confirmationPopup';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import axios from 'axios';
import { connect } from 'react-redux';

const POLLING_INTERVAL = 10000;

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
    this.updateData();
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
    return (
      <div>
        <button
          id="updateButton"
          className={`btn ui-button-secondary ${this.state.isAvailable ? 'btn-danger' : 'btn-default'}`}
          disabled={!this.state.isAvailable}
          onClick={() => this.toggleModal()}>
            <i className="fa fa-2x fa-refresh" />
        </button>
        <div>
          {T.translate(`debug.system.update.last.${this.props.language}`)}:&nbsp;
          {this.state.date}
        </div>
        <ConfirmationPopup
          title={T.translate(`debug.system.update.${this.props.language}`)}
          body={T.translate(`debug.system.update.confirmation.${this.props.language}`)}
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
