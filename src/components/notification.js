/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog } from 'primereact/components/dialog/Dialog';
import { URL } from '../redux/applicationReducer';
import { T } from '../utilities/translator';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  constructor(props) {
    super(props);
    this.state = {
      showCountdown: false,
      timer: 10,
    };
  }

  turnOnNotification() {
    axios.get(`${URL}alert?State=on`, this.props.header)
      .then(response => console.log(response));
  }

  turnOffNotification() {
    axios.get(`${URL}alert?State=off`, this.props.header)
      .then(response => console.log(response));
  }

  calibrate() {
    axios.get(`${URL}calibrate`, this.props.header)
      .then(() => this.countdownCalibration());
  }
  countdownCalibration() {
    this.setState({ ...this.state, showCountdown: true });
    const countdown = window.setInterval(() => {
      this.setState({ ...this.state, timer: this.state.timer - 1 });
      if (this.state.timer === 0) {
        window.clearInterval(countdown);
        this.setState({ showCountdown: false, timer: 10 });
      }
    }, 1000);
  }
  render() {
    const style = {
      notifs: {
        marginTop: '1em',
        marginBottom: '1em',
      },
      timer: {
        fontSize: '30',
        textAlign: 'center',
        width: '100%',
      },
      timerHeader: {
        fontSize: '20',
        textAlign: 'center',
        width: '100%',
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
        <Dialog
          visible={this.state.showCountdown} width="300px" height="100px" showHeader={false}
          modal onHide={() => this.setState({ showCountdown: false })}
        >
          <div style={style.timerHeader}> {T.translate(`calibrating.${this.props.language}`)} </div>
          <div style={style.timer}>{this.state.timer}</div>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(Notification);
