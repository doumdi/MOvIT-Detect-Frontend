import '../../styles/components/moduleStatus.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { connect } from 'react-redux';
import { URL } from '../../redux/applicationReducer';
import { T } from '../../utilities/translator';
import { get } from '../../utilities/secureHTTP';

class ModuleStatus extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      moduleStatus: [],
    };
    this.getStatus();
  }

  async getStatus() {
    const response = await get(`${URL}Debug`);
    this.setState({ moduleStatus: response.data });
  }

  render() {
    const moduleList = this.state.moduleStatus.map((module, index) => (
      <li className="mb-1" key={module.name}>
        {module.name}: &nbsp;
        <span id={`sensor${index}`} style={{ color: module.value ? 'green' : 'red', float: 'right' }}>
          {module.value
            ? <i className="fa fa-check-circle" />
            : <i className="fa fa-times-circle" />
          }
        </span>
        <Tooltip
          for={`#sensor${index}`}
          title={T.translate(`settings.state.value.${module.value ? 'connected' : 'disconnected'}.${this.props.language}`)}
        />
      </li>
    ));

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
