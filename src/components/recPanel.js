import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';


export default class RecPanel extends Component {
  static propTypes = {
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  render() {
    const style = {
      panels: {
        marginBottom: '0px',
      },
    };

    return (
      <div>
        {this.props.condition
          &&
          <Panel style={style.panels}>
            <Panel.Heading>
              <Panel.Title toggle>
                <i className="fa fa-chevron-down" /> {this.props.title}
              </Panel.Title>
            </Panel.Heading>
            <Panel.Body collapsible>
              {this.props.value}
            </Panel.Body>
          </Panel>
        }
      </div>
    );
  }
}
