import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ApplicationActions } from '../redux/applicationReducer';
import { T } from '../index';


class Home extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: null
    };
  }

  setProfile(profileName) {
    this.props.changeProfile(profileName);
    this.props.history.push('/graphic');
  }

  render() {
    const style = {
      content: {
        textAlign: 'center'
      },
      icons: {
        fontSize: '20em'
      },
      pageTop: {
        marginBottom: '2em'
      },
      profileButton: {
        backgroundColor: 'transparent',
        border: 0
      }
    };

    return (
      <div style={style.content} >
        <h2>{T.translate(`welcome.${this.props.language}`)}</h2>
        <h3 style={style.pageTop}>{T.translate(`welcome.chooseProfile.${this.props.language}`)}</h3>
        {this.props.profile
        &&
          <h4>{T.translate(`welcome.loginMessage.${this.props.language}`)} {T.translate(`${this.props.profile}.${this.props.language}`)} </h4>
        }
        {!this.props.profile
        &&
          <div>
            <div className="col-sm-2" />
            <div className="col-sm-4">
              <button onClick={() => this.setProfile('user')} style={style.profileButton}>
                <h2>{T.translate(`user.${this.props.language}`)}</h2>
                <i className="fa fa-user" style={style.icons} />
              </button>
            </div>
            <div className="col-sm-4" >
              <button onClick={() => this.setProfile('clinician')} style={style.profileButton} >
                <h2>{T.translate(`clinician.${this.props.language}`)}</h2>
                <i className="fa fa-user-md" style={style.icons} />
              </button>
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
    profile: state.applicationReducer.profile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeProfile: ApplicationActions.changeProfile
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
