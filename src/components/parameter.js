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
          <div className="col-sm-12" >
            <Checkbox inputId="lightAgreement" onChange={(e) => this.setState({ lightAgreement: e.checked })} checked={this.state.lightAgreement} />
            <label htmlFor="lightAgreement">{T.translate(`parameters.lightAgreement.${this.props.language}`)}</label>
          </div>
          <div className="col-sm-12" >
            <Checkbox inputId="notificationAgreement" onChange={(e) => this.setState({ notificationAgreement: e.checked })} checked={this.state.notificationAgreement} />
            <label htmlFor="notificationAgreement">{T.translate(`parameters.notificationAgreement.${this.props.language}`)}</label>
          </div>
          <div className="col-sm-12" >
            <hr />
          </div>
          <div className="col-sm-12" >
            <h4>{T.translate(`parameters.doNotDisturb.${this.props.language}`)}:</h4>
          </div>
          <div className="col-sm-12" >
            <RadioButton
              inputId="doNotDisturbDay" value="day" onChange={(e) => this.setState({ doNotDisturb: e.value })}
              checked={this.state.doNotDisturb === 'day'}
            />
            <label htmlFor="doNotDisturbDay">24 {T.translate(`time.hours.${this.props.language}`)}</label>
          </div>
          <div className="col-sm-12" >
            <RadioButton
              inputId="doNotDisturbWeek" value="week" onChange={(e) => this.setState({ doNotDisturb: e.value })}
              checked={this.state.doNotDisturb === 'week'}
            />
            <label htmlFor="doNotDisturbWeek">1 {T.translate(`time.week.${this.props.language}`)}</label>
          </div>
          <div className="col-sm-12" >
            <RadioButton
              inputId="doNotDisturbMonth" value="month" onChange={(e) => this.setState({ doNotDisturb: e.value })}
              checked={this.state.doNotDisturb === 'month'}
            />
            <label htmlFor="doNotDisturbMonth">1 {T.translate(`time.month.${this.props.language}`)}</label>
          </div>

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
