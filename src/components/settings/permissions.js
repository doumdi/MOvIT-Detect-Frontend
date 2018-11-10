/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../../styles/card.css';

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ParameterActions } from '../../redux/parameterReducer';
import PreventPermission from './preventPermission';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';

class Permissions extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    history: PropTypes.object,
    changeDataAgreement: PropTypes.func,
    dataAgreement: PropTypes.bool,
    dataDisagreePeriod: PropTypes.string,
    changeLightAgreement: PropTypes.func,
    lightAgreement: PropTypes.bool,
    lightDisagreePeriod: PropTypes.string,
    changeDataDisagreePeriod: PropTypes.func,
    changeLightDisagreePeriod: PropTypes.func,
    changeNotificationDisagreePeriod: PropTypes.func,
    changeNotificationAgreement: PropTypes.func,
    notificationAgreement: PropTypes.bool,
    notificationDisagreePeriod: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.load();
  }

  load() {
    axios.get(`${URL}notificationParam`, this.props.header)
      .then(response => this.mapData(response.data))
      .catch(console.log);
  }

  mapData(response) {
    this.props.changeDataAgreement(response.dataAgreement);
    this.props.changeDataDisagreePeriod(response.dataDisagreePeriod);

    this.props.changeLightAgreement(response.lightAgreement);
    this.props.changeLightDisagreePeriod(response.lightDisagreePeriod);

    this.props.changeNotificationAgreement(response.notificationAgreement);
    this.props.changeNotificationDisagreePeriod(response.notificationDisagreePeriod);
  }

  save() {
    const data = {
      dataAgreement: this.props.dataAgreement,
      dataDisagreePeriod: this.props.dataDisagreePeriod,
      lightAgreement: this.props.lightAgreement,
      lightDisagreePeriod: this.props.lightDisagreePeriod,
      notificationAgreement: this.props.notificationAgreement,
      notificationDisagreePeriod: this.props.notificationDisagreePeriod,
    };
    axios.post(`${URL}notificationParam`, data, this.props.header)
      .then(() => this.props.history.push('/goals'))
      .catch(console.log);
  }

  render() {
    const header = (
      <div className="ui-card-title header">
        {T.translate(`settings.permissions.${this.props.language}`)}
      </div>
    );
    return (
      <div className="container">
        <div className="card">
          <Card header={header}>
            <PreventPermission
              permission={this.props.dataAgreement}
              permissionTitle={T.translate(`settings.permissions.dataAgreement.${this.props.language}`)}
              period={this.props.dataDisagreePeriod}
              onPermissionChange={this.props.changeDataAgreement}
              onPeriodChange={this.props.changeDataDisagreePeriod}
              onSave={this.save.bind(this)}
            />
            <PreventPermission
              permission={this.props.lightAgreement}
              permissionTitle={T.translate(`settings.permissions.lightAgreement.${this.props.language}`)}
              period={this.props.lightDisagreePeriod}
              onPermissionChange={this.props.changeLightAgreement}
              onPeriodChange={this.props.changeLightDisagreePeriod}
              onSave={this.save.bind(this)}
            />
            <PreventPermission
              permission={this.props.notificationAgreement}
              permissionTitle={T.translate(`settings.permissions.notificationAgreement.${this.props.language}`)}
              period={this.props.notificationDisagreePeriod}
              onPermissionChange={this.props.changeNotificationAgreement}
              onPeriodChange={this.props.changeNotificationDisagreePeriod}
              onSave={this.save.bind(this)}
            />
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
    dataAgreement: state.parameterReducer.dataAgreement,
    lightAgreement: state.parameterReducer.lightAgreement,
    notificationAgreement: state.parameterReducer.notificationAgreement,
    dataDisagreePeriod: state.parameterReducer.dataDisagreePeriod,
    lightDisagreePeriod: state.parameterReducer.lightDisagreePeriod,
    notificationDisagreePeriod: state.parameterReducer.notificationDisagreePeriod,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeDataAgreement: ParameterActions.changeDataAgreement,
    changeLightAgreement: ParameterActions.changeLightAgreement,
    changeNotificationAgreement: ParameterActions.changeNotificationAgreement,
    changeDataDisagreePeriod: ParameterActions.changeDataDisagreePeriod,
    changeLightDisagreePeriod: ParameterActions.changeLightDisagreePeriod,
    changeNotificationDisagreePeriod: ParameterActions.changeNotificationDisagreePeriod,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
