/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/components/card/Card';


export default class RecPanel extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const style = {
      padding: '2px',
      card: {
        height: '150px',
        padding: '2px',
      },
    };

    return (
      <div>
        {this.props.condition
          &&
          <div className="col-md-4" style={style}>
            <Card title={this.props.title} style={style.card}>
              {this.props.value}
            </Card>
          </div>
        }
      </div>
    );
  }
}
