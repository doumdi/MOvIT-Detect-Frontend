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

export default class SliderValue extends Component {
  static propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    unit: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(value) {
    if (!Number.isNaN(value)) {
      let newValue = value;
      if (this.props.max !== null && value > this.props.max) {
        newValue = this.props.max;
      }
      if (this.props.min !== null && value < this.props.min) {
        newValue = this.props.min;
      }
      this.props.onChange(newValue);
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <span>{this.props.title}</span>
        </div>
        <div className="row">

          <div className="col-12 col-md-10">
            <Slider
              className=" mt-2"
              min={this.props.min || 0}
              max={this.props.max}
              onChange={e => this.props.onChange(e.value)}
              value={this.props.value}
            />
          </div>
          <div className="pb-2 col-12 col-md-2">
            <input
              id="value"
              type="number"
              className="inputStyle"
              min={this.props.min || 0}
              max={this.props.max}
              onChange={e => this.onValueChange(e.target.value)}
              value={this.props.value}
            />
              &nbsp;
            <span>{this.props.unit}</span>
          </div>
        </div>
      </div>
    );
  }
}
