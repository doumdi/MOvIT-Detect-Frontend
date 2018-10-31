/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import axios from 'axios';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';

class MonthlyAngleDistribution extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    month: PropTypes.number,
  }
  constructor(props) {
    super(props);
    this.state = {
      angleMonthData: {
        zero: [],
        fifteen: [],
        thirty: [],
        fortyfive: [],
        more: [],
      },
      angleMonthLabels: [],
      angleChartData: null,
      angleLoading: true,
      month: props.month,
    };

    this.getAngleMonthData(props.month);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ date: nextProps.month });
      this.getAngleMonthData(nextProps.month);
    }
  }
  getAngleMonthData(month) {
    const date = new Date(new Date().getFullYear(), month, 1);
    this.setState({ angleLoading: true });
    axios.get(`${URL}oneMonth?Day=${+date}`, this.props.header)
      .then((response) => { this.formatAngleChartData(response.data); })
      .catch(error => console.log(error));
  }

  formatAngleChartData(data) {
    this.state.angleMonthLabels = [];
    this.state.angleMonthData = {
      zero: [],
      fifteen: [],
      thirty: [],
      fortyfive: [],
      more: [],
    };
    Object.keys(data).forEach((key) => {
      const total = data[key].reduce((a, b) => a + b, 0);
      const percents = data[key].map(v => (v / total) * 100);

      this.state.angleMonthLabels.push(key.toString());
      this.state.angleMonthData.zero.push(percents[0]);
      this.state.angleMonthData.fifteen.push(percents[1]);
      this.state.angleMonthData.thirty.push(percents[2]);
      this.state.angleMonthData.fortyfive.push(percents[3]);
      this.state.angleMonthData.more.push(percents[4]);
    });
    this.loadAngleData();
  }

  loadAngleData() {
    this.state.angleChartData = {
      labels: this.state.angleMonthLabels,
      datasets: [
        {
          label: T.translate(`monthlyResults.tiltDistribution.zero.${this.props.language}`),
          backgroundColor: 'red',
          borderColor: 'red',
          data: this.state.angleMonthData.zero,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.fifteen.${this.props.language}`),
          backgroundColor: 'green',
          borderColor: 'green',
          data: this.state.angleMonthData.fifteen,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.thirty.${this.props.language}`),
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: this.state.angleMonthData.thirty,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.fortyfive.${this.props.language}`),
          backgroundColor: 'orange',
          borderColor: 'orange',
          data: this.state.angleMonthData.fortyfive,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.more.${this.props.language}`),
          backgroundColor: 'purple',
          borderColor: 'purple',
          data: this.state.angleMonthData.more,
        },
      ],
    };
    this.setState({ angleLoading: false });
  }

  render() {
    const percentOptions2 = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            callback: value => `${value}%`,
            min: 0,
            max: 100,
          },
        }],
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            label += '%';
            return label;
          },
        },
      },
      legend: {
        onHover: e => this.hover(e),
      },
    };

    return (
      <div className="container">
        <h4 id="monthlyAngle">{T.translate(`monthlyResults.tiltDistribution.${this.props.language}`)}</h4>
        <hr />
        {!this.state.angleLoading &&
          <Chart type="bar" data={this.state.angleChartData} options={percentOptions2} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(MonthlyAngleDistribution);
