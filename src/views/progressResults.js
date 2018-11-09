/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';
import GoalProgress from '../components/goalProgress';
import RecGoalProgress from '../components/recGoalProgress';
import GoalChart from '../components/goalChart';
import RecGoalChart from '../components/recGoalChart';
import ResultsCalendar from '../components/resultsCalendar';
import '../styles/style.css';
import '../styles/results.css';

class ProgressResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    reduceWeight: PropTypes.bool,
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
    month: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      period: 'day',
      width: window.innerWidth,
      date: props.date,
      month: props.month,
      value1: 50,
      value2: 30,
    };

    this.changePeriod = this.changePeriod.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }

  changeMonth(newMonth) {
    this.setState({ month: newMonth });
  }

  changeDate(newDate) {
    this.setState({ date: newDate });
  }

  changePeriod(newPeriod) {
    console.log(newPeriod);
    this.setState({ period: newPeriod });
  }

  render() {
    const isMobile = this.state.width <= 500;
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
    return (
      <div>
        <ResultsCalendar onPeriodChange={this.changePeriod} onDateChange={this.changeDate} onMonthChange={this.changeMonth} />
        <h2 className="center">{T.translate(`results.categories.progress.${this.props.language}`)}</h2>
        <hr />
        {!isMobile
          && (
            <div className="col-lg-2 leftMenu">
              {this.state.period === 'day'
                ? (
                  <div>
                    {this.props.reduceWeight
                      && <div><a href="#reduceWeight">{T.translate(`dailyResults.pressure.${this.props.language}`)}</a></div>
                    }
                    {this.props.reduceSlidingMoving
                      && <div><a href="#reduceSlidingMoving">{T.translate(`dailyResults.travel.${this.props.language}`)}</a></div>
                    }
                    {this.props.reduceSlidingRest
                      && <div><a href="#reduceSlidingRest">{T.translate(`monthlyResults.rest.${this.props.language}`)}</a></div>
                    }
                  </div>
                )
                : (
                  <div>
                    {this.props.reduceWeight
                      && <div><a href="#reduceWeight">{T.translate(`dailyResults.pressure.${this.props.language}`)}</a></div>
                    }
                    {this.props.reduceSlidingMoving
                      && <div><a href="#reduceSlidingMoving">{T.translate(`dailyResults.travel.${this.props.language}`)}</a></div>
                    }
                    {this.props.reduceSlidingRest
                      && <div><a href="#reduceSlidingRest">{T.translate(`monthlyResults.rest.${this.props.language}`)}</a></div>
                    }
                  </div>
                )
              }
            </div>
          )
        }
        <div className=" col-lg-10 offset-lg-2 results resultsContainer">
          <div className="col-lg-8 offset-lg-2 graphic">
            {this.state.period === 'day'
              ? (
                <div>
                  <div id="reduceWeight">
                    <RecGoalProgress
                      condition={this.props.reduceWeight}
                      title={T.translate(`dailyResults.pressure.${this.props.language}`)}
                      goalValue={this.state.value2}
                      recValue={this.state.value1}
                    />
                  </div>
                  <div id="reduceSlidingMoving">
                    <GoalProgress
                      condition={this.props.reduceSlidingMoving}
                      title={T.translate(`dailyResults.travel.${this.props.language}`)}
                      value={this.state.value2}
                    />
                  </div>
                  <div id="reduceSlidingRest">
                    <GoalProgress
                      condition={this.props.reduceSlidingRest}
                      title={T.translate(`dailyResults.rest.${this.props.language}`)}
                      value={this.state.value2}
                    />
                  </div>
                </div>
              )
              : (
                <div>
                  <div id="reduceWeight">
                    <RecGoalChart
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

                )
                : (
                  <div>
                    <div id="reduceWeight">
                      <RecGoalChart
                        condition={this.props.reduceWeight}
                        title={T.translate(`monthlyResults.pressure.${this.props.language}`)}
                        goalTitle={T.translate(`monthlyResults.pressure.personal.${this.props.language}`)}
                        recTitle={T.translate(`monthlyResults.pressure.recommended.${this.props.language}`)}
                        goalData={personalTiltData}
                        recData={personalTiltData}
                      />
                    </div>
                    <div id="reduceSlidingMoving">
                      <GoalChart
                        condition={this.props.reduceSlidingMoving}
                        title={T.translate(`monthlyResults.travel.${this.props.language}`)}
                        successMessage={T.translate(`monthlyResults.travel.success.${this.props.language}`)}
                        data={travelData}
                        options={percentOptions}
                      />
                    </div>
                    <GoalChart
                      id="reduceSlidingRest"
                      condition={this.props.reduceSlidingRest}
                      title={T.translate(`monthlyResults.rest.${this.props.language}`)}
                      successMessage={T.translate(`monthlyResults.rest.success.${this.props.language}`)}
                      data={restData}
                      options={percentOptions}
                    />
                  </div>
                  <div id="reduceSlidingRest">
                    <GoalChart
                      condition={this.props.reduceSlidingRest}
                      title={T.translate(`monthlyResults.rest.${this.props.language}`)}
                      successMessage={T.translate(`monthlyResults.rest.success.${this.props.language}`)}
                      data={restData}
                      options={percentOptions}
                    />
                  </div>
                </div>
              )
            }
          </div>
        </div>
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

export default connect(mapStateToProps)(ProgressResults);
