/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DailyAngleDistribution from './dailyAngleDistribution';
import DailySuccessTilt from './dailySuccessTilt';
import GoalProgress from './goalProgress';
// import DailyLastTilts from './dailyLastTilts';

import { T } from '../../../../utilities/translator';
import { IS_TABLET, OFFSET, URL } from '../../../../redux/applicationReducer';
import { get } from '../../../../utilities/secureHTTP';


class DailyAngleResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    reduceSlidingMoving: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      date: props.date,
      daySildeRest: 0,
      daySildeMoving: 0,
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
      console.log('trying');

      const response = await get(`${URL}dailySlideProgress?Day=${+date}&Offset=${OFFSET}`);
      this.loadDailySlidingData(response.data);
    } catch (error) {
      console.log('catching');
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
                <li className="graphLink"><a href="results/angle#dailyAngle">{T.translate(`results.graphicsLink.angle.${this.props.language}`)}</a></li>
                <li className="graphLink"><a href="results/angle#dailyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</a></li>
                {/* <li className="graphLink"><a href="results/angle#dailyLastTilt">{T.translate(`lastTilts.title.${this.props.language}`)}</a></li> */}
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
              {this.state.date
                && (
                  <div>
                    <DailyAngleDistribution date={this.state.date} />
                    <DailySuccessTilt date={this.state.date} />
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
                    {/*
                      Graphic which shows the last 5 tilts. Very useful when testing
                      <DailyLastTilts date={this.state.date} />
                    */}
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

export default connect(mapStateToProps)(DailyAngleResults);
