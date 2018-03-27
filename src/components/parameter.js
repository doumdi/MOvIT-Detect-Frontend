import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';

class Parameters extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    changeDataAgreement: PropTypes.func,
    dataAgreement: PropTypes.bool,
    dataDisagreePeriod: PropTypes.string,
    changeLightAgreement: PropTypes.func,
    lightAgreement: PropTypes.string,
    lightDisagreePeriod: PropTypes.string,
    changeDataDisagreePeriod: PropTypes.func,
    changeLightDisagreePeriod: PropTypes.func,
    changeNotificationDisagreePeriod: PropTypes.func,
    changeNotificationAgreement: PropTypes.func,
    notificationAgreement: PropTypes.string,
    notificationDisagreePeriod: PropTypes.string,
  }
  save() {
    // save data to backend
    this.props.history.push('/goals');
  }

  render() {
    const style = {
      height: '80vh',
      content: {
        textAlign: 'center',
      },
      spaceTop: {
        marginTop: '2em',
      },
    };

    return (
      <div style={style}>
        <legend className="text-center header"><h2>{T.translate(`parameters.${this.props.language}`)}</h2></legend>
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <div className="col-sm-12" >
            <Checkbox
              inputId="dataAgreement"
              onChange={this.props.changeDataAgreement}
              checked={this.props.dataAgreement}
            />
            <label htmlFor="dataAgreement">{T.translate(`parameters.dataAgreement.${this.props.language}`)}</label>
          </div>
          {!this.props.dataAgreement &&
          <div>
            <div className="col-sm-12" >
              <h5>{T.translate(`parameters.doNotSend.${this.props.language}`)}:</h5>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotSendDay" value="day"
                onChange={() => this.props.changeDataDisagreePeriod('day')}
                checked={this.props.dataDisagreePeriod === 'day'}
              />
              <label htmlFor="doNotSendDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotSendWeek" value="week"
                onChange={() => this.props.changeDataDisagreePeriod('week')}
                checked={this.props.dataDisagreePeriod === 'week'}
              />
              <label htmlFor="doNotSendWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotSendMonth" value="month"
                onChange={() => this.props.changeDataDisagreePeriod('month')}
                checked={this.props.dataDisagreePeriod === 'month'}
              />
              <label htmlFor="doNotSendMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
            </div>
          </div>
          }
          <div className="col-sm-12" style={style.spaceTop}>
            <Checkbox
              inputId="lightAgreement"
              onChange={this.props.changeLightAgreement}
              checked={this.props.lightAgreement}
            />
            <label htmlFor="lightAgreement">{T.translate(`parameters.lightAgreement.${this.props.language}`)}</label>
          </div>
          {!this.props.lightAgreement &&
          <div>
            <div className="col-sm-12" >
              <h5>{T.translate(`parameters.doNotLightUp.${this.props.language}`)}:</h5>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotLightUpDay" value="day"
                onChange={() => this.props.changeLightDisagreePeriod('day')}
                checked={this.props.lightDisagreePeriod === 'day'}
              />
              <label htmlFor="doNotLightUpDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotLightUpWeek" value="week"
                onChange={() => this.props.changeLightDisagreePeriod('week')}
                checked={this.props.lightDisagreePeriod === 'week'}
              />
              <label htmlFor="doNotLightUpWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotLightUpMonth" value="month"
                onChange={() => this.props.changeLightDisagreePeriod('month')}
                checked={this.props.lightDisagreePeriod === 'month'}
              />
              <label htmlFor="doNotLightUpMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
            </div>
          </div>
          }
          <div className="col-sm-12" style={style.spaceTop}>
            <Checkbox
              inputId="notificationAgreement"
              onChange={this.props.changeNotificationAgreement}
              checked={this.props.notificationAgreement}
            />
            <label htmlFor="notificationAgreement">{T.translate(`parameters.notificationAgreement.${this.props.language}`)}</label>
          </div>
          {!this.props.notificationAgreement &&
          <div>
            <div className="col-sm-12" >
              <h5>{T.translate(`parameters.doNotReceive.${this.props.language}`)}:</h5>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotReceiveDay" value="day"
                onChange={() => this.props.changeNotificationDisagreePeriod('day')}
                checked={this.props.notificationDisagreePeriod === 'day'}
              />
              <label htmlFor="doNotReceiveDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotReceiveWeek" value="week"
                onChange={() => this.props.changeNotificationDisagreePeriod('week')}
                checked={this.props.notificationDisagreePeriod === 'week'}
              />
              <label htmlFor="doNotReceiveWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
            </div>
            <div className="col-sm-12" >
              <RadioButton
                inputId="doNotReceiveMonth" value="month"
                onChange={() => this.props.changeNotificationDisagreePeriod('month')}
                checked={this.props.notificationDisagreePeriod === 'month'}
              />
              <label htmlFor="doNotReceiveMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
            </div>
          </div>
          }
        </div>
        <div className="col-sm-9 text-right">
          <button type="submit" className="btn btn-lg">{T.translate(`cancel.${this.props.language}`)}</button>
          &nbsp;
          <button onClick={() => this.save()} className="btn btn-lg">{T.translate(`save.${this.props.language}`)}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    dataAgreement: state.applicationReducer.dataAgreement,
    lightAgreement: state.applicationReducer.lightAgreement,
    notificationAgreement: state.applicationReducer.notificationAgreement,
    dataDisagreePeriod: state.applicationReducer.dataDisagreePeriod,
    lightDisagreePeriod: state.applicationReducer.lightDisagreePeriod,
    notificationDisagreePeriod: state.applicationReducer.notificationDisagreePeriod,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeDataAgreement: ApplicationActions.changeDataAgreement,
    changeLightAgreement: ApplicationActions.changeLightAgreement,
    changeNotificationAgreement: ApplicationActions.changeNotificationAgreement,
    changeDataDisagreePeriod: ApplicationActions.changeDataDisagreePeriod,
    changeLightDisagreePeriod: ApplicationActions.changeLightDisagreePeriod,
    changeNotificationDisagreePeriod: ApplicationActions.changeNotificationDisagreePeriod,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parameters);
