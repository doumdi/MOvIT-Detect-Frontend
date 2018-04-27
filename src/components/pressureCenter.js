import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import { URL } from '../redux/applicationReducer';
import { milliToTimeString } from '../utils/timeFormat';


class PressureCenter extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      time: 0,
      index: 0,
      currentPoint: { x: 0, y: 0 },
      hours: [],
      points: [],
    };
    this.getPressureData();
  }

  getPressureData() {
    axios.get(`${URL}gravityCenter?Day=${+this.props.date},offset=0`, this.props.header)
      .then((response) => { this.loadPressureData(response.data); });
  }

  setIndex(value) {
    this.setState({ index: value });
    this.setState({ currentPoint: this.state.points[value] });
    this.setState({ time: this.state.hours[value] });
  }

  loadPressureData(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        this.state.hours.push(property);
        this.state.points.push(data[property]);
      }
    }
    this.setIndex(0);
  }

  render() {
    const style = {
      marginBottom: '25%',
      height: '60%',
      width: '100%',
      center: {
        textAlign: 'center',
      },
    };
    return (
      <div className="col-sm-8" style={style}>
        {this.state.points.length > 0 &&
        <div>
          <br />
          <h4>{this.props.title}</h4>
          <hr />
          <VictoryChart
            theme={VictoryTheme.material}
            domain={{ x: [-4, 4], y: [-7, 7] }}
          >
            <VictoryScatter
              style={{ data: { fill: 'green' } }}
              size={10}
              data={[
                { x: 0, y: 0 },
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: '#c43a31' } }}
              size={7}
              data={[
                this.state.currentPoint,
              ]}
            />
          </VictoryChart>
          <div className="col-sm-12">
            <div className="col-sm-4" />
            <div className="col-sm-4">
              <Slider
                min={0} max={this.state.points.length - 1}
                style={{ marginTop: '2em' }}
                value={this.state.index}
                onChange={e => this.setIndex(e.value)}
              />
            </div>
            <div className="col-sm-4">
              <h3>{milliToTimeString(this.state.time)}</h3>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(PressureCenter);
