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
  render() {
    const style = {
      notifs: {
        marginTop: '1em',
      },
    };
    return (
      <div className="col-sm-9 text-right" style={style.notifs}>
        <button onClick={() => this.turnOnNotification()} className="btn btn-lg">{T.translate(`alert.on.${this.props.language}`)}</button>
        &nbsp;
        <button onClick={() => this.turnOffNotification()} className="btn btn-lg">{T.translate(`alert.off.${this.props.language}`)}</button>
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

export default connect(mapStateToProps)(Notification);
