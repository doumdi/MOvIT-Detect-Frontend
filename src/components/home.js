import { connect } from 'react-redux';
import React, { Component } from 'react';
import { T } from '../index';


class Home extends Component {
  render() {
    const style = {
      height: '80vh',
      content: {
        textAlign: 'center'
      }
    };

    return (
      <div style={style.content} >
        <h2>{T.translate(`welcome.${this.props.language}`)}</h2>
        <h3 style={style.pageTop}>{T.translate(`welcome.chooseProfile.${this.props.language}`)}</h3>
        <div className="col-sm-2" />
        <div className="col-sm-4">
          <button onClick={() => this.setProfile('patient')} style={style.profileButton}>
            <h2>{T.translate(`patient.${this.props.language}`)}</h2>
            <i className="fa fa-user" style={style.icons} />
          </button>
        </div>
        <div className="col-sm-4" >
          <button onClick={() => this.setProfile('patient')} style={style.profileButton} >
            <h2>{T.translate(`clinician.${this.props.language}`)}</h2>
            <i className="fa fa-user-md" style={style.icons} />
          </button>
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
export default connect(mapStateToProps)(Home);
