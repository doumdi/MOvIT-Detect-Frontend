import React, { Component } from 'react';
import axios from 'axios';

export default class Notification extends Component {

  turnOnNotification() {
    axios.get('https://private-f2484-movitplus.apiary-mock.com/alert?State=on')
      .then(response => console.log(response));
  }

  turnOffNotification() {
    axios.get('https://private-f2484-movitplus.apiary-mock.com/alert?State=off')
      .then(response => console.log(response));
  }
  render() {
    return (
      <div className="col-sm-9 text-right">
        <button onClick={() => this.turnOnNotification()} className="btn btn-lg">{T.translate(`alert.on.${this.props.language}`)}</button>
        &nbsp;
        <button onClick={() => this.turnOffNotification()} className="btn btn-lg">{T.translate(`alert.off.${this.props.language}`)}</button>
      </div>

    );
  }
}
