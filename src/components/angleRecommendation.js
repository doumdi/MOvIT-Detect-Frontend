/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Slider } from 'primereact/components/slider/Slider';
import { T } from '../utilities/translator';


class AngleRecommendation extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    recActive: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    maxAngle: PropTypes.number.isRequired,
    value: PropTypes.number,
    onChangeActive: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  }

  render() {
    const style = {
      stickLeft: {
        paddingLeft: '0',
      },
    };

    return (
      <div>
        <div className="col-sm-12">
          <div className="col-sm-4" style={style.stickLeft}>
            <Checkbox
              inputId="activeRecCheck"
              label={this.props.title}
              onChange={this.props.onChangeActive}
              checked={this.props.recActive}
            />
            <label htmlFor="activeRecCheck">{this.props.title}</label>
          </div>
        </div>
        {this.props.recActive
        &&
          <div className="col-sm-12">
            <div className="col-sm-4">
              <span className="col-sm-12">{T.translate(`recommendations.angle.${this.props.language}`)}</span>
            </div>
            <Slider
              className="col-sm-6"
              min={0} max={this.props.maxAngle}
              onChange={e => this.props.onChangeValue(e.value)}
              value={this.props.value}
            />
            <span className="col-sm-2">{this.props.value} &deg; </span>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(AngleRecommendation);
