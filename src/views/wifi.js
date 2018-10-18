import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import SubmitButtons from '../components/submitButtons';
import LogoText from '../components/logoText';
import LogoPassword from '../components/logoPassword';
import Loading from '../components/loading';


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
    };
    this.changeWifi = this.changeWifi.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.getInitialConnection();
  }

  getInitialConnection() {
    axios.get(`${URL}wifi`)
      .then((response) => {
        if (response.data.connected) {
          this.setState({ connected: true });
        }
        this.setState({ connecting: false });
      })
      .catch((error) => { this.setState({ connecting: false }); console.log(error); });
  }

  enableConnection() {
    this.setState({ connecting: false, connected: false });
  }


  changeWifi(wifiName) {
    this.setState({ wifi: wifiName });
  }

  changePassword(passwordString) {
    this.setState({ password: passwordString });
  }

  save() {
    axios.post(`${URL}wifi`, this.state)
      .then(() => this.waitConnection())
      .catch(console.error);
  }

  waitConnection() {
    this.setState({ connecting: true });
    let tries = 0;
    const connectionValidation = window.setInterval(() => {
      if (tries >= 15) {
        window.clearInterval(connectionValidation);
        this.setState({ ...this.state, connecting: false, connected: false });
      } else {
        tries += 1;
        console.log(tries);
        axios.get(`${URL}wifi`)
          .then((response) => {
            if (response.data.connected) {
              window.clearInterval(connectionValidation);
              this.setState({ ...this.state, connecting: false, connected: true });
            }
          })
          .catch(() => { window.clearInterval(connectionValidation); this.setState({ ...this.state, connecting: false, connected: false }); });
      }
    }, 1000);
  }

  cancel() {
    this.setState({ wifi: '', password: '' });
  }

  render() {
    return (
      <div className="mt-3">
        <div className="col-md-12">
          <legend className="text-center header"><h2>{T.translate(`wifi.${this.props.language}`)}</h2></legend>
          {this.state.connected
            ? <h2 className="text-center" >
              {T.translate(`wifi.connected.${this.props.language}`)}
              <button type="button" className="btn btn-link" onClick={() => this.enableConnection()}>
                <h2>{T.translate(`wifi.changeWifi.${this.props.language}`)}</h2>
              </button>
            </h2>
            : [
              (this.state.connecting ?
                <Loading />
                :
                <div className="row">
                  <div className="form-horizontal mt-3 col-12 col-md-8 offset-md-2">
                    <LogoText
                      iconClass="fa fa-wifi"
                      placeHolder={T.translate(`wifi.name.${this.props.language}`)}
                      value={this.state.wifi}
                      onChange={this.changeWifi}
                    />
                    <LogoPassword
                      iconClass="fa fa-key"
                      placeHolder={T.translate(`login.password.${this.props.language}`)}
                      value={this.state.password}
                      onChange={this.changePassword}
                    />
                  </div>
                  <SubmitButtons
                    onSave={this.save.bind(this)}
                    onCancel={this.cancel.bind(this)}
                  />
                </div>
              ),
            ]
          }
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

export default connect(mapStateToProps)(Wifi);
