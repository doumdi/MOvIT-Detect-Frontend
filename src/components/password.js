/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message } from 'primereact/components/message/Message';
import { T } from '../utilities/translator';

class Password extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    failed: PropTypes.bool.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      failed: this.props.failed,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.failed !== this.state.failed) {
      this.setState({ failed: nextProps.failed });
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(this.state.password);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="ui-inputgroup col-8 offset-2">
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder={T.translate(`login.password.${this.props.language}`)}
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value, failed: false })}
            onKeyPress={e => this.onKeyPress(e)}
            style={this.state.failed ? { borderColor: 'red' } : {}}
          />
          <button
            id="loginBtn" onClick={() => this.props.onSubmit(this.state.password)}
            cornerStyleClass="ui-button-secondary"
          >
            <i className="fa fa-sign-in" />
          </button>
        </div>
        <div className="ui-inputgroup col-8 offset-2">
          <button type="button" id="forgotPasswordBtn" className="btn btn-link pl-0" onClick={() => this.props.onForgotPassword()}>
            {T.translate(`login.forgotPassword.${this.props.language}`)}
          </button>
        </div>
        {
          this.state.failed &&
          <div className="row" style={{ marginTop: '2px' }}>
            <div className="col-8 offset-2">
              <Message id="errorMsg" severity="error" text={T.translate(`login.wrongPassword.${this.props.language}`)} />
            </div>
          </div>
        }
      </div >
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(Password);
