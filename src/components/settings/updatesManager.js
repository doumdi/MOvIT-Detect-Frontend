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
import { get } from '../../utilities/secureHTTP';

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
    const response = await get(`${URL}updates`);
    return response.data;
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
      await post(`${URL}updates`);
    } catch (error) {
      console.log(error);
    }
    this.closeModal();
  }

  render() {
    return (
      <div>
        <button
          id="updateButton"
          className={`btn ui-button-secondary ${this.state.isAvailable ? 'btn-danger' : 'btn-default'}`}
          disabled={!this.state.isAvailable}
          onClick={() => this.openModal()}
        >
          <i className="fa fa-2x fa-refresh" />
        </button>
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
