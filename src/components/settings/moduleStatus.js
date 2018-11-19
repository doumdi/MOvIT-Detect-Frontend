import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { T } from '../../utilities/translator';
import { URL } from '../../redux/applicationReducer';


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
        moduleList.push((
          <li className="mb-1" key={module}>
            {T.translate(`settings.state.value.${module}.${this.props.language}`)}: &nbsp;
            <span style={{ color: this.state.moduleStatus[module] ? 'green' : 'red' }}>
              {T.translate(`settings.state.value.${this.state.moduleStatus[module] ? 'connected' : 'disconnected'}.${this.props.language}`)}
            </span>
          </li>
        ));
      }
    }

    return (
      <div className="row">
        <div className="col-6">
          <ul className="list-unstyled">{moduleList}</ul>
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
