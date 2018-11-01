import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import SubmitButtons from '../components/submitButtons';
import LogoText from '../components/logoText';


class ForgotPassword extends Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);
    this.state = {
      secret: '',
      password: '',
    };
    this.changeSecret = this.changeSecret.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeSecret(secretString) {
    this.setState({ secret: secretString });
  }

  changePassword(passwordString) {
    this.setState({ password: passwordString });
  }

  save() {
    const params = new URLSearchParams(this.props.location.search);
    const userName = params.get('user');
    const data = {
      user: userName,
      secret: this.state.secret,
      passwrd: this.state.password,
    };
    axios.post(`${URL}forgotPassword`, data)
      .then(() => this.props.history.push('/home'))
      .catch(console.error);
  }

  cancel() {
    this.setState({ secret: '', password: '' });
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
          <legend className="text-center header"><h2>{T.translate(`login.forgotPassword.${this.props.language}`)}</h2></legend>
          <div>
            <div className="form-horizontal">
              <LogoText
                iconClass="fa fa-puzzle-piece"
                placeHolder={T.translate(`login.forgotPassword.secret.${this.props.language}`)}
                value={this.state.secret}
                onChange={this.changeSecret}
              />
              <LogoText
                iconClass="fa fa-key"
                placeHolder={T.translate(`login.newPassword.${this.props.language}`)}
                value={this.state.password}
                onChange={this.changePassword}
              />
            </div>
            <SubmitButtons
              onSave={this.save.bind(this)}
              onCancel={this.cancel.bind(this)}
            />
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

export default connect(mapStateToProps)(ForgotPassword);
