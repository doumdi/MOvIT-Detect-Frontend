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
      <div className="form-horizontal row mb-3">
        <div className="col-1 d-inline-block text-right">
          <span className="text-center" style={style.icon}><i className={this.props.iconClass} /></span>
        </div>
        <div className="col-10 col-lg-8 d-inline-block">
          <input
            type="number" placeholder={this.props.placeHolder} className="form-control" id="logoNumber"
            onChange={e => this.props.onChange(e.target.value)}
            value={this.props.value || ''}
          />
        </div>
      </div>
    );
  }
}
