/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import CustomCard from '../shared/card';

export default class RecPanel extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    id: PropTypes.string,
    tooltip: PropTypes.string,
  };

  render() {
    const style = {
      padding: '0px',
      card: {
        height: '100%',
      },
    };
    const header = (
      <div className="ui-card-title">
        {this.props.title}
        {this.props.tooltip
          && <i id={`recPanel${this.props.id}`} className="fa fa-info-circle px-2" />
        }
      </div>
    );
    return (
      <div className="col-12 col-sm-6 col-md-4" style={style}>
        {this.props.condition
          && (
            <CustomCard
              header={header}
              element={<span>{this.props.value}</span>}
              style={style.card}
            />
          )
        }
        <Tooltip
          for={`#recPanel${this.props.id}`}
          title={this.props.tooltip}
        />
      </div>
    );
  }
}
