/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';

import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CustomCard from '../../../shared/card';
import { T } from '../../../../utilities/translator';
import { OFFSET, URL } from '../../../../redux/applicationReducer';
import { get } from '../../../../utilities/secureHTTP';
import { getElement } from '../../../../utilities/loader';

class MonthlyAngleDistribution extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    month: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      angleMonthData: {
        zero: [],
        fifteen: [],
        thirty: [],
        fortyfive: [],
        more: [],
      },
      angleMonthLabels: [],
      month: props.month,
      isLoaded: false,
      hasErrors: false,
    };

    this.getAngleMonthData(props.month);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ month: nextProps.month });
      this.getAngleMonthData(nextProps.month);
    }
  }

  async getAngleMonthData(month) {
    this.setState({ hasErrors: false, isLoaded: false });
    try {
      const date = new Date(new Date().getFullYear(), month, 1);
      const response = await get(`${URL}oneMonth?Day=${+date}&offset=${OFFSET}`);
      this.formatAngleChartData(response.data);
      this.setState({ isLoaded: true });
    } catch (error) {
      this.setState({ hasErrors: true });
    }
  }

  getAngleChartData() {
    return {
      labels: this.state.angleMonthLabels,
      datasets: [
        {
          label: T.translate(`monthlyResults.tiltDistribution.zero.${this.props.language}`),
          backgroundColor: 'red',
          borderColor: 'red',
          data: this.state.angleMonthData.zero,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.fifteen.${this.props.language}`),
          backgroundColor: 'green',
          borderColor: 'green',
          data: this.state.angleMonthData.fifteen,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.thirty.${this.props.language}`),
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: this.state.angleMonthData.thirty,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.fortyfive.${this.props.language}`),
          backgroundColor: 'orange',
          borderColor: 'orange',
          data: this.state.angleMonthData.fortyfive,
        },
        {
          label: T.translate(`monthlyResults.tiltDistribution.more.${this.props.language}`),
          backgroundColor: 'purple',
          borderColor: 'purple',
          data: this.state.angleMonthData.more,
        },
      ],
    };
  }

  formatAngleChartData(data) {
    this.state.angleMonthLabels = [];
    this.state.angleMonthData = {
      zero: [],
      fifteen: [],
      thirty: [],
      fortyfive: [],
      more: [],
    };
    Object.keys(data).forEach((key) => {
      const total = data[key].reduce((a, b) => a + b, 0);
      const percents = data[key].map(v => (v / total) * 100);

      this.state.angleMonthLabels.push(key.toString());
      this.state.angleMonthData.zero.push(percents[0]);
      this.state.angleMonthData.fifteen.push(percents[1]);
      this.state.angleMonthData.thirty.push(percents[2]);
      this.state.angleMonthData.fortyfive.push(percents[3]);
      this.state.angleMonthData.more.push(percents[4]);
    });
  }

  render() {
    const percentOptions2 = {
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            callback: value => `${value}%`,
            min: 0,
            max: 100,
          },
        }],
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            let label = data.datasets[tooltipItem.datasetIndex].label || '';
            if (label) {
              label += ': ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            label += '%';
            return label;
          },
        },
      },
    };
    const angleChartData = this.getAngleChartData();
    const chart = <Chart type="bar" data={angleChartData} options={percentOptions2} />;

    return (
      <div className="container graphic" id="monthlyAngle">
        <CustomCard
          header={<h4>{T.translate(`monthlyResults.tiltDistribution.${this.props.language}`)}</h4>}
          element={getElement(this.state.isLoaded, this.state.hasErrors, chart)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(MonthlyAngleDistribution);
