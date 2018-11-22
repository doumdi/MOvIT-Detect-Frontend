/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import PropTypes from 'prop-types';
import ErrorMessage from '../shared/errorMessage';

export default class MemoryUsage extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    used: PropTypes.number.isRequired,
    hasErrors: PropTypes.bool.isRequired,
  };

  getUsedPercentage() {
    return Math.round(this.props.used / this.props.total * 100);
  }

  render() {
    const style = {
      maxWidth: '400px',
    };
    return (
      <div>
        {this.props.hasErrors
          ? <ErrorMessage />
          : <ProgressBar style={style} value={this.getUsedPercentage()} />
        }
      </div>
    );
  }
}
