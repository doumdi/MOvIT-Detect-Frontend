import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'primereact/components/button/Button';
import { Message } from 'primereact/components/message/Message';
import { T } from '../index';

class Password extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    failed: PropTypes.bool.isRequired,
  }
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
            <Button onClick={() => this.props.onSubmit(this.state.password)} icon="fa-sign-in" cornerStyleClass="ui-button-secondary" />
          </div>
        </div>
        { this.state.failed &&
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