/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../../styles/components/sliderValue.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import { Spinner } from 'primereact/components/spinner/Spinner';

export default class SliderValue extends Component {
  static propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    unit: PropTypes.string,
  };

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <span>{this.props.title}</span>
          <div className="row">
            <div className="col-12 col-md-6">
              <Slider
                className=" mt-2"
                min={this.props.min || 0}
                max={this.props.max}
                onChange={e => this.props.onChange(e.value)}
                value={this.props.value}
              />
            </div>
            <div className="pb-2 col-12 col-md-3">
              <Spinner
                id="value"
                min={this.props.min || 0}
                max={this.props.max}
                onChange={e => this.props.onChange(e.value)}
                value={this.props.value}
              />
              &nbsp;
              <span>{this.props.unit}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
