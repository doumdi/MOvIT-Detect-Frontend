import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import { T } from '../index';
import GoalChart from './goalChart';
import RecGoalChart from './recGoalChart';

class MonthlyResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    reduceWeight: PropTypes.bool,
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
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

    const tiltData = {
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
          label: T.translate(`monthlyResults.tiltDistribution.zero.${this.props.language}`),
          backgroundColor: 'red',
          borderColor: 'red',
          data: [
            65, 59, 80, 81, 56,
            55, 40, 36, 24, 50,
            24, 13, 22, 47, 56,
            99, 87, 73, 43, 34,
            45, 48, 49, 12, 11,
            75, 32, 56, 11, 6,
          ],
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.fifteen.${this.props.language}`),
          backgroundColor: 'green',
          borderColor: 'green',
          data: [
            65, 59, 80, 81, 56,
            55, 40, 36, 24, 50,
            75, 32, 56, 11, 6,
            45, 48, 49, 12, 11,
            99, 87, 73, 43, 34,
            24, 13, 22, 47, 56,
          ],
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.thirty.${this.props.language}`),
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: [
            65, 59, 80, 81, 56,
            45, 48, 49, 12, 11,
            75, 32, 56, 11, 6,
            99, 87, 73, 43, 34,
            55, 40, 36, 24, 50,
            24, 13, 22, 47, 56,
          ],
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.fortyfive.${this.props.language}`),
          backgroundColor: 'orange',
          borderColor: 'orange',
          data: [
            75, 32, 56, 11, 6,
            55, 40, 36, 24, 50,
            45, 48, 49, 12, 11,
            99, 87, 73, 43, 34,
            24, 13, 22, 47, 56,
            65, 59, 80, 81, 56,
          ],
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.more.${this.props.language}`),
          backgroundColor: 'purple',
          borderColor: 'purple',
          data: [
            55, 40, 36, 24, 50,
            65, 59, 80, 81, 56,
            24, 13, 22, 47, 56,
            45, 48, 49, 12, 11,
            99, 87, 73, 43, 34,
            75, 32, 56, 11, 6,
          ],
        },
      ],
    };

    const wheelChairData = {
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
          label: T.translate(`monthlyResults.hours.${this.props.language}`),
          backgroundColor: 'red',
          borderColor: 'red',
          data: [
            4, 17, 6, 8, 7,
            10, 6, 3, 6, 6,
            7, 12, 11, 14, 20,
            8, 5, 6, 3, 4,
            5, 6, 7, 3, 12,
            5, 8, 19, 5.5, 6,
          ],
        },
      ],
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
        onClick: null,
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
        onClick: null,
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
    };

    return (
      <div className="container">
        <h2 style={style.center}>{T.translate(`monthlyResults.howDo.${this.props.language}`)}</h2>
        <hr />
        <h4>{T.translate(`monthlyResults.tiltDistribution.${this.props.language}`)}</h4>
        <Chart type="bar" data={tiltData} options={percentOptions2} />
        <hr />
        <h4>{T.translate(`monthlyResults.wheelChair.${this.props.language}`)}</h4>
        <Chart type="bar" data={wheelChairData} options={hourOptions} />
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
    reduceWeight: state.applicationReducer.reduceWeight,
    reduceSlidingRest: state.applicationReducer.reduceSlidingRest,
    reduceSlidingMoving: state.applicationReducer.reduceSlidingMoving,
  };
}

export default connect(mapStateToProps)(MonthlyResults);
