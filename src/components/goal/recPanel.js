/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import CustomCard from '../shared/card';

export default class RecPanel extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const style = {
      padding: '0px',
      card: {
        height: '100%',
      },
    };
    return (
      <div className="col-12 col-sm-6 col-md-4" style={style}>
        {this.props.condition
          && (
            <CustomCard
              header={<span className="ui-card-title">{this.props.title}</span>}
              element={<span>{this.props.value}</span>}
              style={style.card}
            />
          )
        }
      </div>
    );
  }
}
