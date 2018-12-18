/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { Chart } from 'primereact/components/chart/Chart';
import PropTypes from 'prop-types';
import CustomCard from '../../../shared/card';
import { getElement } from '../../../../utilities/loader';

export default class GoalChart extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    successMessage: PropTypes.string.isRequired,
    data: PropTypes.object,
    options: PropTypes.object.isRequired,
    id: PropTypes.string,
    isLoaded: PropTypes.bool.isRequired,
    hasErrors: PropTypes.bool.isRequired,
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
    const chart = <Chart type="line" data={this.props.data} options={this.props.options} />;

    return (
      <div>
        {this.props.condition
          && (
            <div>
              <CustomCard
                header={header}
                element={getElement(this.props.isLoaded, this.props.hasErrors, chart)}
              />
            </div>
          )
        }
      </div>
    );
  }
}
