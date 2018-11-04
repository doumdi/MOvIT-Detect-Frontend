/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    const style = {
      footer: {
        background: '#cc2033',
        padding: '3vh',
        textAlign: 'center',
        color: 'white',
        height: '52px',
      },
      color: 'white',
    };

    return (
      <div className="navbar fixed-bottom" style={style.footer}>
        <div className="mx-auto">

          © 2015 Copyright:
          <a href="http://agewell-nce.ca/" style={style}> AgeWell </a>
        </div>
      </div>
    );
  }
}
