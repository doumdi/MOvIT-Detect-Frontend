import '../../styles/components/moduleStatus.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { connect } from 'react-redux';
import { T } from '../../utilities/translator';
import ErrorMessage from '../shared/errorMessage';

class ModuleStatus extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    moduleStatus: PropTypes.object.isRequired,
    hasErrors: PropTypes.bool.isRequired,
  }

  render() {
    const moduleList = [];
    const whiteList = [
      'notificationModule',
      'fixedAccelerometer',
      'mobileAccelerometer',
      'pressureMat',
    ];

    for (const module in this.props.moduleStatus) {
      if (whiteList.includes(module)) {
        const moduleValue = this.props.moduleStatus[module];
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
      <div>
        {this.props.hasErrors
          ? <ErrorMessage />
          : (
            <div className="row">
              <div className="col-6">
                <ul className="list-unstyled smallWidth">{moduleList}</ul>
              </div>
            </div>
          )
        }
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
