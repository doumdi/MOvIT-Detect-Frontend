/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../../styles/card.css';

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import PropTypes from 'prop-types';

export default class CustomCard extends Component {
  static propTypes = {
    element: PropTypes.element.isRequired,
    header: PropTypes.element.isRequired,
    style: PropTypes.object,
  }

  render() {
    return (
      <div className="cardContainer" style={this.props.style}>
        <Card
          className="card"
          header={this.props.header}
        >
          {this.props.element}
        </Card>
      </div>
    );
  }
}
