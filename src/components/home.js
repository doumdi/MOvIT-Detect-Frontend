import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { Button } from 'primereact/components/button/Button';
import { ApplicationActions, URL } from '../redux/applicationReducer';
import { T } from '../index';


class Home extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    changeProfile: PropTypes.func.isRequired,
    changeToken: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    profile: PropTypes.string,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: null,
      password: null,
      selectedLogin: null,
    };

    this.loginError = this.loginError.bind(this);
  }

  setLoginProfile(profileName) {
    this.setState({ password: null });
    if (this.state.selectedLogin === profileName) {
      this.setState({ selectedLogin: null });
    } else {
      this.setState({ selectedLogin: profileName });
    }
  }

  setProfile(token) {
    const profileName = this.state.selectedLogin;
    this.props.changeProfile(profileName);
    this.props.changeToken(token);
    console.log(profileName);
    if (profileName === 'user') {
      this.props.history.push('/goals');
    } else {
      this.props.history.push('/configurations');
    }
  }

  login() {
    axios.post(`${URL}login`, { username: this.state.selectedLogin, password: this.state.password })
    .then(result => this.setProfile(result.data.token))
    .catch(error => this.loginError(error));
  }

  loginError(error) {
    console.log(error);
  }

  clear() {
    this.setState({ password: null });
    this.setState({ selectedLogin: null });
  }

  render() {
    const style = {
      content: {
        textAlign: 'center',
      },
      icons: {
        fontSize: '20em',
      },
      pageTop: {
        marginBottom: '2em',
      },
      profileButton: {
        backgroundColor: 'transparent',
        border: 0,
      },
    };

    return (
      <div style={style.content} className="content-section implementation ui-fluid">
        <h2>{T.translate(`welcome.${this.props.language}`)}</h2>
        <h3 style={style.pageTop}>{T.translate(`welcome.chooseProfile.${this.props.language}`)}</h3>
        {this.props.profile
        &&
          <h4>
            {T.translate(`welcome.loginMessage.${this.props.language}`, { userType: T.translate(`${this.props.profile}.${this.props.language}`) })}
          </h4>
        }
        {!this.props.profile
        &&
          <div>
            <div className="col-sm-2" />
            <div className="col-sm-4">
              <button onClick={() => this.setLoginProfile('user')} style={style.profileButton}>
                <h2>{T.translate(`user.${this.props.language}`)}</h2>
                <i className="fa fa-user" style={style.icons} />
              </button>
              {this.state.selectedLogin === 'user' &&
              <div>
                <div className="col-sm-2" />
                <div className="ui-inputgroup col-sm-8">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={this.state.value}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <Button onClick={() => this.login()} icon="fa-sign-in" cornerStyleClass="ui-button-secondary" />
                </div>
              </div>
              }
            </div>
            <div className="col-sm-4" >
              <button onClick={() => this.setLoginProfile('clinician')} style={style.profileButton} >
                <h2>{T.translate(`clinician.${this.props.language}`)}</h2>
                <i className="fa fa-user-md" style={style.icons} />
              </button>
              {this.state.selectedLogin === 'clinician' &&
                <div>
                  <div className="col-sm-2" />
                  <div className="ui-inputgroup col-sm-8">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={this.state.value}
                      onChange={e => this.setState({ password: e.target.value })}
                    />
                    <Button onClick={() => this.login()} icon="fa-sign-in" cornerStyleClass="ui-button-secondary" />
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    profile: state.applicationReducer.profile,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeProfile: ApplicationActions.changeProfile,
    changeToken: ApplicationActions.changeToken,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
