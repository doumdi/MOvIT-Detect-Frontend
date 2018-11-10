/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import '../../styles/panel.css';
import '../../styles/overwrite.css';

import React, { Component } from 'react';

import { Panel } from 'primereact/components/panel/Panel';
import PropTypes from 'prop-types';

export default class CustomPanel extends Component {
  static propTypes = {
    element: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      panelCollapsed: true,
    };
  }

  render() {
    const header = (
      <span className="header">
        {this.props.title}
      </span>
    );
    return (
      <div className="container">
        <div className="card">
          <Panel
            header={header}
            toggleable
            collapsed={this.state.panelCollapsed}
            onCollapse={() => this.setState({ panelCollapsed: !this.state.panelCollapsed })
            }
          >
            {this.props.element}
          </Panel>
        </div>
      </div>
    );
  }
}
