/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import { Card } from 'primereact/components/card/Card';
import { T } from '../utilities/translator';

class TiltSliders extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    tiltFrequecy: PropTypes.number,
    tiltLength: PropTypes.number,
    tiltAngle: PropTypes.number,
    maxAngle: PropTypes.number,
    title: PropTypes.string,
    onFrequencyChange: PropTypes.func.isRequired,
    onLengthChange: PropTypes.func.isRequired,
    onAngleChange: PropTypes.func.isRequired,
    modifiable: PropTypes.bool,
    onModifie: PropTypes.func,
  };

  render() {
    const chairImagePath = require('../res/images/chair.png');
    const protractorImagePath = require('../res/images/Protractor.png');
    const header = (
      <div className="ui-card-title">
        {this.props.title} &nbsp;
        {this.props.modifiable &&
          <i className="fa fa-check" onClick={() => this.props.onModifie()} style={{ cursor: 'pointer' }} />
        }
      </div>
    );
    const style = {
      padding: '2px',
      card: {
        height: '150px',
        padding: '2px',
      },
    };
    return (
      <Card header={header} style={style.card} class="col-md-6">
        <div className="col-md-10">
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
            <span className="col-sm-2">{this.props.tiltFrequecy} sec </span>
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
            <span className="col-sm-2" >{this.props.tiltLength} sec </span>
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
        <div className="col-md-2">
          <img
            src={chairImagePath}
            width="50"
            height="75"
            alt="chair"
            style={{ transform: `rotate(-${this.props.tiltAngle}deg)`, marginLeft: '35px' }}
          />
          <img
            src={protractorImagePath}
            width="150"
            height="150"
            alt="protractor"
            style={{ marginTop: '-75px', marginLeft: '-20px' }}
          />
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(TiltSliders);
