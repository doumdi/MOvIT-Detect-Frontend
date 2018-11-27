/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLegend,
  VictoryScatter,
  VictoryTheme,
} from 'victory';

import PropTypes from 'prop-types';
import { Slider } from 'primereact/components/slider/Slider';
import { connect } from 'react-redux';
import { T } from '../../../../utilities/translator';
import CustomCard from '../../../shared/card';
import { OFFSET, URL } from '../../../../redux/applicationReducer';
import { get } from '../../../../utilities/secureHTTP';
import { getElement } from '../../../../utilities/loader';
import { getTime } from '../../../../utils/timeFormat';
import NoDataMessage from '../../../shared/noDataMessage';

class PressureCenter extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
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
      isLoaded: false,
      hasErrors: false,
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
    this.setState({ hasErrors: false, isLoaded: false });
    try {
      const response = await get(`${URL}gravityCenter?Day=${+date},offset=${OFFSET}`);
      return response.data;
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  setIndex(value) {
    this.setState({ index: value });
    this.setState({ currentCenter: this.state.centers[value] });
    this.setState({ currentQuadrants: this.state.quadrants[value] });
    this.setState({ time: this.state.hours[value] });
  }

  getChart() {
    if (this.state.quadrants.length === 0 || this.state.centers.length === 0) {
      return <NoDataMessage />;
    }
    return (
      <div className="col-lg-6 offset-lg-3">
        <svg viewBox="0 00 350 320">
          <VictoryChart
            standalone={false}
            theme={VictoryTheme.material}
            domain={{ x: [-4, 4], y: [-4, 4] }}
          >
            <VictoryLegend
              x={50}
              y={0}
              centerTitle
              orientation="horizontal"
              data={[
                { name: T.translate(`results.categories.pressure.legend.center.${this.props.language}`), symbol: { fill: 'green' } },
                { name: T.translate(`results.categories.pressure.legend.quadrant.${this.props.language}`), symbol: { fill: '#c43a31' } },
              ]}
            />
            <VictoryAxis crossAxis tickFormat={x => Math.abs(x)} />
            <VictoryAxis dependentAxis crossAxis tickFormat={y => Math.abs(y)} />
            <VictoryLabel text={T.translate(`results.categories.pressure.units.${this.props.language}`)} x={310} y={175} />
            <VictoryLabel text={T.translate(`results.categories.pressure.units.${this.props.language}`)} x={155} y={35} />
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
                this.state.currentQuadrants && this.state.currentQuadrants[0],
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: '#c43a31' } }}
              size={7}
              data={[
                this.state.currentQuadrants && this.state.currentQuadrants[1],
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: '#c43a31' } }}
              size={7}
              data={[
                this.state.currentQuadrants && this.state.currentQuadrants[2],
              ]}
            />
            <VictoryScatter
              style={{ data: { fill: '#c43a31' } }}
              size={7}
              data={[
                this.state.currentQuadrants && this.state.currentQuadrants[3],
              ]}
            />
          </VictoryChart>
        </svg>
        <div className="col-8 offset-2">
          <Slider
            min={0}
            max={this.state.centers.length - 1}
            style={{ marginTop: '1vh' }}
            value={this.state.index}
            onChange={e => this.setIndex(e.value)}
          />
        </div>
        <div className="col-6 offset-3 text-center">
          <h3>{getTime(parseInt(this.state.time))}</h3>
        </div>
      </div>
    );
  }

  async initialize(date) {
    const pressureData = await this.getPressureData(date);
    this.loadPressureData(pressureData);
  }

  loadPressureData(data) {
    this.setState({
      quadrants: [],
      centers: [],
      hours: [],
    });
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        this.state.hours.push(property);
        this.state.centers.push(data[property].center);
        this.state.quadrants.push(data[property].quadrants);
      }
    }
    this.setIndex(0);
    this.setState({ isLoaded: true });
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
      <div className="container" style={style} id="dailyPressureCenter">
        <CustomCard
          header={<h4>{this.props.title}</h4>}
          element={getElement(this.state.isLoaded, this.state.hasErrors, this.getChart())}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(PressureCenter);
