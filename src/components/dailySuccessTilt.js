import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import { T } from '../utilities/translator';

class DailySuccessTilt extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  render() {
    const tiltSuccessData = {
      labels: [
        [T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`),
          T.translate(`SuccessfulTilt.rightAngle.${this.props.language}`),
          T.translate(`SuccessfulTilt.rightDuration.${this.props.language}`)],
        [T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`),
          T.translate(`SuccessfulTilt.rightAngle.${this.props.language}`),
          T.translate(`SuccessfulTilt.wrongDuration.${this.props.language}`)],
        [T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`),
          T.translate(`SuccessfulTilt.rightDuration.${this.props.language}`),
          T.translate(`SuccessfulTilt.wrongAngle.${this.props.language}`)],
        T.translate(`SuccessfulTilt.tiltNotMade.${this.props.language}`),
      ],
      datasets: [
        {
          data: [
            36, 12, 15, 8,
          ],
          fill: true,
          backgroundColor: [
            'green',
            'yellow',
            'orange',
            'red',
          ],
          hoverBackgroundColor: [
            'green',
            'yellow',
            'orange',
            'red',
          ],
          lineTension: 0,
        },
      ],
    };

    const tiltSuccessOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          categoryPercentage: 1.0,
          barPercentage: 1.0,
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 50,
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

export default connect(mapStateToProps)(DailySuccessTilt);
