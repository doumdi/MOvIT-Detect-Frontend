import React, { Component } from 'react';
import { Chart } from 'primereact/components/chart/Chart';
import { Calendar } from 'primereact/components/calendar/Calendar';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';

export default class Graphic extends Component {

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
        textAlign: 'center',
        marginBottom: '2em'
      },
      chart: {
        width: '70%',
        height: '70%'
      }
    };

    const periods = [
        { label: 'Day', value: 'day' },
        { label: 'Week', value: 'week' },
        { label: 'Month', value: 'month' }
    ];

    const dayData = {
      labels: ['6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h',
        '18h', '19h', '20h', '21h', '22h'],
      datasets: [
        {
          label: 'Today',
          data: [65, 59, 80, 81, 63, 56, 87, 46, 23, 67],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Yesterday',
          data: [28, 48, 40, 19, 86, 27, 90, 24, 17, 56, 63, 56, 87, 46, 72, 34, 10],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };

    const weekData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday', 'Saturday'],
      datasets: [
        {
          label: 'Current week',
          data: [65, 59, 80, 81],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Last week',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };

    const monthData = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
      datasets: [
        {
          label: 'Current month',
          data: [65, 59, 80, 81, 70, 90, 80, 70, 56, 63, 56, 40, 46, 72, 54],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Last month',
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 24, 17, 56, 63, 56,
            87, 46, 72, 34, 10, 28, 48, 40, 19, 86],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    let data = dayData;
    if (this.state.period === 'day') {
      data = dayData;
    } else if (this.state.period === 'week') {
      data = weekData;
    } else if (this.state.period === 'month') {
      data = monthData;
    }

    return (
      <div>
        <div style={style.content}>
          <legend className="text-center header"><h2>Graphic</h2></legend>
          <span>Date: </span>
          <Calendar value={this.state.date} onChange={(e) => this.setState({ date: e.value })} />
          <Dropdown value={this.state.period} options={periods} onChange={this.onPeriodChange} style={{ width: '150px', marginLeft: '15px' }} placeholder="Select a period" />
        </div>
        <div className="content-section implementation">
          <span className="col-sm-3" />
          <Chart type="line" data={data} options={options} className="col-sm-6" style={style} />
        </div>

      </div>

    );
  }
}
