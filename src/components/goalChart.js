
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';


export default class GoalChart extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
    data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
            <h4>{this.props.successMessage}</h4>
            <Chart type="line" data={this.props.data} options={this.props.options} />
          </div>
        }
      </div>
    );
  }
}
