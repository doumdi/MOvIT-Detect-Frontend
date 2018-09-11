/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import SliderValue from '../components/sliderValue';
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
          <SliderValue
            min={0} max={this.props.maxAngle} onChange={this.props.onChangeValue}
            value={this.props.value} unit="°" title={T.translate(`recommendations.angle.${this.props.language}`)}
          />
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
