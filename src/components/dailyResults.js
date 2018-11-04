/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';
import GoalProgress from './goalProgress';
import RecGoalProgress from './recGoalProgress';
import PressureCenter from './pressureCenter';
import DailySuccessTilt from './dailySuccessTilt';

class DailyResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    reduceWeight: PropTypes.bool.isRequired,
    reduceSlidingMoving: PropTypes.bool.isRequired,
    reduceSlidingRest: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    header: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dayData: [],
      date: props.date,
      data: null,
      loading: true,
    };
    this.getDayData(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.state.date = nextProps.date;
      this.getDayData(nextProps.date);
    }
  }

  getDayData(date) {
    this.state.loading = true;
    axios.get(`${URL}oneDay?Day=${+date}`, this.props.header)
      .then((response) => { this.state.dayData = response.data.map(v => v / 60000); this.loadData(); });
  }

  hover(e) {
    /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["e"] }] */
    e.target.style.cursor = 'pointer';
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
      legend: {
        onHover: e => this.hover(e),
      },
    };
    return (
      <div className="container">
        <h2 style={style.center}>{T.translate(`dailyResults.howDo.${this.props.language}`)}</h2>
        <br />
        <h4>{T.translate(`dailyResults.angleDistribution.${this.props.language}`)}</h4>
        <hr />
        {!this.state.loading
          && <Chart type="pie" data={this.state.data} options={minOptions} />
        }
        <PressureCenter
          title={T.translate(`dailyResults.pressureCenter.${this.props.language}`)}
          date={this.props.date}
        />

        <DailySuccessTilt />

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

export default connect(mapStateToProps)(DailyResults);
