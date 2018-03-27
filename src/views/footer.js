import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const style = {
      footer: {
        background: '#cc2033',
        padding: '3vh',
        textAlign: 'center',
        height: '8vh',
        color: 'white',
      },
      color: 'white',
    };

    return (
      <div className="navbar navbar-default navbar-fixed-bottom" style={style.footer}>
        <div className="container-fluid">
          © 2015 Copyright: <a href="http://agewell-nce.ca/" style={style}> AgeWell </a>
        </div>
      </div>
    );
  }
}
