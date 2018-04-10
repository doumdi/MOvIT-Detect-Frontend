import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import { T } from '../index';
import { URL } from '../redux/applicationReducer';
import { milliArrayToMinute } from '../utils/timeFormat';
import GoalProgress from './goalProgress';
import RecGoalProgress from './recGoalProgress';

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
          data: milliArrayToMinute(this.state.dayData),
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
        <RecGoalProgress
          condition={this.props.reduceWeight}
          title={T.translate(`dailyResults.pressure.${this.props.language}`)}
          goalValue={this.state.value2}
          recValue={this.state.value1}
        />
        <GoalProgress
          condition={this.props.reduceSlidingMoving}
          title={T.translate(`dailyResults.travel.${this.props.language}`)}
          value={this.state.value2}
        />
        <GoalProgress
          condition={this.props.reduceSlidingRest}
          title={T.translate(`dailyResults.rest.${this.props.language}`)}
          value={this.state.value2}
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

export default connect(mapStateToProps)(DailyResults);
