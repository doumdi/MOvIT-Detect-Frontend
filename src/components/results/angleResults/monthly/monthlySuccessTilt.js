import React, { Component } from 'react';

import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomCard from '../../../shared/card';
import { URL, OFFSET } from '../../../../redux/applicationReducer';
import { T } from '../../../../utilities/translator';
import { get } from '../../../../utilities/secureHTTP';
import { getElement } from '../../../../utilities/loader';

class MonthlySuccessTilt extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    month: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      tiltMonthData: {
        good: [],
        badDuration: [],
        badAngle: [],
        bad: [],
      },
      labels: [],
      month: props.month,
      isLoaded: false,
      hasErrors: false,
    };
    this.getMonthData(props.month);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ month: nextProps.month });
      this.getMonthData(nextProps.month);
    }
  }

  async getMonthData(month) {
    this.setState({ hasErrors: false, isLoaded: false });
    try {
      const date = new Date(new Date().getFullYear(), month, 1);
      const response = await get(`${URL}monthlySuccessfulTilts?Day=${+date},offset=${OFFSET}`);
      this.formatChartData(response.data);
      this.setState({ isLoaded: true });
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  getChartData() {
    return {
      labels: this.state.labels,
      datasets: [
        {
          label: T.translate(`SuccessfulTilt.tiltSucessful.${this.props.language}`),
          lineTension: 0,
          data: this.state.tiltMonthData.good,
          fill: true,
          borderColor: 'greend',
          backgroundColor: 'green',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltBadDuration.${this.props.language}`),
          lineTension: 0,
          data: this.state.tiltMonthData.badDuration,
          fill: true,
          borderColor: 'yellow',
          backgroundColor: 'yellow',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltBadAngle.${this.props.language}`),
          lineTension: 0,
          data: this.state.tiltMonthData.badAngle,
          fill: true,
          borderColor: 'orange',
          backgroundColor: 'orange',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltNotMade.${this.props.language}`),
          lineTension: 0,
          data: this.state.tiltMonthData.bad,
          fill: true,
          borderColor: 'red',
          backgroundColor: 'red',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltSnoozed.${this.props.language}`),
          lineTension: 0,
          data: this.state.tiltMonthData.snoozed,
          fill: true,
          borderColor: 'blue',
          backgroundColor: 'blue',
        },
      ],
    };
  }

  formatChartData(data) {
    this.state.labels = [];
    this.state.tiltMonthData = {
      good: [],
      badDuration: [],
      badAngle: [],
      bad: [],
      snoozed: [],
    };
    Object.keys(data).forEach((key) => {
      this.state.labels.push(key.toString());
      this.state.tiltMonthData.good.push(data[key][0]);
      this.state.tiltMonthData.badDuration.push(data[key][1]);
      this.state.tiltMonthData.badAngle.push(data[key][2]);
      this.state.tiltMonthData.bad.push(data[key][3]);
      this.state.tiltMonthData.snoozed.push(data[key][4]);
    });
    this.setState({ loading: false });
  }

  render() {
    const tiltSuccessOptions = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            min: 0,
          },
        }],
      },
    };
    const data = this.getChartData();
    const chart = <Chart type="bar" data={data} options={tiltSuccessOptions} />;

    return (
      <div classame="container" id="monthlyTilt">
        <CustomCard
          header={<h4>{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</h4>}
          element={getElement(this.state.isLoaded, this.state.hasErrors, chart)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(MonthlySuccessTilt);
