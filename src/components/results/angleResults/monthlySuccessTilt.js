import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import CustomCard from '../../shared/card';
import { URL } from '../../../redux/applicationReducer';
import { T } from '../../../utilities/translator';

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
      data: null,
      loading: true,
      month: props.month,
    };
    this.getMonthData(props.month);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ date: nextProps.month });
      this.getMonthData(nextProps.month);
    }
  }

  getMonthData(month) {
    const date = new Date(new Date().getFullYear(), month, 1);
    axios.get(`${URL}monthlySuccessfulTilts?Day=${+date},offset=0`, this.props.header)
      .then((response) => { this.formatChartData(response.data); })
      .catch(console.error);
  }

  formatChartData(data) {
    this.state.labels = [];
    this.state.tiltMonthData = {
      good: [],
      badDuration: [],
      badAngle: [],
      bad: [],
    };
    Object.keys(data).forEach((key) => {
      this.state.labels.push(key.toString());
      this.state.tiltMonthData.good.push(data[key][0]);
      this.state.tiltMonthData.badDuration.push(data[key][1]);
      this.state.tiltMonthData.badAngle.push(data[key][2]);
      this.state.tiltMonthData.bad.push(data[key][3]);
    });
    this.loadData();
  }

  loadData() {
    this.state.data = {
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
      ],
    };
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

    return (
      <div classame="container" id="monthlyTilt">
        <CustomCard
          header={<h4>{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</h4>}
          element={<Chart type="bar" data={this.state.data} options={tiltSuccessOptions} />}
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
