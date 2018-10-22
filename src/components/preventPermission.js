/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import { T } from '../utilities/translator';

class PreventPermission extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    permission: PropTypes.bool.isRequired,
    permissionTitle: PropTypes.string.isRequired,
    period: PropTypes.string,
    onPermissionChange: PropTypes.func.isRequired,
    onPeriodChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="row">
        <div className="col-10 offset-1 mt-3 d-flex">
          <Checkbox
            inputId="agreement"
            checked={this.props.permission}
            onChange={e => this.props.onPermissionChange(e.checked)}
          />
          <label htmlFor="agreement">{this.props.permissionTitle}</label>
        </div>
        {!this.props.permission &&
          <div className="row">
            <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6">
              <h5>{T.translate(`parameters.doNotReceive.${this.props.language}`)}:</h5>
            </div>
            <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6" >
              <RadioButton
                inputId="doNotReceiveDay" value="day"
                onChange={() => this.props.onPeriodChange('day')}
                checked={this.props.period === 'day'}
              />
              <label htmlFor="doNotReceiveDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
            </div>
            <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6" >
              <RadioButton
                inputId="doNotReceiveWeek" value="week"
                onChange={() => this.props.onPeriodChange('week')}
                checked={this.props.period === 'week'}
              />
              <label htmlFor="doNotReceiveWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
            </div>
            <div className="col-9 offset-3 col-md-6 offset-md-4 col-lg-6 offset-lg-6">
              <RadioButton
                inputId="doNotReceiveMonth" value="month"
                onChange={() => this.props.onPeriodChange('month')}
                checked={this.props.period === 'month'}
              />
              <label htmlFor="doNotReceiveMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
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

export default connect(mapStateToProps)(PreventPermission);
