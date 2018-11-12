/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../../styles/card.css';
import '../../styles/overwrite.css';

import React, { Component } from 'react';

import { Card } from 'primereact/components/card/Card';
import PropTypes from 'prop-types';

export default class CustomCard extends Component {
  static propTypes = {
    element: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const header = (
      <span className="ui-card-title">
        {this.props.title}
      </span>
    );
    return (
      <div className="container">
        <div className="card">
          <Card header={header}>
            {this.props.element}
          </Card>
        </div>
      </div>
    );
  }
}
