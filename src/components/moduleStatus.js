import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { T } from '../utilities/translator';
import { URL } from '../redux/applicationReducer';


class ModuleStatus extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      moduleStatus: [],
      moduleNames: ['module1'],
    };
    this.getStatus();
  }

  getStatus() {
    axios.get(`${URL}Debug`)
      .then(response => this.setState({ moduleStatus: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    const moduleList = this.state.moduleStatus.map((module, idx) => {
      return (
        <li key={idx} className="mb-1">
          {module.name}: <span style={{ color: module.value === 'true' ? 'green' : 'red' }}>{T.translate(`debug.state.value.${module.value}.${this.props.language}`)}</span>
        </li>);
    });

    return (
      <div className="row m-3 ml-md-5">
        <div className="col-6 pl-0">
          <h4>{T.translate(`debug.modules.${this.props.language}`)}</h4>
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
