/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DailyAngleDistribution from '../components/results/angleResults/dailyAngleDistribution';
import DailySuccessTilt from '../components/results/angleResults/dailySuccessTilt';
import MonthlyAngleDistribution from '../components/results/angleResults/monthlyAngleDistribution';
import MonthlySuccessTilt from '../components/results/angleResults/monthlySuccessTilt';
import ResultsCalendar from '../components/results/resultsCalendar';
import { T } from '../utilities/translator';

class AngleResults extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
    month: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      period: 'day',
      width: window.innerWidth,
      date: props.date,
      month: props.month,
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
    this.setState({ period: newPeriod });
  }

  render() {
    const isMobile = this.state.width <= 500;
    return (
      <div>
        <ResultsCalendar onPeriodChange={this.changePeriod} onDateChange={this.changeDate} onMonthChange={this.changeMonth} />
        <h2 className="center">{T.translate(`results.categories.angle.${this.props.language}`)}</h2>
        <hr />
        {!isMobile
          && (
          <div className="col-lg-2 leftMenu">
            {this.state.period === 'day'
              ? (
                <ul className="graphlist">
                  <li className="graphLink"><a href="#dailyAngle">{T.translate(`results.graphicsLink.angle.${this.props.language}`)}</a></li>
                  <li className="graphLink"><a href="#dailyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</a></li>
                </ul>
              )
              : (
                <ul className="graphlist">
                  <li className="graphLink"><a href="#monthlyAngle">{T.translate(`results.graphicsLink.angle.${this.props.language}`)}</a></li>
                  <li className="graphLink"><a href="#monthlyTilt">{T.translate(`SuccessfulTilt.tiltMade.${this.props.language}`)}</a></li>
                </ul>
              )
            }
          </div>
          )
        }
        <div className=" col-lg-10 offset-lg-2 results resultsContainer">
          <div className="col-lg-8 offset-lg-1">
            {this.state.period === 'day'
              ? (
                <div>
                  {this.state.date
                  && (
                  <div>
                    <DailyAngleDistribution date={this.state.date} />
                    <DailySuccessTilt date={this.state.date} />
                  </div>
                  )
                }
                </div>
              )
              : (
                <div>
                  {this.state.month
                  && (
                  <div>
                    <MonthlyAngleDistribution month={this.state.month} />
                    <MonthlySuccessTilt month={this.state.month} />
                  </div>
                  )
                }
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
  };
}

export default connect(mapStateToProps)(AngleResults);
