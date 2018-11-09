/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
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
      padding: '10px',
      card: {
        padding: '5px',
        backgroundColor: 'white',
        boxShadow: '5px 5px 5px gainsboro',
        height: '100%',
      },
    };

    return (
      <div className="col-12 col-sm-6 col-md-4 " style={style}>
        {this.props.condition
          &&
          <Card title={this.props.title} style={style.card}>
            {this.props.value}
          </Card>
        }
      </div>
    );
  }
}
