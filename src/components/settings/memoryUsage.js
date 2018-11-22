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
    total: PropTypes.string.isRequired,
    used: PropTypes.string.isRequired,
    hasErrors: PropTypes.bool.isRequired,
  };

  getUsedPercentage() {
    const percentage = parseFloat(this.props.used) / parseFloat(this.props.total) * 100;
    return percentage.toFixed(2);
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
