
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import { T } from '../utilities/translator';

class TiltSliders extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    tiltFrequecy: PropTypes.number,
    tiltLength: PropTypes.number,
    tiltAngle: PropTypes.number,
    maxAngle: PropTypes.number,
    onFrequencyChange: PropTypes.func.isRequired,
    onLengthChange: PropTypes.func.isRequired,
    onAngleChange: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <div className="col-sm-12">
          <div className="col-sm-4">
            <span className="col-sm-12">{T.translate(`recommendations.frequency.${this.props.language}`)}</span>
          </div>
          <Slider
            className="col-sm-6"
            min={0}
            max={180}
            value={this.props.tiltFrequecy}
            onChange={e => this.props.onFrequencyChange(e.value)} step={5}
          />
          <span className="col-sm-2">{this.props.tiltFrequecy} min </span>
        </div>
        <div className="col-sm-12">
          <div className="col-sm-4">
            <span className="col-sm-12">{T.translate(`recommendations.duration.${this.props.language}`)}</span>
          </div>
          <Slider
            className="col-sm-6"
            min={0}
            max={30}
            value={this.props.tiltLength}
            onChange={e => this.props.onLengthChange(e.value)}
          />
          <span className="col-sm-2" >{this.props.tiltLength} min </span>
        </div>
        <div className="col-sm-12">
          <div className="col-sm-4">
            <span className="col-sm-12">{T.translate(`recommendations.angle.${this.props.language}`)}</span>
          </div>
          <Slider
            className="col-sm-6"
            min={0}
            max={this.props.maxAngle}
            value={this.props.tiltAngle}
            onChange={e => this.props.onAngleChange(e.value)}
          />
          <span className="col-sm-2">{this.props.tiltAngle} &deg; </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(TiltSliders);
