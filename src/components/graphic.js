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
      period: 'day'
    };

    this.onPeriodChange = this.onPeriodChange.bind(this);
  }

  onPeriodChange(e) {
    this.setState({ period: e.value });
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
          <Calendar locale={locale[this.props.language]} value={this.state.date} onChange={(e) => this.setState({ date: e.value })} />
          <Dropdown
            value={this.state.period}
            options={periods}
            onChange={this.onPeriodChange}
            style={{ width: '150px', marginLeft: '15px' }}
            placeholder="Select a period"
          />

        </div>
        <div className="content-section implementation">
          <span className="col-sm-3" />
          <Results language={this.props.language} />
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
