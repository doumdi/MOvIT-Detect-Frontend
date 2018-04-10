import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ConfigurationActions } from '../redux/configurationReducer';
import { T } from '../utilities/translator';
import Notification from './notification';
import LogoText from './logoText';
import LogoNumber from './logoNumber';
import SubmitButtons from './submitButtons';
// import { InputText } from 'primereact/components/inputtext/InputText';

class Configuration extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    userName: PropTypes.string.isRequired,
    changeUserName: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    changeUserID: PropTypes.func.isRequired,
    maxAngle: PropTypes.number,
    changeMaxAngle: PropTypes.func.isRequired,
    userWeight: PropTypes.number,
    changeUserWeight: PropTypes.func.isRequired,
  }
  save() {
    this.props.history.push('/recommendations');
  }
  cancel() {
    console.log('clear all fields');
  }

  render() {
    return (
      <div>
        <div className="col-md-12">
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
        <Notification />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
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
