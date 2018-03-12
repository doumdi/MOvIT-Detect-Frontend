import React, { Component } from 'react';

import { Chart } from 'primereact/components/chart/Chart';
import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import { T } from '../index';

class dailyResults extends Component {
  constructor() {
    super();
    this.state = {
      value1: 50,
      value2: 30,
    };
  }

  render() {
    const style = {
      center: {
        'text-align': 'center'
      },
      bottom: {
        'padding-bottom': '400px'
      },
    };

    const data = {
      labels: [
        '0',
        '0-15',
        '15-30',
        '30-45',
        '45-180',
      ],
      datasets: [
        {
          data: [300, 50, 100, 200, 50],
          backgroundColor: [
            'red',
            'green',
            'blue',
            'orange',
            'purple',
          ],
          hoverBackgroundColor: [
            'red',
            'green',
            'blue',
            'orange',
            'purple',
          ]
        }
      ]
    };

    return (
      <div className="container">
        <h1 style={style.center}>{T.translate(`dailyResults.${this.props.language}`)}</h1>
        <hr />
        <h1 style={style.center}>{T.translate(`dailyResults.howDo.${this.props.language}`)}</h1>
        <br />
        <h4>{T.translate(`dailyResults.angleDistribution.${this.props.language}`)}</h4>
        <hr />
        <Chart type="pie" data={data} />
        <hr />
        <h1 style={style.center}>{T.translate(`dailyResults.pressure.${this.props.language}`)}</h1>
        <h4>{T.translate(`dailyResults.personal.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value1} />
        <p style={style.center}>{T.translate(`dailyResults.personal.description.${this.props.language}`)}</p>

        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value2} />
        <p style={style.center}>{T.translate(`dailyResults.recommended.description.${this.props.language}`)}</p>

        <hr />
        <h1 style={style.center}>{T.translate(`dailyResults.travel.${this.props.language}`)}</h1>

        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value2} />
        <p style={style.center}>{T.translate(`dailyResults.recommended.description.${this.props.language}`)}</p>

        <hr />
        <h1 style={style.center}>{T.translate(`dailyResults.rest.${this.props.language}`)}</h1>

        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value2} />
        <p style={style.center}>{T.translate(`dailyResults.recommended.description.${this.props.language}`)}</p>
        <div style={style.bottom} />
      </div>
    );
  }
}

export default dailyResults;
