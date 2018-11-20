/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../../../../styles/results.css';

import React, { Component } from 'react';

import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import CustomCard from '../../../shared/card';
import { T } from '../../../../utilities/translator';
import { URL } from '../../../../redux/applicationReducer';

class DailyAngleDistribution extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    reduceWeight: PropTypes.bool.isRequired,
    reduceSlidingMoving: PropTypes.bool.isRequired,
    reduceSlidingRest: PropTypes.bool.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    header: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      dayData: [],
      date: props.date,
      data: null,
      loading: true,
    };
    this.getDayData(this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.state.date) {
      this.state.date = nextProps.date;
      this.getDayData(nextProps.date);
    }
  }

  async getDayData(date) {
    this.state.loading = true;
    try {
      const response = await axios.get(`${URL}oneDay?Day=${+date}`, this.props.header);
      this.state.dayData = response.data.map(v => v / 60000);
      this.loadData();
    } catch (error) {
      console.log(error);
    }
  }

  loadData() {
    this.state.data = {
      labels: [
        T.translate(`dailyResults.angleDistribution.zero.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.fifteen.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.thirty.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.fortyfive.${this.props.language}`),
        T.translate(`dailyResults.angleDistribution.more.${this.props.language}`),
      ],
      datasets: [
        {
          data: this.state.dayData,
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
          ],
        },
      ],
    };
    this.setState({ loading: false });
  }

  formatTime(min) {
    const hours = Math.floor(min / 60);
    let minutes = Math.floor((min - ((hours * 3600)) / 60));
    let seconds = Math.floor((min * 60) - (hours * 3600) - (minutes * 60));

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  render() {
    const minOptions = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, labelData) => {
            let label = labelData.labels[tooltipItem.index] || '';
            if (label) {
              label += ': ';
            }
            label += this.formatTime(labelData.datasets[0].data[tooltipItem.index]);
            return label;
          },
        },
      },
    };
    return (
      <div className="container graphic" id="dailyAngle">
        {!this.state.loading
          && (
          <CustomCard
            header={<h4>{T.translate(`dailyResults.angleDistribution.${this.props.language}`)}</h4>}
            element={<Chart type="pie" data={this.state.data} options={minOptions} />}
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
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(DailyAngleDistribution);
