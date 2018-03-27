import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Calendar } from 'primereact/components/calendar/Calendar';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';
import { T } from '../index';
import DailyResults from './dailyResults';
import MonthlyResults from './monthlyResults';

class Graphic extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: null,
      month: 2,
      period: 'day'
    };
    this.setDefaultDate();
    this.onPeriodChange = this.onPeriodChange.bind(this);
  }

  onPeriodChange(e) {
    this.setState({ period: e.value });
  }

  onMonthChange(e) {
    this.setState({ month: e.value });
  }

  setDefaultDate() {
    const date = new Date();
    date.setUTCHours(0, date.getTimezoneOffset(), 0, 0);
    this.state.date = date;
  }

  render() {
    const style = {
      marginBottom: '20vh',
      content: {
        textAlign: 'center'
      },
      chart: {
        width: '70%',
        height: '70%'
      }
    };

    const periods = [
        { label: T.translate(`graphics.day.${this.props.language}`), value: 'day' },
        { label: T.translate(`graphics.month.${this.props.language}`), value: 'month' }
    ];

    const months =
      this.props.language === 'FR' ?
      [
        { label: 'Janvier', value: 0 },
        { label: 'Février', value: 1 },
        { label: 'Mars', value: 2 },
        { label: 'Avril', value: 3 },
        { label: 'Mai', value: 4 },
        { label: 'Juin', value: 5 },
        { label: 'Juillet', value: 6 },
        { label: 'Août', value: 7 },
        { label: 'Septembre', value: 8 },
        { label: 'Octobre', value: 9 },
        { label: 'Novembre', value: 10 },
        { label: 'Décembre', value: 11 },
      ] :
      [
        { label: 'January', value: 0 },
        { label: 'February', value: 1 },
        { label: 'March', value: 2 },
        { label: 'April', value: 3 },
        { label: 'May', value: 4 },
        { label: 'June', value: 5 },
        { label: 'July', value: 6 },
        { label: 'August', value: 7 },
        { label: 'September', value: 8 },
        { label: 'October', value: 9 },
        { label: 'November', value: 10 },
        { label: 'December', value: 11 },
      ];

    const Results = this.state.period === 'day' ? DailyResults : MonthlyResults;
    const title = this.state.period === 'day' ?
    T.translate(`dailyResults.${this.props.language}`) :
    T.translate(`monthlyResults.${this.props.language}`);

    const locale = {
      FR: {
        firstDayOfWeek: 1,
        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
        monthNamesShort: ['jan', 'fév', 'mar', 'avr', 'mai', 'jui', 'jul', 'aoû', 'sep', 'oct', 'nov', 'déc']
      },
      EN: {
        firstDayOfWeek: 1,
        dayNames: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        dayNamesShort: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
        dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        monthNames: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        monthNamesShort: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
      }
    };

    return (
      <div>
        <div style={style.content}>
          <h1>{title}</h1>
          <span>Date: </span>
          {
            this.state.period === 'day' ?
              <Calendar locale={locale[this.props.language]} value={this.state.date} onChange={(e) => this.setState({ date: e.value })} /> :
              (
                <Dropdown
                  value={this.state.month}
                  options={months}
                  onChange={e => this.onMonthChange(e)}
                  style={{ width: '150px', marginLeft: '15px' }}
                  placeholder="Select a month"
                />
              )

          }
          <Dropdown
            value={this.state.period}
            options={periods}
            onChange={e => this.onPeriodChange(e)}
            style={{ width: '150px', marginLeft: '15px' }}
            placeholder="Select a period"
          />

        </div>
        <div className="content-section implementation">
          <span className="col-sm-3" />
          <Results language={this.props.language} date={this.state.date} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language
  };
}
export default connect(mapStateToProps)(Graphic);
