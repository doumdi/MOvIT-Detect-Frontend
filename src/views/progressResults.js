/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalChart from '../components/results/progressResults/goalChart';
import GoalProgress from '../components/results/progressResults/goalProgress';
import RecGoalChart from '../components/results/progressResults/recGoalChart';
import RecGoalProgress from '../components/results/progressResults/recGoalProgress';
import ResultsCalendar from '../components/results/resultsCalendar';
import { URL, IS_TABLET } from '../redux/applicationReducer';
import { T } from '../utilities/translator';
import { get } from '../utilities/secureHTTP';

class ProgressResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
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
      value2: 70,
      daySildeRest: 0,
      daySildeMoving: 0,
      monthSildeRest: [],
      monthSildeMoving: [],
      monthSlideLabels: [],
      monthLoading: true,
    };

    this.changePeriod = this.changePeriod.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
  }

  async getDailySlidingProgress(date) {
    const response = await get(`${URL}dailySlideProgress?Day=${+date},offset=0`);
    this.loadDailySlidingData(response.data);
  }

  async getMonthlySlidingProgress(month) {
    this.state.monthLoading = true;
    const date = new Date(new Date().getFullYear(), month, 1);
    const response = get(`${URL}monthlySlideProgress?Day=${+date},offset=0`);
    this.loadMonthlySlidingData(response.data);
  }

  loadMonthlySlidingData(data) {
    this.state.monthSlideLabels = [];
    this.state.monthSildeRest = [];
    this.state.monthSlideMoving = [];
    Object.keys(data).forEach((key) => {
      this.state.monthSlideLabels.push(key.toString());
      this.state.monthSildeRest.push(data[key][0] * 100);
      this.state.monthSildeMoving.push(data[key][1] * 100);
    });

    this.setState({ monthLoading: false });
  }

  loadDailySlidingData(data) {
    this.setState({ daySildeRest: data[0] * 100, daySildeMoving: data[1] * 100, loadingDay: false });
  }

  changeMonth(newMonth) {
    this.setState({ month: newMonth });
    this.getMonthlySlidingProgress(newMonth);
  }

  changeDate(newDate) {
    this.setState({ date: newDate });
    this.getDailySlidingProgress(newDate);
  }

  changePeriod(newPeriod) {
    console.log(newPeriod);
    this.setState({ period: newPeriod });
  }

  render() {
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
      labels: this.state.monthSlideLabels,
      datasets: [
        {
          label: T.translate(`monthlyResults.travel.successRate.${this.props.language}`),
          lineTension: 0,
          data: this.state.monthSildeMoving,
          fill: true,
          borderColor: 'red',
        },
      ],
    };

    const restData = {
      labels: this.state.monthSlideLabels,
      datasets: [
        {
          label: T.translate(`monthlyResults.travel.successRate.${this.props.language}`),
          lineTension: 0,
          data: this.state.monthSildeRest,
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
        onClick: null,
      },
    };
    return (
      <div>
        <ResultsCalendar onPeriodChange={this.changePeriod} onDateChange={this.changeDate} onMonthChange={this.changeMonth} />
        <h2 className="center">{T.translate(`results.categories.progress.${this.props.language}`)}</h2>
        <hr />
        {!IS_TABLET
          && (
            <div className="col-lg-2 leftMenu">
              {this.state.period === 'day'
                ? (
                  <ul className="graphlist">
                    {this.props.reduceWeight
                      && (
                      <li className="graphLink">
                        <a href="results/progress#reduceWeight">{T.translate(`dailyResults.pressure.${this.props.language}`)}</a>
                      </li>
                      )}
                    {this.props.reduceSlidingMoving
                      && (
                        <li className="graphLink">
                          <a href="results/progress#reduceSlidingMoving">{T.translate(`dailyResults.travel.${this.props.language}`)}</a>
                        </li>
                      )}
                    {this.props.reduceSlidingRest
                      && (
                        <li className="graphLink">
                          <a href="results/progress#reduceSlidingRest">{T.translate(`monthlyResults.rest.${this.props.language}`)}</a>
                        </li>
                      )}
                  </ul>
                )
                : (
                  <ul className="graphlist">
                    {this.props.reduceWeight
                      && (
                      <li className="graphLink">
                        <a href="results/progress#reduceWeight">{T.translate(`dailyResults.pressure.${this.props.language}`)}</a>
                      </li>
                      )}
                    {this.props.reduceSlidingMoving
                      && (
                        <li className="graphLink">
                          <a href="results/progress#reduceSlidingMoving">{T.translate(`dailyResults.travel.${this.props.language}`)}</a>
                        </li>
                      )}
                    {this.props.reduceSlidingRest
                      && (
                        <li className="graphLink">
                          <a href="results/progress#reduceSlidingRest">{T.translate(`monthlyResults.rest.${this.props.language}`)}</a>
                        </li>
                      )}
                  </ul>
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
                      value={this.state.daySildeMoving}
                    />
                  </div>
                  <div id="reduceSlidingRest">
                    <GoalProgress
                      condition={this.props.reduceSlidingRest}
                      title={T.translate(`dailyResults.rest.${this.props.language}`)}
                      value={this.state.daySildeRest}
                    />
                  </div>
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
                  {!this.state.monthLoading
                  && (
                    <div>
                      <div id="reduceSlidingMoving">
                        <GoalChart
                          condition={this.props.reduceSlidingMoving}
                          title={T.translate(`monthlyResults.travel.${this.props.language}`)}
                          successMessage={T.translate(`monthlyResults.travel.success.${this.props.language}`)}
                          data={travelData}
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
                  )}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
  };
}

export default connect(mapStateToProps)(ProgressResults);
