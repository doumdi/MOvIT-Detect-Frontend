/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MonthlySittingTime from '../components/results/pressureResults/monthlySittingTime';
import PressureCenter from '../components/results/pressureResults/pressureCenter';
import ResultsCalendar from '../components/results/resultsCalendar';
import { T } from '../utilities/translator';

class PressureResults extends Component {
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
    const isMobile = this.state.width <= 770;
    return (
      <div>
        <ResultsCalendar onPeriodChange={this.changePeriod} onDateChange={this.changeDate} onMonthChange={this.changeMonth} />
        <h2 className="center">{T.translate(`results.categories.pressure.${this.props.language}`)}</h2>
        <hr />
        {!isMobile
          && (
          <div className="col-lg-2 leftMenu">
            {this.state.period === 'day'
              ? (
                <ul className="graphlist">
                  <li className="graphLink">
                    <a href="results/pressure#dailyPressureCenter">{T.translate(`results.graphicsLink.pressureCenter.${this.props.language}`)}</a>
                  </li>
                </ul>
              )
              : (
                <ul className="graphlist">
                  <li className="graphLink">
                    <a href="results/pressure#monthlySitting">{T.translate(`results.graphicsLink.sittingTime.${this.props.language}`)}</a>
                  </li>
                </ul>
              )
            }
          </div>
          )
        }
        <div className=" col-lg-10 offset-lg-3 results resultsContainer">
          <div className="col-lg-8 graphic">
            {this.state.period === 'day'
              ? (
                <div>
                  {this.state.date
                  && (
                  <PressureCenter
                    title={T.translate(`results.graphicsLink.pressureCenter.${this.props.language}`)}
                    date={this.state.date}
                  />
                  )
                }
                </div>
              )
              : (
                <div>
                  {this.state.month
                  && <MonthlySittingTime month={this.state.month} />
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

export default connect(mapStateToProps)(PressureResults);
