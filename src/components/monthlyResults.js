import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import axios from 'axios';
import { T } from '../index';
import { URL } from '../redux/applicationReducer';
import GoalChart from './goalChart';
import RecGoalChart from './recGoalChart';

class MonthlyResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    reduceWeight: PropTypes.bool,
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }
  constructor(props) {
    super(props);
    this.state = {
      value1: 50,
      value2: 30,
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
      sitMonthData: [],
      sitMonthLabels: [],
      sitChartData: null,
      sitLoading: true,
      date: props.date,
    };
    this.getAngleMonthData(props.date);
    this.getSitMonthData(props.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
      this.getAngleMonthData(nextProps.date);
      this.getSitMonthData(nextProps.date);
    }
  }
  getAngleMonthData(date) {
    this.setState({ angleLoading: true });
    axios.get(`${URL}oneMonth?Day=${+date}`)
      .then((response) => { this.formatAngleChartData(response.data); })
      .catch(error => console.log(error));
  }
  getSitMonthData(date) {
    this.setState({ sitLoading: true });
    axios.get(`${URL}sittingTime?Day?Day=${+date},Offset=0`)
      .then((response) => { this.formatSitChartData(response.data); })
      .catch(error => console.log(error));
  }
  formatAngleChartData(data) {
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
  formatSitChartData(data) {
    Object.keys(data).forEach((key) => {
      this.state.sitMonthLabels.push(key.toString());
      this.state.sitMonthData.push(data[key] / 60);
    });
    this.loadSitData();
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
  loadSitData() {
    this.state.sitChartData = {
      labels: this.state.sitMonthLabels,
      datasets: [
        {
          label: T.translate(`monthlyResults.hours.${this.props.language}`),
          backgroundColor: 'red',
          borderColor: 'red',
          data: this.state.sitMonthData,
        },
      ],
    };
    this.setState({ sitLoading: false });
  }
  hover(e) {
    /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["e"] }]*/
    e.target.style.cursor = 'pointer';
  }
  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
      bottom: {
        paddingBottom: '400px',
      },
    };

    const personalTiltData = {
      labels: [
        '1', '2', '3', '4', '5',
        '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30',
      ],
      datasets: [
        {
          label: T.translate(`monthlyResults.pressure.tiltMade.${this.props.language}`),
          lineTension: 0,
          data: [
            36, 40, 27, 38, 42,
            55, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            34, 36, 30, 21, 24,
            26, 28, 31, 32, 8,
            0, 26, 30, 21, 24,
          ],
          fill: true,
          borderColor: 'red',
        },
        {
          label: T.translate(`monthlyResults.pressure.tiltGoal.${this.props.language}`),
          lineTension: 0,
          data: [
            26, 28, 31, 32, 8,
            34, 36, 30, 21, 24,
            55, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            0, 26, 30, 21, 24,
            36, 40, 27, 38, 42,
          ],
          fill: false,
          borderColor: 'blue',
        },
      ],
    };

    const travelData = {
      labels: [
        '1', '2', '3', '4', '5',
        '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30',
      ],
      datasets: [
        {
          label: T.translate(`monthlyResults.travel.successRate.${this.props.language}`),
          lineTension: 0,
          data: [
            36, 40, 27, 38, 42,
            55, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            34, 36, 30, 21, 24,
            26, 28, 31, 32, 8,
            0, 26, 30, 21, 24,
          ],
          fill: true,
          borderColor: 'red',
        },
      ],
    };

    const restData = {
      labels: [
        '1', '2', '3', '4', '5',
        '6', '7', '8', '9', '10',
        '11', '12', '13', '14', '15',
        '16', '17', '18', '19', '20',
        '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30',
      ],
      datasets: [
        {
          label: T.translate(`monthlyResults.travel.successRate.${this.props.language}`),
          lineTension: 0,
          data: [
            36, 40, 27, 38, 42,
            55, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            34, 36, 30, 21, 24,
            26, 28, 31, 32, 8,
            0, 26, 30, 21, 24,
          ],
          fill: true,
          borderColor: 'red',
        },
      ],
    };

    const hourOptions = {
      scales: {
        yAxes: [{
          ticks: {
            callback: value => `${value} h`,
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
            label += ' h';
            return label;
          },
        },
      },
      legend: {
        onHover: e => this.hover(e),
      },
    };

    const percentOptions = {
      scales: {
        yAxes: [{
          ticks: {
            callback: value => `${value}%`,
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

    const percentOptions2 = {
      scales: {
        yAxes: [{
          ticks: {
            callback: value => `${value}%`,
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
        <h2 style={style.center}>{T.translate(`monthlyResults.howDo.${this.props.language}`)}</h2>
        <hr />
        <h4>{T.translate(`monthlyResults.tiltDistribution.${this.props.language}`)}</h4>
        {!this.state.angleLoading &&
          <Chart type="bar" data={this.state.angleChartData} options={percentOptions2} />
        }
        <hr />
        <h4>{T.translate(`monthlyResults.wheelChair.${this.props.language}`)}</h4>
        {!this.state.sitLoading &&
          <Chart type="bar" data={this.state.sitChartData} options={hourOptions} />
        }
        <RecGoalChart
          condition={this.props.reduceWeight}
          title={T.translate(`monthlyResults.pressure.${this.props.language}`)}
          goalTitle={T.translate(`monthlyResults.pressure.personal.${this.props.language}`)}
          recTitle={T.translate(`monthlyResults.pressure.recommended.${this.props.language}`)}
          goalData={personalTiltData}
          recData={personalTiltData}
        />
        <GoalChart
          condition={this.props.reduceSlidingMoving}
          title={T.translate(`monthlyResults.travel.${this.props.language}`)}
          successMessage={T.translate(`monthlyResults.travel.success.${this.props.language}`)}
          data={travelData}
          options={percentOptions}
        />
        <GoalChart
          condition={this.props.reduceSlidingRest}
          title={T.translate(`monthlyResults.rest.${this.props.language}`)}
          successMessage={T.translate(`monthlyResults.rest.success.${this.props.language}`)}
          data={restData}
          options={percentOptions}
        />
        <div style={style.bottom} />
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
  };
}

export default connect(mapStateToProps)(MonthlyResults);
