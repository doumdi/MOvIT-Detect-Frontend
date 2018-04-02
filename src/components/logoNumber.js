import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class LogoNumber extends Component {
  static propTypes = {
    iconClass: PropTypes.string.isRequired,
    placeHolder: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
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
            type="number" placeholder={this.props.placeHolder} className="form-control"
            onChange={e => this.props.onChange(e.target.value)}
            value={this.props.value}
          />
        </div>
      </div>
    );
  }
}
