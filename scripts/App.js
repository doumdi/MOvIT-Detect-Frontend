import React, { Component } from 'react';

export default class App extends Component {
  render() {
    const style = {
      h1: {
        verticalAlign: 'Left',
        lineHeight: 3,
        marginBottom: 0
      }
    };
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header navbar-left">
              <h1 style={style.h1}>MovIT-Plus</h1>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
