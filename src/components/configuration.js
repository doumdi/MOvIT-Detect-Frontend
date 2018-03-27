import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';
import Notification from './notification';
// import { InputText } from 'primereact/components/inputtext/InputText';

class Configuration extends Component {

  save() {
    // save data to backend
    this.props.history.push('/recommendations');
  }
  render() {
    const style = {
      content: {
        textAlign: 'center',
        paddingBottom: '5vh'
      },
      icon: {
        paddingTop: '6px',
        fontSize: 'large'
      },
      notifs: {
        marginTop: '1em'
      }
    };

    return (
      <div>
        <div className="col-md-12">
          <div className="form-horizontal">
            <legend className="text-center header"><h2>{T.translate(`configurations.${this.props.language}`)}</h2></legend>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-user" /></span>
              <div className="col-md-6">
                <input
                  type="text" placeholder={T.translate(`configurations.name.${this.props.language}`)} className="form-control"
                  onChange={(e) => this.props.changeUserName(e.target.value)}
                  value={this.props.userName}
                />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-id-card" /></span>
              <div className="col-md-6">
                <input
                  type="text" placeholder={T.translate(`configurations.telask.${this.props.language}`)} className="form-control"
                  onChange={(e) => this.props.changeUserID(e.target.value)}
                  value={this.props.userID}
                />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-wheelchair" /></span>
              <div className="col-md-6">
                <input
                  type="number" placeholder={T.translate(`configurations.maxTilt.${this.props.language}`)} className="form-control"
                  onChange={(e) => this.props.changeMaxAngle(e.target.value)}
                  value={this.props.maxAngle}
                />
              </div>
            </div>

            <div className="form-group">
              <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className="fa fa-balance-scale" /></span>
              <div className="col-md-6">
                <input
                  type="number" placeholder={T.translate(`configurations.weight.${this.props.language}`)} className="form-control"
                  onChange={(e) => this.props.changeUserWeight(e.target.value)}
                  value={this.props.userWeight}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-9 text-right">
            <button className="btn btn-lg">{T.translate(`cancel.${this.props.language}`)}</button>
            &nbsp;
            <button onClick={() => this.save()} className="btn btn-lg">{T.translate(`save.${this.props.language}`)}</button>
          </div>
        </div>
        <Notification />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    userName: state.applicationReducer.userName,
    userID: state.applicationReducer.userID,
    userWeight: state.applicationReducer.userWeight,
    maxAngle: state.applicationReducer.maxAngle,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeUserName: ApplicationActions.changeUserName,
    changeUserID: ApplicationActions.changeUserID,
    changeUserWeight: ApplicationActions.changeUserWeight,
    changeMaxAngle: ApplicationActions.changeMaxAngle,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
