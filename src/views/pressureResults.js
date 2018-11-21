/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../styles/results.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultsCalendar from '../components/results/resultsCalendar';
import { T } from '../utilities/translator';
import DailyPressureResults from '../components/results/pressureResults/daily/dailyPressureResults';
import MonthlyPressureResults from '../components/results/pressureResults/monthly/monthlyPressureResults';


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
    return (
      <div>
        <ResultsCalendar onPeriodChange={this.changePeriod} onDateChange={this.changeDate} onMonthChange={this.changeMonth} />
        <h2 className="center">{T.translate(`results.categories.pressure.${this.props.language}`)}</h2>
        <hr />
        {this.state.period === 'day'
          ? <DailyPressureResults date={this.state.date} />
          : <MonthlyPressureResults month={this.state.month} />
        }
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
