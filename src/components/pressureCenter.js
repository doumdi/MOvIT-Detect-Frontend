/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';

import { URL } from '../redux/applicationReducer';
import { milliToTimeString } from '../utils/timeFormat';

class PressureCenter extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    header: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      time: 0,
      index: 0,
      date: props.date,
      currentCenter: { x: 0, y: 0 },
      currentQuadrants: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
      ],
      quadrants: [],
      centers: [],
      hours: [],
    };
    this.initialize(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
      this.initialize(nextProps.date);
    }
  }

  async getPressureData(date) {
    const response = await axios.get(`${URL}gravityCenter?Day=${+date},offset=0`, this.props.header);
    return response.data;
  }

  setIndex(value) {
    this.setState({ index: value });
    this.setState({ currentCenter: this.state.centers[value] });
    this.setState({ currentQuadrants: this.state.quadrants[value] });
    this.setState({ time: this.state.hours[value] });
  }

  async initialize(date) {
    const pressureData = await this.getPressureData(date);
    this.loadPressureData(pressureData);
  }

  loadPressureData(data) {
    this.setState({ quadrants: [] });
    this.setState({ centers: [] });
    this.setState({ hours: [] });
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        this.state.hours.push(property);
        this.state.centers.push(data[property].center);
        this.state.quadrants.push(data[property].quadrants);
      }
    }
    this.setIndex(0);
  }

  render() {
    const style = {
      marginBottom: '10%',
      height: '60%',
      width: '100%',
      center: {
        textAlign: 'center',
      },
    };
    return (
      <div className="container" style={style}>
        {this.state.centers.length > 0 &&
          <div>
            <br />
            <h4 id="dailyPressureCenter">{this.props.title}</h4>
            <hr />
            <div className="col-lg-5 offset-lg-2">
              <VictoryChart
                theme={VictoryTheme.material}
                domain={{ x: [-4, 4], y: [-7, 7] }}
              >
                <VictoryScatter
                  style={{ data: { fill: 'green' } }}
                  size={10}
                  data={[
                    this.state.currentCenter,
                  ]}
                />
                <VictoryScatter
                  style={{ data: { fill: '#c43a31' } }}
                  size={7}
                  data={[
                    this.state.currentQuadrants[0],
                  ]}
                />
                <VictoryScatter
                  style={{ data: { fill: '#c43a31' } }}
                  size={7}
                  data={[
                    this.state.currentQuadrants[1],
                  ]}
                />
                <VictoryScatter
                  style={{ data: { fill: '#c43a31' } }}
                  size={7}
                  data={[
                    this.state.currentQuadrants[2],
                  ]}
                />
                <VictoryScatter
                  style={{ data: { fill: '#c43a31' } }}
                  size={7}
                  data={[
                    this.state.currentQuadrants[3],
                  ]}
                />
              </VictoryChart>
              <div className="col-8 offset-2 col-md-4 offset-md-4">
                <Slider
                  min={0} max={this.state.centers.length - 1}
                  style={{ marginTop: '1vh' }}
                  value={this.state.index}
                  onChange={e => this.setIndex(e.value)}
                />
              </div>
              <div className="col-6 offset-3 text-center">
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
