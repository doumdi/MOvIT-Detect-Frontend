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

    return (
      <div>
        <div style={style.content}>
          <h1>{T.translate(`graphics.${this.props.language}`)}</h1>
          <span>Date: </span>
          <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} />
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
