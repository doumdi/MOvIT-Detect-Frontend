/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import CustomCard from '../../../shared/card';
import { T } from '../../../../utilities/translator';
import { URL, OFFSET } from '../../../../redux/applicationReducer';
import { get } from '../../../../utilities/secureHTTP';

class MonthlySittingTime extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
    month: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = {
      sitMonthData: [],
      sitMonthLabels: [],
      sitChartData: null,
      sitLoading: true,
      month: props.month,
    };

    this.getSitMonthData(props.month);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.month !== this.state.month) {
      this.setState({ month: nextProps.month });
      this.getSitMonthData(nextProps.month);
    }
  }

  async getSitMonthData(month) {
    const date = new Date(new Date().getFullYear(), month, 1);
    this.state.sitLoading = true;
    const response = await get(`${URL}sittingTime?Day=${+date},offset=${OFFSET}`);
    this.formatSitChartData(response.data);
  }

  formatSitChartData(data) {
    this.state.sitMonthLabels = [];
    this.state.sitMonthData = [];
    Object.keys(data).forEach((key) => {
      this.state.sitMonthLabels.push(key.toString());
      this.state.sitMonthData.push(data[key] / 60);
    });
    this.loadSitData();
  }

  loadSitData() {
    this.state.sitChartData = {
      labels: this.state.sitMonthLabels,
      datasets: [
        {
          label: T.translate(`monthlyResults.hours.${this.props.language}`),
          backgroundColor: 'red',
          borderColor: 'red',
          data: this.state.sitMonthData,
        },
      ],
    };
    this.setState({ sitLoading: false });
  }

  render() {
    const hourOptions = {
      scales: {
        yAxes: [{
          ticks: {
            callback: value => `${value} h`,
            min: 0,
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
            label += ' h';
            return label;
          },
        },
      },
      legend: {
        onClick: null,
      },
    };

    return (
      <div className="container" id="monthlySitting">
        {!this.state.sitLoading
          && (<CustomCard
            header={<h4>{T.translate(`monthlyResults.wheelChair.${this.props.language}`)}</h4>}
            element={<Chart type="bar" data={this.state.sitChartData} options={hourOptions} />}
          />
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(MonthlySittingTime);
