/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import CustomCard from '../shared/card';
import TiltSliders from '../shared/tiltSliders';
import { URL } from '../../redux/applicationReducer';

class TiltSlidersCard extends Component {
  static propTypes = {
    header: PropTypes.object,
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
    tooltip: PropTypes.string,
    id: PropTypes.string,
  };

  // TODO: Add feedback when saving
  async save() {
    const data = {
      tiltFrequecy: this.props.tiltFrequecy,
      tiltLength: this.props.tiltLength,
      tiltAngle: this.props.tiltAngle,
    };
    try {
      await axios.post(`${URL}goal`, data, this.props.header);
      console.log('succesfully updated');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const chairImagePath = require('../../res/images/chair-old.png');
    const header = (
      <div className="ui-card-title">
        {this.props.title}
        {this.props.tooltip
          && <i id={`tiltSliderCard${this.props.id}`} className="fa fa-info-circle px-2" />
        }
        {this.props.modifiable
          && <i className="fa fa-check" onClick={() => this.props.onModifie()} style={{ cursor: 'pointer' }} />
        }
      </div>
    );
    const element = (
      <div className="row">
        <div className="col-9">
          <TiltSliders
            tiltFrequecy={this.props.tiltFrequecy}
            tiltLength={this.props.tiltLength}
            tiltAngle={this.props.tiltAngle}
            maxAngle={this.props.maxAngle}
            onFrequencyChange={this.props.onFrequencyChange}
            onLengthChange={this.props.onLengthChange}
            onAngleChange={this.props.onAngleChange}
          />
        </div>
        <div className="col-3 justify-content-center align-self-center">
          <img
            src={chairImagePath}
            width="50"
            height="50"
            alt="chair"
            style={{ transform: `rotate(-${this.props.tiltAngle}deg)` }}
          />
        </div>
        <Tooltip
          for={`#tiltSliderCard${this.props.id}`}
          title={this.props.tooltip}
        />
      </div>
    );
    return (
      <CustomCard
        className="col-md-6"
        header={header}
        element={element}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.applicationReducer.header,
  };
}
export default connect(mapStateToProps)(TiltSlidersCard);
