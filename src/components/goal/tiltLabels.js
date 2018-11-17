/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomCard from '../shared/card';
import { T } from '../../utilities/translator';

class TiltLabels extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    title: PropTypes.string,
    tiltFrequecy: PropTypes.number,
    tiltLength: PropTypes.number,
    tiltAngle: PropTypes.number,
    modifiable: PropTypes.bool,
    onModifie: PropTypes.func,
  };

  render() {
    const chairImagePath = require('../../res/images/chair-old.png');
    const style = {
      bold: {
        fontWeight: 'bold',
      },
    };
    const header = (
      <div className="ui-card-title">
        {this.props.title}
        &nbsp;
        {this.props.modifiable
          && <i className="fa fa-pencil" onClick={() => this.props.onModifie()} style={{ cursor: 'pointer' }} />
        }
      </div>
    );
    const element = (
      <div className="row">
        <div className=" col-12 col-md-4 ml-md-4">
          <div className="row">
            <span className="ml-3" style={style.bold}>
              {T.translate(`goals.tiltFrequency.${this.props.language}`)}
            </span>
            <span className="ml-3" style={style.bold}>
              {this.props.tiltFrequecy}
              &nbsp;
              {T.translate(`time.min.${this.props.language}`)}
            </span>
          </div>
          <div className="row">
            <span className="ml-3" style={style.bold}>
              {T.translate(`goals.tiltLength.${this.props.language}`)}
            </span>
            <span className="ml-3" style={style.bold}>
              {this.props.tiltLength}
              &nbsp;
              {T.translate(`time.min.${this.props.language}`)}
            </span>
          </div>
          <div className="row">
            <span className="ml-3" style={style.bold}>
              {T.translate(`goals.tiltAngle.${this.props.language}`)}
            </span>
            <span className="ml-3" style={style.bold}>
              {this.props.tiltAngle}
              &nbsp;
              &deg;
            </span>
          </div>
        </div>
        <div className="col-2 offset-1">
          <img
            src={chairImagePath}
            width="50"
            height="50"
            alt="chair"
            style={{ transform: `rotate(-${this.props.tiltAngle}deg)` }}
          />
        </div>
      </div>
    );
    return (
      <CustomCard
        className="col-12"
        header={header}
        element={element}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(TiltLabels);
