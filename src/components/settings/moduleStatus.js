import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { T } from '../../utilities/translator';
import { get } from '../../utilities/secureHTTP';
import { URL } from '../../redux/applicationReducer';

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
    const moduleList = this.state.moduleStatus.map(module => (
      <li className="mb-1">
        {module.name}: &nbsp;
        <span style={{ color: module.value ? 'green' : 'red' }}>
          {T.translate(`settings.state.value.${module.value ? 'connected' : 'disconnected'}.${this.props.language}`)}
        </span>
      </li>));

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
