/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class LogoNumber extends Component {
  static propTypes = {
    iconClass: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const style = {
      icon: {
        paddingTop: '6px',
        fontSize: 'large',
        minWidth: '23px',
      },
    };

    return (
      <div className="form-horizontal row ml-3 mb-3">
        <span className="text-center mr-1" style={style.icon}><i className={this.props.iconClass} /></span>
        <div className="col-10 col-lg-6">
          <input
            type="number" placeholder={this.props.placeHolder} className="form-control"
            onChange={e => this.props.onChange(e.target.value)}
            value={this.props.value}
          />
        </div>
      </div>
    );
  }
}
