/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ParameterActions } from '../../redux/parameterReducer';
import PreventPermission from './preventPermission';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';
import { get, post } from '../../utilities/secureHTTP';

class Permissions extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    changeDataAgreement: PropTypes.func,
    dataAgreement: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.load();
  }

  async load() {
    const response = get(`${URL}notificationParam`);
    this.mapData(response.data);
  }

  mapData(response) {
    this.props.changeDataAgreement(response.dataAgreement);
  }

  save() {
    const data = {
      dataAgreement: this.props.dataAgreement,
    };
    post(`${URL}notificationParam`, data);
  }

  render() {
    return (
      <div>
        <PreventPermission
          permission={this.props.dataAgreement}
          permissionTitle={T.translate(`settings.permissions.dataAgreement.${this.props.language}`)}
          onPermissionChange={this.props.changeDataAgreement}
          onSave={this.save.bind(this)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
    dataAgreement: state.parameterReducer.dataAgreement,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeDataAgreement: ParameterActions.changeDataAgreement,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
