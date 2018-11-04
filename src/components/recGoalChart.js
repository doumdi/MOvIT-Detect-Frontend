/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';


export default class RecGoalChart extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    goalTitle: PropTypes.string.isRequired,
    recTitle: PropTypes.string.isRequired,
    goalData: PropTypes.object,
    recData: PropTypes.object,
  }

  hover(e) {
    /* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["e"] }] */
    e.target.style.cursor = 'pointer';
  }

  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
    };

    const options = {
      legend: {
        onHover: e => this.hover(e),
      },
    };
    return (
      <div>
        {this.props.condition
          && (
            <div>
              <hr />
              <h2 style={style.center}>{this.props.title}</h2>
              <hr />
              <h4>{this.props.goalTitle}</h4>
              <Chart type="line" data={this.props.goalData} options={options} />
              <hr />
              <h4>{this.props.recTitle}</h4>
              <Chart type="line" data={this.props.recData} options={options} />
            </div>
          )
        }
      </div>
    );
  }
}
