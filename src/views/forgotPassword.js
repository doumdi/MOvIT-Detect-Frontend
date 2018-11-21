import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import SubmitButtons from '../components/shared/submitButtons';
import LogoText from '../components/shared/logoText';
import { post } from '../utilities/secureHTTP';

class ForgotPassword extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
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
      userName,
      secret: this.state.secret,
      newPassword: this.state.password,
    };
    post(`${URL}forgotPassword`, data);
    this.props.history.push('/home');
  }

  cancel() {
    this.setState({ secret: '', password: '' });
  }

  render() {
    return (
      <div className="mt-4">
        <div className="col-12">
          <legend className="text-center header"><h2>{T.translate(`login.forgotPassword.${this.props.language}`)}</h2></legend>
          <div className="mt-5">
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
