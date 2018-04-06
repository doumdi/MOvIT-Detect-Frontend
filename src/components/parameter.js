import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';
import PreventPermission from './preventPermission';
import SubmitButtons from './submitButtons';

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

  cancel() {
    console.log('clear all');
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
          <PreventPermission
            permission={this.props.dataAgreement}
            permissionTitle={T.translate(`parameters.dataAgreement.${this.props.language}`)}
            period={this.props.dataDisagreePeriod}
            onPermissionChange={this.props.changeDataAgreement}
            onPeriodChange={this.props.changeDataDisagreePeriod}
          />
          <PreventPermission
            permission={this.props.lightAgreement}
            permissionTitle={T.translate(`parameters.lightAgreement.${this.props.language}`)}
            period={this.props.lightDisagreePeriod}
            onPermissionChange={this.props.changeLightAgreement}
            onPeriodChange={this.props.changeLightDisagreePeriod}
          />
          <PreventPermission
            permission={this.props.notificationAgreement}
            permissionTitle={T.translate(`parameters.notificationAgreement.${this.props.language}`)}
            period={this.props.notificationDisagreePeriod}
            onPermissionChange={this.props.changeNotificationAgreement}
            onPeriodChange={this.props.changeNotificationDisagreePeriod}
          />
        </div>
        <SubmitButtons
          onSave={this.save.bind(this)}
          onCancel={this.cancel}
        />
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
