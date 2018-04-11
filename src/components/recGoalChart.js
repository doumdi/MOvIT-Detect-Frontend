
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';


export default class RecGoalChart extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    goalTitle: PropTypes.string.isRequired,
    recTitle: PropTypes.string.isRequired,
    goalData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    recData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }

  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
    };

    return (
      <div>
        {this.props.condition &&
          <div>
            <hr />
            <h2 style={style.center}>{this.props.title}</h2>
            <hr />
            <h4>{this.props.goalTitle}</h4>
            <Chart type="line" data={this.props.goalData} />
            <hr />
            <h4>{this.props.recTitle}</h4>
            <Chart type="line" data={this.props.recData} />
          </div>
        }
      </div>
    );
  }
}
