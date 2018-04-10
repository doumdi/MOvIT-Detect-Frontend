import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/components/button/Button';

export default class Password extends Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit();
    }
  }

  render() {
    return (
      <div>
        <div className="col-sm-2" />
        <div className="ui-inputgroup col-sm-8">
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            value={this.props.value}
            onKeyPress={e => this.onKeyPress(e)}
            onChange={e => this.props.onChange(e.target.value)}
          />
          <Button onClick={() => this.props.onSubmit()} icon="fa-sign-in" cornerStyleClass="ui-button-secondary" />
        </div>
      </div>
    );
  }
}
