
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';

class TiltLabels extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    tiltFrequecy: PropTypes.number,
    tiltLength: PropTypes.number,
    tiltAngle: PropTypes.number,
  }

  render() {
    const style = {
      bold: {
        fontWeight: 'bold',
      },
    };
    return (
      <div>
        <div className="col-sm-12">
          <span className="col-sm-6" style={style.bold}>
            {T.translate(`goals.tiltFrequency.${this.props.language}`)}
          </span>
          <span className="col-sm-6" style={style.bold}>
            {this.props.tiltFrequecy} {T.translate(`time.min.${this.props.language}`)}
          </span>
        </div>
        <div className="col-sm-12">
          <span className="col-sm-6" style={style.bold}>
            {T.translate(`goals.tiltLength.${this.props.language}`)}
          </span>
          <span className="col-sm-6" style={style.bold}>
            {this.props.tiltLength} {T.translate(`time.min.${this.props.language}`)}
          </span>
        </div>
        <div className="col-sm-12">
          <span className="col-sm-6" style={style.bold}>
            {T.translate(`goals.tiltAngle.${this.props.language}`)}
          </span>
          <span className="col-sm-6" style={style.bold}>
            {this.props.tiltAngle} &deg;
          </span>
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

export default connect(mapStateToProps)(TiltLabels);
