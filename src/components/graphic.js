import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Calendar } from 'primereact/components/calendar/Calendar';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';
import { T } from '../index';
import DailyResults from './dailyResults';
import MonthlyResults from './monthlyResults';

class Graphic extends Component {

  constructor() {
    super();
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
        { label: 'Day', value: 'day' },
        { label: 'Month', value: 'month' }
    ];

    // const dayData = {
    //   labels: ['6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h',
    //     '18h', '19h', '20h', '21h', '22h'],
    //   datasets: [
    //     {
    //       label: 'Today',
    //       data: [65, 59, 80, 81, 63, 56, 87, 46, 23, 67],
    //       fill: false,
    //       borderColor: '#4bc0c0'
    //     },
    //     {
    //       label: 'Yesterday',
    //       data: [28, 48, 40, 19, 86, 27, 90, 24, 17, 56, 63, 56, 87, 46, 72, 34, 10],
    //       fill: false,
    //       borderColor: '#565656'
    //     }
    //   ]
    // };

    // const dayData = {
    //   labels: [
    //     '0-15',
    //     '15-30',
    //     '30-45',
    //     '45-180',
    //   ],
    //   datasets: [
    //     {
    //       data: [300, 50, 100],
    //       backgroundColor: [
    //         'red',
    //         'green',
    //         'blue',
    //         'orange',
    //         'purple',
    //       ],
    //       hoverBackgroundColor: [
    //         'red',
    //         'green',
    //         'blue',
    //         'orange',
    //         'purple',
    //       ]
    //     }
    //   ]
    // };

    // const weekData = {
    //   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday', 'Saturday'],
    //   datasets: [
    //     {
    //       label: 'Current week',
    //       data: [65, 59, 80, 81],
    //       fill: false,
    //       borderColor: '#4bc0c0'
    //     },
    //     {
    //       label: 'Last week',
    //       data: [28, 48, 40, 19, 86, 27, 90],
    //       fill: false,
    //       borderColor: '#565656'
    //     }
    //   ]
    // };

    // const monthData = {
    //   labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
    //     '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
    // '25', '26', '27', '28', '29', '30'],
    //   datasets: [
    //     {
    //       label: 'Current month',
    //       data: [65, 59, 80, 81, 70, 90, 80, 70, 56, 63, 56, 40, 46, 72, 54],
    //       fill: false,
    //       borderColor: '#4bc0c0'
    //     },
    //     {
    //       label: 'Last month',
    //       data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 24, 17, 56, 63, 56,
    //         87, 46, 72, 34, 10, 28, 48, 40, 19, 86],
    //       fill: false,
    //       borderColor: '#565656'
    //     }
    //   ]
    // };


    if (this.state.period === 'day') {
      return (
        <div>
          <div style={style.content}>
            <h1>{T.translate(`graphics.${this.props.language}`)}</h1>
            <span>Date: </span>
            <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} />
            <Dropdown value={this.state.period} options={periods} onChange={this.onPeriodChange} style={{ width: '150px', marginLeft: '15px' }} placeholder="Select a period" />

          </div>
          <div className="content-section implementation">
            <span className="col-sm-3" />
            {/* <Chart type="pie" data={data} /> */}
            <DailyResults language={this.props.language} />
          </div>

        </div>
      );
    } else if (this.state.period === 'month') {
      return (
        <div>
          <div style={style.content}>
            <h1>{T.translate(`graphics.${this.props.language}`)}</h1>
            <span>Date: </span>
            <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} />
            <Dropdown value={this.state.period} options={periods} onChange={this.onPeriodChange} style={{ width: '150px', marginLeft: '15px' }} placeholder="Select a period" />

          </div>
          <div className="content-section implementation">
            <span className="col-sm-3" />
            {/* <Chart type="pie" data={data} /> */}
            <MonthlyResults />
          </div>

        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language
  };
}
export default connect(mapStateToProps)(Graphic);
