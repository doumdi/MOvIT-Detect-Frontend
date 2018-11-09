/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { T } from '../utilities/translator';
import PressureCenter from '../components/pressureCenter';
import ResultsCalendar from '../components/resultsCalendar';
import MonthlySittingTime from '../components/monthlySittingTime';
import '../styles/style.css';
import '../styles/results.css';

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
    const isMobile = this.state.width <= 500;
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
                <div>
                  <div><a href="#dailyPressureCenter">{T.translate(`results.graphicsLink.pressureCenter.${this.props.language}`)}</a></div>
                </div>
              )
              : (
                <div>
                  <div><a href="#monthlySitting">{T.translate(`results.graphicsLink.sittingTime.${this.props.language}`)}</a></div>
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
                <PressureCenter
                  title={T.translate(`results.graphicsLink.pressureCenter.${this.props.language}`)}
                  date={this.state.date}
                />
              )
              : <MonthlySittingTime month={this.state.month} />
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
