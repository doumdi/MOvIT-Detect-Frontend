/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import CustomCard from '../../shared/card';
import { T } from '../../../utilities/translator';
import { URL } from '../../../redux/applicationReducer';
import '../../../styles/results.css';

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

  getDayData(date) {
    this.state.loading = true;
    axios.get(`${URL}oneDay?Day=${+date}`, this.props.header)
      .then((response) => { this.state.dayData = response.data.map(v => v / 60000); this.loadData(); });
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

  render() {
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
