import '../../styles/components/moduleStatus.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import axios from 'axios';
import { connect } from 'react-redux';
import { URL } from '../../redux/applicationReducer';
import { T } from '../../utilities/translator';

class ModuleStatus extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      moduleStatus: {},
    };
    this.getStatus();
  }

  getStatus() {
    axios.get(`${URL}Debug`)
      .then(response => this.setState({ moduleStatus: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    const moduleList = [];
    const whiteList = [
      'notificationModule',
      'fixedAccelerometer',
      'mobileAccelerometer',
      'pressureMat',
    ];

    for (const module in this.state.moduleStatus) {
      if (whiteList.includes(module)) {
        const moduleValue = this.state.moduleStatus[module];
        moduleList.push((
          <li className="mb-1" key={module}>
            {T.translate(`settings.state.value.${module}.${this.props.language}`)}: &nbsp;
            <span id={`sensor${module}`} style={{ color: moduleValue ? 'green' : 'red' }}>
              {moduleValue
                ? <i className="fa fa-check-circle" />
                : <i className="fa fa-times-circle" />
              }
            </span>
            <Tooltip
              for={`#sensor${module}`}
              title={T.translate(`settings.state.value.${moduleValue ? 'connected' : 'disconnected'}.${this.props.language}`)}
            />
          </li>
        ));
      }
    }

    return (
      <div className="row">
        <div className="col-6">
          <ul className="list-unstyled smallWidth">{moduleList}</ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(ModuleStatus);
