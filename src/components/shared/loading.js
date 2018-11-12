import React, { Component } from 'react';

export default class Loading extends Component {
  render() {
    const imagePath = require('../../res/images/Loading_icon.gif');
    const style = {
      width: '100%',
      image: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    };
    return (
      <div style={style}>
        <img
          src={imagePath}
          width="250"
          height="250"
          alt="Loading"
          style={style.image}
        />
      </div>
    );
  }
}
