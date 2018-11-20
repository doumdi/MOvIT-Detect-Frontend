import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../shared/loading';
import LogoPassword from '../shared/logoPassword';
import LogoText from '../shared/logoText';
import SubmitButtons from '../shared/submitButtons';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';
import { get, post } from '../../utilities/secureHTTP';

const NUMBER_OF_RETRIES = 15;
const RETRY_INTERVAL = 1000;
const ENTER_KEY = 'Enter';

class Wifi extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      wifi: '',
      password: '',
      connected: false,
      connecting: true,
      changingNetwork: false,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.changeWifi = this.changeWifi.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.getInitialConnection();
  }

  async getInitialConnection() {
    try {
      const response = await get(`${URL}wifi`);
      if (response.data.connected) {
        this.setState({ connected: true });
      }
    } catch (error) {
      this.setState({ connecting: false });
    }
  }

  enableConnection() {
    this.setState({ connecting: false, connected: false, changingNetwork: true });
  }

  changeWifi(wifiName) {
    this.setState({ wifi: wifiName });
  }

  changePassword(passwordString) {
    this.setState({ password: passwordString });
  }

  save() {
    post(`${URL}wifi`, this.state);
    this.waitConnection();
  }

  waitConnection() {
    this.setState({ connecting: true });
    let tries = 0;
    const connectionValidation = window.setInterval(async () => {
      if (tries >= NUMBER_OF_RETRIES) {
        window.clearInterval(connectionValidation);
        this.setState({ ...this.state, connecting: false, connected: false });
      } else {
        tries += 1;
        const response = await get(`${URL}wifi`);
        if (response.data.connected) {
          window.clearInterval(connectionValidation);
          this.setState({ ...this.state, connecting: false, connected: true });
        } else {
          window.clearInterval(connectionValidation);
          this.setState({ ...this.state, connecting: false, connected: false });
        }
      }
    }, RETRY_INTERVAL);
  }

  handleKeyPress(event) {
    if (event.key === ENTER_KEY) {
      this.save();
    }
  }

  cancel() {
    this.setState({
      wifi: '',
      password: '',
      connected: true,
      changingNetwork: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.connected
          && (
            <h6>
              {T.translate(`settings.wifi.connected.${this.props.language}`)}
              <button type="button" className="btn btn-link" onClick={() => this.enableConnection()}>
                <h6>{T.translate(`settings.wifi.changeWifi.${this.props.language}`)}</h6>
              </button>
            </h6>
          )
        }
        {!this.state.connected
          && (this.state.connecting
            ? <Loading key="loading" />
            : (
              <div className="row">
                <div className="form-horizontal col-12 col-md-8">
                  <LogoText
                    iconClass="fa fa-wifi"
                    placeHolder={T.translate(`settings.wifi.name.${this.props.language}`)}
                    value={this.state.wifi}
                    onChange={this.changeWifi}
                  />
                  <LogoPassword
                    iconClass="fa fa-key"
                    placeHolder={T.translate(`login.password.${this.props.language}`)}
                    value={this.state.password}
                    onChange={this.changePassword}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
                <SubmitButtons
                  displayCancel={this.state.changingNetwork}
                  onSave={this.save.bind(this)}
                  onCancel={this.cancel.bind(this)}
                />
              </div>
            )
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(Wifi);
