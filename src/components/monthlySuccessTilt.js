import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import { T } from '../utilities/translator';

class MonthlySuccessTilt extends Component {

  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  render() {
    const tiltSuccessData = {
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
          label: T.translate(`SuccessfulTilt.tiltSucessful.${this.props.language}`),
          lineTension: 0,
          data: [
            36, 40, 27, 38, 42,
            55, 40, 28, 32, 26,
            55, 28, 31, 22, 25,
            34, 36, 30, 21, 24,
            56, 28, 31, 32, 8,
            20, 26, 30, 21, 24,
          ],
          fill: true,
          borderColor: 'greend',
          backgroundColor: 'green',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltBadDuration.${this.props.language}`),
          lineTension: 0,
          data: [
            26, 28, 31, 32, 30,
            34, 36, 30, 21, 24,
            25, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            8, 26, 30, 21, 24,
            36, 40, 27, 38, 42,
          ],
          fill: true,
          borderColor: 'yellow',
          backgroundColor: 'yellow',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltBadAngle.${this.props.language}`),
          lineTension: 0,
          data: [
            26, 28, 31, 32, 24,
            34, 36, 30, 21, 24,
            25, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            24, 26, 30, 21, 24,
            36, 40, 27, 38, 42,
          ],
          fill: true,
          borderColor: 'orange',
          backgroundColor: 'orange',
        },
        {
          label: T.translate(`SuccessfulTilt.tiltNotMade.${this.props.language}`),
          lineTension: 0,
          data: [
            26, 28, 31, 32, 16,
            4, 36, 30, 21, 24,
            5, 40, 28, 32, 26,
            25, 28, 31, 22, 25,
            0, 26, 30, 21, 24,
            36, 40, 27, 38, 42,
          ],
          fill: true,
          borderColor: 'red',
          backgroundColor: 'red',
        },
      ],
    };

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
      <Chart type="bar" data={tiltSuccessData} options={tiltSuccessOptions} />
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
