/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ParameterActions } from '../../redux/parameterReducer';
import PreventPermission from './preventPermission';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';
import { validateToken } from '../../utilities/validateToken';

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

  load() {
    validateToken();
    axios.get(`${URL}notificationParam`, this.props.header)
      .then(response => this.mapData(response.data))
      .catch(console.log);
  }

  mapData(response) {
    this.props.changeDataAgreement(response.dataAgreement);
  }

  save() {
    validateToken();
    const data = {
      dataAgreement: this.props.dataAgreement,
    };
    axios.post(`${URL}notificationParam`, data, this.props.header)
      .then(console.log)
      .catch(console.log);
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
