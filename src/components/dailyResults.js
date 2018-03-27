import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import { T } from '../index';
import { URL } from '../redux/applicationReducer';

class DailyResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    reduceWeight: PropTypes.bool.isRequired,
    reduceSlidingMoving: PropTypes.bool.isRequired,
    reduceSlidingRest: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date),
  }
  constructor(props) {
    super();
    this.state = {
      value1: 50,
      value2: 30,
      dayData: [],
      date: props.date,
      data: null,
      loading: true,
    };
    this.getDayData(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
      this.getDayData(nextProps.date);
    }
  }

  getDayData(date) {
    this.setState({ loading: true });
    axios.get(`${URL}oneDay?Day=${+date}`)
      .then((response) => { this.state.dayData = response.data; this.loadData(); });
  }

  loadData() {
    this.state.data = {
      labels: [
        T.translate(`dailyResults.angleDistribution.zero.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.fifteen.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.thirty.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.fortyfive.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.more.${this.props.language}`),
      ],
      datasets: [
        {
          data: this.state.dayData,
          backgroundColor: [
            'red',
            'green',
            'blue',
            'orange',
            'purple',
          ],
          hoverBackgroundColor: [
            'red',
            'green',
            'blue',
            'orange',
            'purple',
          ],
        },
      ],
    };

    this.setState({ loading: false });
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

    const minOptions = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, labelData) => {
            let label = labelData.labels[tooltipItem.index] || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(labelData.datasets[0].data[tooltipItem.index] * 100) / 100;
            label += ' min';
            return label;
          },
        },
      },
    };
    return (
      <div className="container">
        <h2 style={style.center}>{T.translate(`dailyResults.howDo.${this.props.language}`)}</h2>
        <br />
        <h4>{T.translate(`dailyResults.angleDistribution.${this.props.language}`)}</h4>
        <hr />
        {!this.state.loading &&
          <Chart type="pie" data={this.state.data} options={minOptions} />
        }
        {this.props.reduceWeight &&
          <div>
            <hr />
            <h2 style={style.center}>{T.translate(`dailyResults.pressure.${this.props.language}`)}</h2>
            <h4>{T.translate(`dailyResults.personal.${this.props.language}`)}</h4>
            <ProgressBar value={this.state.value1} />
            <p style={style.center}>
              {T.translate(`dailyResults.personal.description.${this.props.language}`,
              { percent: this.state.value1 })}
            </p>
            <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
            <ProgressBar value={this.state.value2} />
            <p style={style.center}>
              {T.translate(`dailyResults.recommended.description.${this.props.language}`,
              { percent: this.state.value2 })}
            </p>
          </div>
        }

        {this.props.reduceSlidingMoving &&
          <div>
            <hr />
            <h2 style={style.center}>{T.translate(`dailyResults.travel.${this.props.language}`)}</h2>

            <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
            <ProgressBar value={this.state.value2} />
            <p style={style.center}>
              {T.translate(`dailyResults.recommended.description.${this.props.language}`,
              { percent: this.state.value2 })}
            </p>
          </div>
        }

        {this.props.reduceSlidingRest &&
          <div>
            <hr />
            <h2 style={style.center}>{T.translate(`dailyResults.rest.${this.props.language}`)}</h2>

            <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
            <ProgressBar value={this.state.value2} />
            <p style={style.center}>
              {T.translate(`dailyResults.recommended.description.${this.props.language}`,
              { percent: this.state.value2 })}
            </p>
          </div>
        }
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

export default connect(mapStateToProps)(DailyResults);
