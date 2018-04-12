import React, { Component } from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import { URL } from '../redux/applicationReducer';


export default class PressureCenter extends Component {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: '',
      index: 0,
      currentPoint: { x: 0, y: 0 },
      hours: [],
      points: [],
    };
    this.getPressureData();
  }

  getPressureData() {
    axios.get(`${URL}gravityCenter?Day=${+this.props.date},offset=0`)
      .then((response) => { this.loadPressureData(response.data); });
  }

  setIndex(value) {
    this.setState({ index: value });
    this.setState({ currentPoint: this.state.points[value] });
  }

  loadPressureData(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        this.state.hours.push(property);
        this.state.points.push(data[property]);
      }
    }
    this.setState({ currentPoint: this.state.points[0] });
    this.setState({ index: 0 });
  }

  render() {
    const style = {
      marginBottom: '25%',
      height: '60%',
      width: '100%',
    };
    return (
      <div className="col-sm-8" style={style}>
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
        </div>
      </div>
    );
  }
}
