/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ConfigurationActions } from '../redux/configurationReducer';
import { T } from '../utilities/translator';
import LogoText from '../components/shared/logoText';
import LogoNumber from '../components/shared/logoNumber';
import SubmitButtons from '../components/shared/submitButtons';
import { URL } from '../redux/applicationReducer';
import { validateToken } from '../utilities/validateToken';
// import { InputText } from 'primereact/components/inputtext/InputText';

class Configuration extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    header: PropTypes.object,
    userName: PropTypes.string.isRequired,
    changeUserName: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    changeUserID: PropTypes.func.isRequired,
    maxAngle: PropTypes.number,
    changeMaxAngle: PropTypes.func.isRequired,
    userWeight: PropTypes.number,
    changeUserWeight: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.load();
  }

  load() {
    validateToken();
    axios.get(`${URL}configuration`, this.props.header)
      .then(response => this.mapData(response.data))
      .catch(console.log);
  }

  mapData(response) {
    this.props.changeUserName(response.userName);
    this.props.changeUserID(response.userID);
    this.props.changeMaxAngle(response.maxAngle);
    this.props.changeUserWeight(response.userWeight);
  }

  save() {
    validateToken();
    const data = {
      userName: this.props.userName,
      userID: this.props.userID,
      maxAngle: this.props.maxAngle,
      userWeight: this.props.userWeight,
    };
    axios.post(`${URL}configuration`, data, this.props.header)
      .then(() => this.props.history.push('/recommendations'))
      .catch(console.log);
  }

  cancel() {
    console.log('clear all fields');
  }

  render() {
    return (
      <div>
        <div className="col-12 col-lg-10 offset-lg-2 mb-4 mt-3">
          <div className="form-horizontal">
            <legend className="text-center header"><h2>{T.translate(`configurations.${this.props.language}`)}</h2></legend>
            <LogoText
              iconClass="fa fa-user"
              placeHolder={T.translate(`configurations.name.${this.props.language}`)}
              value={this.props.userName}
              onChange={this.props.changeUserName}
            />
            <LogoText
              iconClass="fa fa-id-card"
              placeHolder={T.translate(`configurations.telask.${this.props.language}`)}
              value={this.props.userID}
              onChange={this.props.changeUserID}
            />
            <LogoNumber
              iconClass="fa fa-wheelchair"
              placeHolder={T.translate(`configurations.maxTilt.${this.props.language}`)}
              value={this.props.maxAngle}
              onChange={this.props.changeMaxAngle}
            />
            <LogoNumber
              iconClass="fa fa-balance-scale"
              placeHolder={T.translate(`configurations.weight.${this.props.language}`)}
              value={this.props.userWeight}
              onChange={this.props.changeUserWeight}
            />

          </div>

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
    header: state.applicationReducer.header,
    userName: state.configurationReducer.userName,
    userID: state.configurationReducer.userID,
    userWeight: state.configurationReducer.userWeight,
    maxAngle: state.configurationReducer.maxAngle,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeUserName: ConfigurationActions.changeUserName,
    changeUserID: ConfigurationActions.changeUserID,
    changeUserWeight: ConfigurationActions.changeUserWeight,
    changeMaxAngle: ConfigurationActions.changeMaxAngle,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
