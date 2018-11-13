import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import { URL } from '../../../redux/applicationReducer';
import { T } from '../../../utilities/translator';
import '../../../styles/results.css';

class DailySuccessTilt extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    header: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      dayData: [],
      date: props.date,
      data: null,
      loading: true,
    };
    this.getData(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
      this.getData(nextProps.date);
    }
  }

  getData(date) {
    this.state.loading = true;
    axios.get(`${URL}dailySuccessfulTilts?Day=${+date},offset=0`, this.props.header)
      .then((response) => { this.state.dayData = response.data; this.loadData(response.data); });
  }

  loadData(newData) {
    this.state.data = {
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
          data: newData,
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
    this.setState({ loading: false });
  }

  render() {
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
          scaleLabel: {
            display: true,
            labelString: T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`),
          },
          ticks: {
            min: 0,
          },
        }],
      },
    };

    return (
      <div className="container graphic">
        <h4 id="dailyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</h4>
        <hr />
        {!this.state.loading &&
          <Chart type="bar" data={this.state.data} options={tiltSuccessOptions} />
        }
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

export default connect(mapStateToProps)(DailySuccessTilt);
