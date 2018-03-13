import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import { T } from '../index';

class Parameters extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dataAgreement: false,
      lightAgreement: false,
      notificationAgreement: false,
      doNotDisturb: null
    };
  }
  render() {
    const style = {
      height: '80vh',
      content: {
        textAlign: 'center'
      }
    };

    return (
      <div style={style}>
        <legend className="text-center header"><h2>{T.translate(`parameters.${this.props.language}`)}</h2></legend>
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <div className="col-sm-12">
            <Checkbox inputId="dataAgreement" onChange={(e) => this.setState({ dataAgreement: e.checked })} checked={this.state.dataAgreement} />
            <label htmlFor="dataAgreement">{T.translate(`parameters.dataAgreement.${this.props.language}`)}</label>
          </div>
          {this.state.dataAgreement ? '' :
            <div>
              <div className="col-sm-12" >
                <h5>{T.translate(`parameters.doNotSend.${this.props.language}`)}:</h5>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotSendDay" value="day" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'day'}
                />
                <label htmlFor="doNotSendDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotSendWeek" value="week" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'week'}
                />
                <label htmlFor="doNotSendWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotSendMonth" value="month" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'month'}
                />
                <label htmlFor="doNotSendMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
              </div>
            </div>
          }
          <div className="col-sm-12" >
            <Checkbox inputId="lightAgreement" onChange={(e) => this.setState({ lightAgreement: e.checked })} checked={this.state.lightAgreement} />
            <label htmlFor="lightAgreement">{T.translate(`parameters.lightAgreement.${this.props.language}`)}</label>
          </div>
          {this.state.lightAgreement ? '' :
            <div>
              <div className="col-sm-12" >
                <h5>{T.translate(`parameters.doNotLightUp.${this.props.language}`)}:</h5>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotLightUpDay" value="day" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'day'}
                />
                <label htmlFor="doNotLightUpDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotLightUpWeek" value="week" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'week'}
                />
                <label htmlFor="doNotLightUpWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotLightUpMonth" value="month" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'month'}
                />
                <label htmlFor="doNotLightUpMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
              </div>
            </div>
          }
          <div className="col-sm-12" >
            <Checkbox inputId="notificationAgreement" onChange={(e) => this.setState({ notificationAgreement: e.checked })} checked={this.state.notificationAgreement} />
            <label htmlFor="notificationAgreement">{T.translate(`parameters.notificationAgreement.${this.props.language}`)}</label>
          </div>
          {this.state.notificationAgreement ? '' :
            <div>
              <div className="col-sm-12" >
                <h5>{T.translate(`parameters.doNotReceive.${this.props.language}`)}:</h5>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotReceiveDay" value="day" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'day'}
                />
                <label htmlFor="doNotReceiveDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotReceiveWeek" value="week" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'week'}
                />
                <label htmlFor="doNotReceiveWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
              </div>
              <div className="col-sm-12" >
                <RadioButton
                  inputId="doNotReceiveMonth" value="month" onChange={(e) => this.setState({ doNotDisturb: e.value })}
                  checked={this.state.doNotDisturb === 'month'}
                />
                <label htmlFor="doNotReceiveMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
              </div>
            </div>
          }
        </div>
        <div className="col-sm-9 text-right">
          <button type="submit" className="btn btn-lg">{T.translate(`cancel.${this.props.language}`)}</button>
          &nbsp;
          <button type="submit" className="btn btn-lg">{T.translate(`save.${this.props.language}`)}</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language
  };
}
export default connect(mapStateToProps)(Parameters);
