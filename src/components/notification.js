import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { URL } from '../redux/applicationReducer';
import { T } from '../utilities/translator';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }
  turnOnNotification() {
    axios.get(`${URL}alert?State=on`)
      .then(response => console.log(response));
  }

  turnOffNotification() {
    axios.get(`${URL}alert?State=off`)
      .then(response => console.log(response));
  }

  calibrate() {
    axios.get(`${URL}calibrate`)
      .then(response => console.log(response));
  }
  render() {
    const style = {
      notifs: {
        marginTop: '1em',
        marginBottom: '1em',
      },
    };
    return (
      <div className="col-sm-12" >
        <div className="col-sm-2" />
        <div className="col-sm-8" style={style.notifs}>
          <div className="col-sm-4">
            <div className="col-sm-4" />
            <button onClick={() => this.calibrate()} className="btn btn-lg col-sm-8">
              {T.translate(`calibrate.${this.props.language}`)}
            </button>
          </div>
          <div className="col-sm-4">
            <div className="col-sm-2" />
            <button onClick={() => this.turnOnNotification()} className="btn btn-lg col-sm-8">
              {T.translate(`alert.on.${this.props.language}`)}
            </button>
          </div>
          <div className="col-sm-4">
            <button onClick={() => this.turnOffNotification()} className="btn btn-lg col-sm-8">
              {T.translate(`alert.off.${this.props.language}`)}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(Notification);
