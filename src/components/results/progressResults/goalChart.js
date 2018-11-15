/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'primereact/components/chart/Chart';
import CustomCard from '../../shared/card';

export default class GoalChart extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
    data: PropTypes.object,
    options: PropTypes.object.isRequired,
    id: PropTypes.string,
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
    };

    const header = (
      <div>
        <h2 id={this.props.id || ''} style={style.center}>{this.props.title}</h2>
        <h4>{this.props.successMessage}</h4>
      </div>
    );

    return (
      <div>
        {this.props.condition
          && (
          <div>
            <CustomCard
              header={header}
              element={<Chart type="line" data={this.props.data} options={this.props.options} />}
            />
          </div>
          )
        }
      </div>
    );
  }
}
