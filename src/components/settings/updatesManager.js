/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button } from 'primereact/components/button/Button';
import ConfirmationPopup from '../popups/confirmationPopup';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';

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
    };
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.poll();
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  async getUpdateData() {
    try {
      const response = await axios.get(`${URL}updates`, this.props.header);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.setState({ isPopupOpened: true });
  }

  closeModal() {
    this.setState({ isPopupOpened: false });
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
      isAvailable: response.isAvailable,
      date: date.toISOString().split('T')[0],
    });
  }

  async updateData() {
    const status = await this.getUpdateData();
    this.mapData(status);
  }

  async triggerUpdate() {
    try {
      await axios.post(`${URL}updates`, this.props.header);
    } catch (error) {
      console.log(error);
    }
    this.closeModal();
  }

  render() {
    return (
      <div>
        <Button
          id="updateButton"
          className={`${this.state.isAvailable ? 'p-button-danger' : 'p-button-secondary'}`}
          disabled={!this.state.isAvailable}
          onClick={() => this.openModal()}
          icon="fa fa-2x fa-refresh"
        />
        <div>
          {T.translate(`settings.system.update.last.${this.props.language}`)}

          : &nbsp;
          {this.state.date}
        </div>
        <ConfirmationPopup
          title={T.translate(`settings.system.update.${this.props.language}`)}
          body={T.translate(`settings.system.update.confirmation.${this.props.language}`)}
          show={this.state.isPopupOpened}
          onConfirm={this.triggerUpdate}
          onClose={this.closeModal}
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

export default connect(mapStateToProps)(UpdatesManager);
