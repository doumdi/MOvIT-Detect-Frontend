/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Card } from 'primereact/components/card/Card';
import TiltSliders from '../components/tiltSliders';
import { URL } from '../redux/applicationReducer';

class TiltSlidersCard extends Component {
  static propTypes = {
    header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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

  load() {
    axios.get(`${URL}goal`, this.props.header)
      .then(response => this.mapData(response.data))
      .catch(console.log);
  }

  mapData(response) {
    this.props.onFrequencyChange(response.tiltFrequecy);
    this.props.onLengthChange(response.tiltLength);
    this.props.onLengthChange(response.tiltAngle);
  }

  save() {
    const data = {
      tiltFrequecy: this.props.tiltFrequecy,
      tiltLength: this.props.tiltLength,
      tiltAngle: this.props.tiltAngle,
    };
    axios.post(`${URL}goal`, data, this.props.header)
      .then(() => console.log('succesfully updated'))
      .catch(console.log);
  }

  render() {
    const chairImagePath = require('../res/images/chair-old.png');
    const style = {
      padding: '10px',
      height: '170px',
      card: {
        height: '150px',
        padding: '5px',
        backgroundColor: 'white',
        boxShadow: '5px 5px gainsboro',
      },
      header: {
        marginLeft: '14px',
        marginTop: '14px',
      },
    };
    const header = (
      <div className="ui-card-title" style={style.header}>
        {this.props.title} &nbsp;
        {this.props.modifiable &&
          <i className="fa fa-check" onClick={() => this.props.onModifie()} style={{ cursor: 'pointer' }} />
        }
      </div>
    );
    return (
      <Card header={header} style={style.card} class="col-md-6">
        <div className="col-md-10">
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
        <div className="col-md-2">
          <img
            src={chairImagePath}
            width="50"
            height="50"
            alt="chair"
            style={{ transform: `rotate(-${this.props.tiltAngle}deg)` }}
          />
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.applicationReducer.header,
  };
}
export default connect(mapStateToProps)(TiltSlidersCard);
