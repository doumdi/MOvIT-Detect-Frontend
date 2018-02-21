import React, { Component } from 'react';

export default class Preference extends Component {
  render() {
    const style = {
      height: '80vh',
      content: {
        textAlign: 'center'
      }
    };

    return (
      <div style={style}>
        <div className="jumbotron" style={style.content}>
          <h1>Preference</h1>
          <h2>Change your preferences for the MovIT-Plus application</h2>
        </div>
      </div>
    );
  }
}
