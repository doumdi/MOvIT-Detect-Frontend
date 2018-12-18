/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GoalChart from './goalChart';
import MonthlyAngleDistribution from './monthlyAngleDistribution';
import MonthlySuccessTilt from './monthlySuccessTilt';
import { T } from '../../../../utilities/translator';
import { IS_TABLET, OFFSET, URL } from '../../../../redux/applicationReducer';
import { get } from '../../../../utilities/secureHTTP';


class MonthlyAngleResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    month: PropTypes.string,
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      month: props.month,
      monthSildeRest: [],
      monthSildeMoving: [],
      monthSlideLabels: [],
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
              <li className="graphLink"><a href="results/angle#monthlyAngle">{T.translate(`results.graphicsLink.angle.${this.props.language}`)}</a></li>
              <li className="graphLink"><a href="results/angle#monthlyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</a></li>
              {this.props.reduceSlidingMoving
                && (
                  <li className="graphLink">
                    <a href="results/angle#reduceSlidingMoving">{T.translate(`dailyResults.travel.${this.props.language}`)}</a>
                  </li>
                )}
              {this.props.reduceSlidingRest
                && (
                  <li className="graphLink">
                    <a href="results/angle#reduceSlidingRest">{T.translate(`monthlyResults.rest.${this.props.language}`)}</a>
                  </li>
                )}
            </ul>
          </div>
          )
        }
        <div className=" col-lg-10 offset-lg-2 results resultsContainer">
          <div className="col-lg-8 offset-lg-1">
            <div>
              {this.state.month
              && (
              <div>
                <MonthlyAngleDistribution month={this.state.month} />
                <MonthlySuccessTilt month={this.state.month} />
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
              )
            }
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
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
  };
}

export default connect(mapStateToProps)(MonthlyAngleResults);
