/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
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
      <div className="col-sm-12">
        <div className="col-sm-12">
          <div className="col-sm-2" />
          <div className="ui-inputgroup col-sm-8">
            <input
              className="form-control"
              type="password"
              placeholder={T.translate(`login.password.${this.props.language}`)}
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value, failed: false })}
              onKeyPress={e => this.onKeyPress(e)}
              style={this.state.failed ? { borderColor: 'red' } : {}}
            />
            <button onClick={() => this.props.onSubmit(this.state.password)} ><i className="fa fa-sign-in" /></button>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="col-sm-2" />
          <div className="ui-inputgroup col-sm-8">
            <a style={{ cursor: 'pointer' }} onClick={() => this.props.onForgotPassword()}>{T.translate(`login.forgotPassword.${this.props.language}`)}</a>
          </div>
        </div>
        {this.state.failed &&
          <div className="col-sm-12" style={{ marginTop: '2px' }}>
            <div className="col-sm-2" />
            <div className="col-sm-8" >
              <Message severity="error" text={T.translate(`login.wrongPassword.${this.props.language}`)} />
            </div>
          </div>
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

export default connect(mapStateToProps)(Password);
