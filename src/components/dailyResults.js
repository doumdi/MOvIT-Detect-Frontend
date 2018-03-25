import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Chart } from 'primereact/components/chart/Chart';
import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import { T } from '../index';

class DailyResults extends Component {
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
        textAlign: 'center'
      },
      bottom: {
        paddingBottom: '400px'
      },
    };

    const data = {
      labels: [
        T.translate(`dailyResults.angleDistribution.zero.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.fifteen.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.thirty.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.fortyfive.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.more.${this.props.language}`)
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

    const minOptions = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, labelData) => {
            let label = labelData.labels[tooltipItem.index] || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(labelData.datasets[0].data[tooltipItem.index] * 100) / 100;
            label += ' min';
            return label;
          }
        }
      },
    };

    return (
      <div className="container">
        <h2 style={style.center}>{T.translate(`dailyResults.howDo.${this.props.language}`)}</h2>
        <br />
        <h4>{T.translate(`dailyResults.angleDistribution.${this.props.language}`)}</h4>
        <hr />
        <Chart type="pie" data={data} options={minOptions} />
        <hr />
        <h2 style={style.center}>{T.translate(`dailyResults.pressure.${this.props.language}`)}</h2>
        <h4>{T.translate(`dailyResults.personal.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value1} />
        <p style={style.center}>{T.translate(`dailyResults.personal.description.${this.props.language}`, { percent: this.state.value1 })}</p>

        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value2} />
        <p style={style.center}>{T.translate(`dailyResults.recommended.description.${this.props.language}`, { percent: this.state.value2 })}</p>

        <hr />
        <h2 style={style.center}>{T.translate(`dailyResults.travel.${this.props.language}`)}</h2>

        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value2} />
        <p style={style.center}>{T.translate(`dailyResults.recommended.description.${this.props.language}`, { percent: this.state.value2 })}</p>

        <hr />
        <h2 style={style.center}>{T.translate(`dailyResults.rest.${this.props.language}`)}</h2>

        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.state.value2} />
        <p style={style.center}>{T.translate(`dailyResults.recommended.description.${this.props.language}`, { percent: this.state.value2 })}</p>
        <div style={style.bottom} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language
  };
}

export default connect(mapStateToProps)(DailyResults);
