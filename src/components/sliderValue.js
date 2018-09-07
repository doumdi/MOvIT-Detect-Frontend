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

  render() {
    const style = {
      border: 0,
    };

    return (
      <div className="col-sm-12">
        <div className="col-sm-4">
          <span className="col-sm-12">{this.props.title}</span>
        </div>
        <Slider
          className="col-sm-6"
          min={this.props.min ? this.props.min : 0} max={this.props.max}
          onChange={e => this.props.onChange(e.value)}
          value={this.props.value}
        />
        <div className="col-sm-2">
          <input
            type="number" style={style}
            value={this.props.value}
            onChange={e => this.props.onChange(e.target.value)}
            min={this.props.min ? this.props.min : 0} max={this.props.max}
          />
          <span>{this.props.unit}</span>
        </div>
      </div>
    );
  }

}
