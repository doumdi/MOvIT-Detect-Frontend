/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class LogoText extends Component {
  static propTypes = {
    placeHolder: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const style = {
      icon: {
        paddingTop: '6px',
        fontSize: 'large',
      },
    };

    return (
      <div className="form-group">
        <span className="col-md-1 col-md-offset-2 text-center" style={style.icon}><i className={this.props.iconClass} /></span>
        <div className="col-md-6">
          <input
            type="text" placeholder={this.props.placeHolder} className="form-control"
            onChange={e => this.props.onChange(e.target.value)}
            value={this.props.value ? this.props.value : ''}
          />
        </div>
      </div>
    );
  }
}
