/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IS_TABLET, OFFSET, URL } from '../../../../redux/applicationReducer';

import GoalChart from './goalChart';
import MonthlySittingTime from './monthlySittingTime';
import RecGoalChart from './recGoalChart';
import { T } from '../../../../utilities/translator';
import { get } from '../../../../utilities/secureHTTP';

class MonthlyPressureResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    reduceWeight: PropTypes.bool,
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
    month: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      month: props.month,
      monthSildeRest: [],
      monthSildeMoving: [],
      monthSlideLabels: [],
      isLoaded: false,
      hasErrors: false,
    };
    this.getMonthlySlidingProgress(props.month);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ month: nextProps.month });
      this.getMonthlySlidingProgress(nextProps.month);
    }
  }

  async getMonthlySlidingProgress(month) {
    const date = new Date(new Date().getFullYear(), month, 1);
    this.setState({ hasErrors: false, isLoaded: false });
    try {
      const response = await get(`${URL}monthlySlideProgress?Day=${+date}&Offset=${OFFSET}`);
      this.loadMonthlySlidingData(response.data);
      this.setState({ isLoaded: true });
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  loadMonthlySlidingData(data) {
    const newMonthSlideLabels = [];
    const newMonthSildeRest = [];
    const newMonthSlideMoving = [];
    Object.keys(data).forEach((key) => {
      newMonthSlideLabels.push(key.toString());
      newMonthSildeRest.push(data[key][0] * 100);
      newMonthSlideMoving.push(data[key][1] * 100);
    });

    this.setState({
      monthSlideLabels: newMonthSlideLabels,
      monthSildeRest: newMonthSildeRest,
      monthSildeMoving: newMonthSlideMoving,
    });
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
        {!IS_TABLET
          && (
            <div className="col-lg-2 leftMenu">
              <ul className="graphlist">
                <li className="graphLink">
                  <a href="results/pressure#monthlySitting">{T.translate(`results.graphicsLink.sittingTime.${this.props.language}`)}</a>
                </li>
                {this.props.reduceWeight
                  && (
                    <li className="graphLink">
                      <a href="results/pressure#reduceWeight">{T.translate(`dailyResults.pressure.${this.props.language}`)}</a>
                    </li>
                  )}
                {this.props.reduceSlidingMoving
                  && (
                    <li className="graphLink">
                      <a href="results/pressure#reduceSlidingMoving">{T.translate(`dailyResults.travel.${this.props.language}`)}</a>
                    </li>
                  )}
                {this.props.reduceSlidingRest
                  && (
                    <li className="graphLink">
                      <a href="results/pressure#reduceSlidingRest">{T.translate(`monthlyResults.rest.${this.props.language}`)}</a>
                    </li>
                  )}
              </ul>
            </div>
          )
        }
        <div className=" col-lg-10 offset-lg-3 results resultsContainer">
          <div className="col-lg-8 graphic">
            <div>
              {this.state.month
                && (<MonthlySittingTime month={this.state.month} />)
              }
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
              <div>
                <div id="reduceSlidingMoving">
                  <GoalChart
                    condition={this.props.reduceSlidingMoving}
                    title={T.translate(`monthlyResults.travel.${this.props.language}`)}
                    successMessage={T.translate(`monthlyResults.travel.success.${this.props.language}`)}
                    data={travelData}
                    options={percentOptions}
                    isLoaded={this.state.isLoaded}
                    hasErrors={this.state.hasErrors}
                  />
                </div>
                <div id="reduceSlidingRest">
                  <GoalChart
                    condition={this.props.reduceSlidingRest}
                    title={T.translate(`monthlyResults.rest.${this.props.language}`)}
                    successMessage={T.translate(`monthlyResults.rest.success.${this.props.language}`)}
                    data={restData}
                    options={percentOptions}
                    isLoaded={this.state.isLoaded}
                    hasErrors={this.state.hasErrors}
                  />
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps)(MonthlyPressureResults);
