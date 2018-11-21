/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'primereact/components/button/Button';
import ConfirmationPopup from '../popups/confirmationPopup';
import ErrorMessage from '../shared/errorMessage';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';
import { get, post } from '../../utilities/secureHTTP';

const POLLING_INTERVAL = 10000;

class UpdatesManager extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    lastUpdateDate: PropTypes.string.isRequired,
    isUpdateAvailable: PropTypes.bool.isRequired,
    changeLastUpdateDate: PropTypes.func.isRequired,
    changeIsUpdateAvailable: PropTypes.func.isRequired,
    hasErrors: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
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

  async getUpdates() {
    try {
      const response = await get(`${URL}updates`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async triggerUpdatesChange() {
    const response = await this.getUpdates();
    this.props.changeIsUpdateAvailable(response.isAvailable);
    this.props.changeLastUpdateDate(response.date);
  }

  openModal() {
    this.setState({ isPopupOpened: true });
  }

  closeModal() {
    this.setState({ isPopupOpened: false });
  }

  poll() {
    this.timer = setInterval(async () => {
      this.triggerUpdatesChange();
    }, POLLING_INTERVAL);
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
    if (this.props.hasErrors) {
      return <ErrorMessage />;
    }
    return (
      <div>
        <Button
          id="updateButton"
          style={{ backgroundColor: this.props.isUpdateAvailable ? '#dc3545' : '#fafafa' }}
          className="p-button-secondary"
          disabled={!this.props.isUpdateAvailable}
          onClick={() => this.openModal()}
          icon="fa fa-2x fa-refresh"
        />
        <div>
          {T.translate(`settings.system.update.last.${this.props.language}`)}
          : &nbsp;
          {this.props.lastUpdateDate}
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
