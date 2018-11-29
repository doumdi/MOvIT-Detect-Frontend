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

import GoalProgress from './goalProgress';
import PressureCenter from './pressureCenter';
import RecGoalProgress from './recGoalProgress';
import { T } from '../../../../utilities/translator';
import { get } from '../../../../utilities/secureHTTP';

class DailyPressureResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    reduceWeight: PropTypes.bool,
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      date: props.date,
      value1: 50,
      value2: 70,
      daySildeRest: 0,
      daySildeMoving: 0,
      isLoaded: false,
      hasErrors: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date });
      this.getDailySlidingProgress(nextProps.date);
    }
  }

  async getDailySlidingProgress(date) {
    this.setState({ hasErrors: false, isLoaded: false });
    try {
      const response = await get(`${URL}dailySlideProgress?Day=${+date}&offset=${OFFSET}`);
      this.loadDailySlidingData(response.data);
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  loadDailySlidingData(data) {
    this.setState({
      daySildeRest: data[0] * 100,
      daySildeMoving: data[1] * 100,
      isLoaded: true,
    });
  }

  render() {
    return (
      <div>
        {!IS_TABLET
          && (
            <div className="col-lg-2 leftMenu">
              <ul className="graphlist">
                <li className="graphLink">
                  <a href="results/pressure#dailyPressureCenter">{T.translate(`results.graphicsLink.pressureCenter.${this.props.language}`)}</a>
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
              {this.state.date
                && (
                  <div>
                    <PressureCenter
                      title={T.translate(`results.graphicsLink.pressureCenter.${this.props.language}`)}
                      date={this.state.date}
                    />
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
                        isLoaded={this.state.isLoaded}
                        hasErrors={this.state.hasErrors}
                      />
                    </div>
                    <div id="reduceSlidingRest">
                      <GoalProgress
                        condition={this.props.reduceSlidingRest}
                        title={T.translate(`dailyResults.rest.${this.props.language}`)}
                        value={this.state.daySildeRest}
                        isLoaded={this.state.isLoaded}
                        hasErrors={this.state.hasErrors}
                      />
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
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
  };
}

export default connect(mapStateToProps)(DailyPressureResults);
